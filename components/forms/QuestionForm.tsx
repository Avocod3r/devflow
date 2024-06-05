"use client";
import React, { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import { questionFormSchema } from "@/lib/validation";
import Tag from "../ui/tag";
import Image from "next/image";
import { createQuestion } from "@/lib/actions/question.action";
import { useRouter, usePathname } from "next/navigation";

const type: any = "question";

type QuestionFormProps = {
  mongoUserId: string;
};

const QuestionForm = ({ mongoUserId }: QuestionFormProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isSubmitting, setIsSumbitting] = useState<boolean>(false);
  const form = useForm<z.infer<typeof questionFormSchema>>({
    resolver: zodResolver(questionFormSchema),
    defaultValues: {
      title: "",
      explanation: "",
      tags: [],
    },
  });

  async function onSubmit(
    values: z.infer<typeof questionFormSchema>
  ) {
    setIsSumbitting(true);

    try {
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
                      height: 350,
                      menubar: false,
                      plugins:
                        "advlist autolink charmap codesample emoticons link lists searchreplace visualblocks checklist casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode advtemplate ai mentions tinycomments tableofcontents footnotes autocorrect typography inlinecss markdown",
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
                    initialValue=""
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
                        <Image
                          src="/assets/icons/close.svg"
                          alt="Close icon"
                          width={12}
                          height={12}
                          onClick={() => handleTagRemove(tag, field)}
                          className="cursor-pointer object-contain invert-0 dark:invert"
                        />
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
