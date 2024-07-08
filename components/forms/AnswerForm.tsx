"use client";
import React, { useRef, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Editor } from "@tinymce/tinymce-react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { AnswerSchema } from "@/lib/validation";
import { useTheme } from "@/context/ThemeProvider";
import Image from "next/image";
import { createAnswer } from "@/lib/actions/answer.action";
import { usePathname } from "next/navigation";

type AnswerFormProps = {
  question: string;
  questionId: string;
  authorId: string;
};

const AnswerForm = ({
  question,
  questionId,
  authorId,
}: AnswerFormProps) => {
  const editorRef = useRef(null);
  const { mode } = useTheme();
  const pathname = usePathname();
  const [isSumbitting, setIsSubmitting] = useState(false);
  const [isSumbittingAI, setIsSubmittingAI] = useState(false);
  const form = useForm<z.infer<typeof AnswerSchema>>({
    resolver: zodResolver(AnswerSchema),
    defaultValues: {
      answer: "",
    },
  });

  const handleCreateAnswer = async (
    values: z.infer<typeof AnswerSchema>
  ) => {
    setIsSubmitting(true);
    try {
      await createAnswer({
        content: values.answer,
        author: JSON.parse(authorId),
        question: JSON.parse(questionId),
        path: pathname,
      });

      form.reset();

      if (editorRef.current) {
        const editor = editorRef.current as any;

        editor.setContent("");
      }
    } catch (error) {
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGenerateAIAnswer = async () => {
    if (!authorId) return null;

    setIsSubmittingAI(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/chatgpt`,
        {
          method: "POST",
          body: JSON.stringify({ question }),
        }
      );
      const aiAnswer = await response.json();

      const formattedAnswer = aiAnswer.reply.replace(/\n/g, "<br/>");

      if (editorRef.current) {
        const editor = editorRef.current as any;
        editor.setContent(formattedAnswer);
      }

      // TODO: toast notification
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setIsSubmittingAI(false);
    }
  };
  return (
    <div>
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
        <h4 className="paragraph-semibold text-dark400_light800">
          Write your answer here
        </h4>
        <Button
          disabled={isSumbittingAI}
          onClick={() => handleGenerateAIAnswer()}
          className="btn light-border-2 gap-1.5 rounded-md px-4 py-2.5 text-primary-500 shadow-none dark:text-primary-500"
        >
          {isSumbittingAI ? (
            <>Generating...</>
          ) : (
            <>
              <Image
                className="object-contain"
                src="/assets/icons/stars.svg"
                width={12}
                height={12}
                alt="Stars"
              />
              Generate AI Answer
            </>
          )}
        </Button>
      </div>
      <Form {...form}>
        <form
          className="mt-6 flex w-full flex-col gap-10"
          onSubmit={form.handleSubmit(handleCreateAnswer)}
        >
          <FormField
            control={form.control}
            name="answer"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-3">
                <FormControl className="mt-3.5">
                  <Editor
                    apiKey={
                      process.env.NEXT_PUBLIC_TINY_EDITOR_API_KEY
                    }
                    onInit={(_, editor) =>
                      // @ts-ignore
                      (editorRef.current = editor)
                    }
                    init={{
                      height: 350,
                      skin: mode === "dark" ? "oxide-dark" : "oxide",
                      content_css: mode,
                      menubar: false,
                      plugins:
                        "advlist autolink charmap codesample emoticons link lists searchreplace visualblocks  linkchecker",
                      toolbar:
                        "undo redo | blocks | codesample |  bold italic forecolor | alignleft aligncenter alignright alignjustify |",
                      content_style:
                        "body {font-family: Inter; font-size: 16px}",
                      tinycomments_mode: "embedded",
                      tinycomments_author: "Author name",
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
          <div className="flex justify-end">
            <Button
              type="submit"
              className="primary-gradient w-fit !text-light-900"
              disabled={isSumbitting}
            >
              {isSumbitting ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AnswerForm;
