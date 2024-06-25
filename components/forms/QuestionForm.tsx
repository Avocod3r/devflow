"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Editor } from "@tinymce/tinymce-react";

import { useTheme } from "@/context/ThemeProvider";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Tag from "@/components/ui/tag";
import { questionFormSchema } from "@/lib/validation";
import {
  createQuestion,
  editQuestion,
} from "@/lib/actions/question.action";

type QuestionFormProps = {
  type?: "edit" | "create";
  mongoUserId: string;
  questionDetails?: string;
};

const QuestionForm = ({
  type = "create",
  mongoUserId,
  questionDetails,
}: QuestionFormProps) => {
  const { mode } = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  const [isSubmitting, setIsSumbitting] = useState<boolean>(false);

  const parsedQuestionDetails = JSON.parse(questionDetails || "");
  const groupedTags = parsedQuestionDetails.tags.map(
    (tag: { _id: string; name: string }) => tag.name
  );

  const form = useForm<z.infer<typeof questionFormSchema>>({
    resolver: zodResolver(questionFormSchema),
    defaultValues: {
      title: parsedQuestionDetails.title || "",
      explanation: parsedQuestionDetails.content || "",
      tags: groupedTags || [],
    },
  });

  async function onSubmit(
    values: z.infer<typeof questionFormSchema>
  ) {
    setIsSumbitting(true);

    try {
      if (type === "edit") {
        await editQuestion({
          questionId: parsedQuestionDetails._id,
          title: values.title,
          content: values.explanation,
          path: pathname,
        });
        router.push(`/question/${parsedQuestionDetails._id}`);
      } else {
        // make async call to API => create a question
        // contain all form data
        await createQuestion({
          title: values.title,
          content: values.explanation,
          tags: values.tags,
          author: JSON.parse(mongoUserId),
          path: pathname,
        });
        // navigate to home page
        router.push("/");
      }
    } catch (error) {
    } finally {
      setIsSumbitting(false);
    }
  }

  const handleInputKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    field: any
  ) => {
    if (event.key === "Enter" && field.name === "tags") {
      event.preventDefault();

      const tagInput = event.target as HTMLInputElement;
      const tagValue = tagInput.value.trim();
      if (tagValue !== "") {
        if (tagValue.length > 15) {
          return form.setError("tags", {
            type: "required",
            message: "Tag must be less than 15 characters",
          });
        }
        if (!field.value.includes(tagValue.toLowerCase() as never)) {
          form.setValue("tags", [
            ...field.value,
            tagValue.toLowerCase(),
          ]);
          tagInput.value = "";
          form.clearErrors("tags");
        }
      } else {
        form.trigger();
      }
    }
  };

  const handleTagRemove = (tag: string, field: any) => {
    const newTags = field.value.filter((t: string) => t !== tag);

    form.setValue("tags", newTags);
  };

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex w-full flex-col gap-10"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col">
                <FormLabel className="paragraph-semibold text-dark400_light800">
                  Question Title{" "}
                  <span className="text-primary-500">*</span>
                </FormLabel>
                <FormControl className="mt-3.5">
                  <Input
                    className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                    {...field}
                  />
                </FormControl>
                <FormDescription className="body-regular mt-2.5 text-light-500">
                  Be specific and imagine you&apos;re asking a
                  question to another person
                </FormDescription>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="explanation"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-3">
                <FormLabel className="paragraph-semibold text-dark400_light800">
                  Detailed explanation of your problem?{" "}
                  <span className="text-primary-500">*</span>
                </FormLabel>
                <FormControl className="mt-3.5">
                  <Editor
                    apiKey={
                      process.env.NEXT_PUBLIC_TINY_EDITOR_API_KEY
                    }
                    init={{
                      skin: mode === "dark" ? "oxide-dark" : "oxide",
                      content_css: mode,
                      height: 350,
                      menubar: false,
                      plugins:
                        "advlist autolink charmap codesample emoticons link lists searchreplace visualblocks  linkchecker",
                      toolbar:
                        "undo redo | blocks | codesample |  bold italic forecolor | alignleft aligncenter alignright alignjustify |",
                      content_style:
                        "body {font-family: Inter; font-size: 16px}",
                      tinycomments_mode: "embedded",
                      tinycomments_author: "Author name",

                      ai_request: (_request: any, respondWith: any) =>
                        respondWith.string(() =>
                          // eslint-disable-next-line prefer-promise-reject-errors
                          Promise.reject(
                            "See docs to implement AI Assistant"
                          )
                        ),
                    }}
                    initialValue={parsedQuestionDetails.content || ""}
                    onBlur={field.onBlur}
                    onEditorChange={(content) =>
                      field.onChange(content)
                    }
                  />
                </FormControl>
                <FormDescription className="body-regular mt-2.5 text-light-500">
                  Introduce the problem and expand on what you put in
                  the title. Also good idea add code to question.
                  Minimum 100 characters.
                </FormDescription>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col">
                <FormLabel className="paragraph-semibold text-dark400_light800">
                  Tags <span className="text-primary-500">*</span>
                </FormLabel>
                <FormControl className="mt-3.5">
                  <Input
                    disabled={type === "edit"}
                    className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                    placeholder="Add tags..."
                    onKeyDown={(e) => handleInputKeyDown(e, field)}
                  />
                </FormControl>
                {field.value.length > 0 && (
                  <div className="flex-start mt-2.5 gap-2.5">
                    {field.value.map((tag) => (
                      <Tag
                        key={tag}
                        className="subtle-medium background-light800_dark300 text-light400_light500 flex items-center justify-center gap-2 rounded-md border-none px-4 py-2 capitalize"
                      >
                        {tag}
                        {type !== "edit" && (
                          <Image
                            src="/assets/icons/close.svg"
                            alt="Close icon"
                            width={12}
                            height={12}
                            onClick={() =>
                              handleTagRemove(tag, field)
                            }
                            className="cursor-pointer object-contain invert-0 dark:invert"
                          />
                        )}
                      </Tag>
                    ))}
                  </div>
                )}
                <FormDescription className="body-regular mt-2.5 text-light-500">
                  Add up to 3 tags to describe what your question s
                  about. You need to press Enter to add a tag.
                </FormDescription>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="primary-gradient w-fit !text-light-900"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>{type === "edit" ? "Editing..." : "Posting..."}</>
            ) : (
              <>
                {type === "edit" ? "Edit Question" : "Ask a Question"}
              </>
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default QuestionForm;
