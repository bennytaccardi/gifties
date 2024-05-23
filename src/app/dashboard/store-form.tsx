"use client";

import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { UploadButton } from "@/utils/uploadthing";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useFormState } from "react-dom";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { onSubmitAction } from "./actions/form-submit";
import { formSchema } from "./form-schema";
import { removePreview } from "./actions/preview-remover";
import { Tags } from "@/components/ui/tags";

export function StoreForm() {
  const [error, setError] = useState<string | undefined>(undefined);
  const [fileKey, setFileKey] = useState<string | undefined>(undefined);
  const [state, formAction] = useFormState(onSubmitAction, {
    message: "",
  });
  const { push } = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onRemove = async (res: any) => {
    await removePreview(fileKey);
    form.setValue("profileImage", undefined);
  };

  const formRef = useRef<HTMLFormElement>(null);
  if (state.message && !state.issues) {
    push("success-page");
  }
  return (
    <div>
      <Form {...form}>
        <form
          ref={formRef}
          onSubmit={(evt) => {
            evt.preventDefault();
            form.handleSubmit(() => {
              formAction(new FormData(formRef.current!));
            })(evt);
          }}
          action={formAction}
          className="space-y-8"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Store Name</FormLabel>
                <FormControl>
                  <Input placeholder="Acme Inc" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Store Description</FormLabel>
                <FormControl>
                  <Input placeholder="We sell everything" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>URL</FormLabel>
                <FormControl>
                  <Input type="url" placeholder="https://acme.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Controller
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tags</FormLabel>
                <FormControl>
                  <Tags
                    selectedTags={field.value || []}
                    onTagsChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="profileImage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Store Image</FormLabel>
                <FormControl>
                  <UploadButton
                    endpoint="imageUploader"
                    onClientUploadComplete={(res: any) => {
                      // setImageUrl(res[0].url);
                      form.setValue("profileImage", res[0].url);
                      setFileKey(res[0].key);
                    }}
                    onUploadError={(error: Error) => {
                      setError(error.message);
                    }}
                  />
                </FormControl>
                <FormMessage />
                {form.getValues("profileImage") && (
                  <Card className="w-auto">
                    <CardHeader className="items-center w-auto h-auto">
                      <Image
                        src={form.getValues("profileImage")!}
                        width={100}
                        height={100}
                        alt="Picture of the author"
                      />
                    </CardHeader>
                    <CardFooter>
                      <Button variant="outline" onClick={onRemove}>
                        Delete
                      </Button>
                    </CardFooter>
                  </Card>
                )}
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
      {state?.message !== "" && state.issues && (
        <Alert variant="destructive" className="mt-5">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{state?.message}</AlertDescription>
        </Alert>
      )}
    </div>
  );
}
