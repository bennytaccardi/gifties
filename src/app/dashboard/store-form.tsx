"use client";

import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { MerchantInfo } from "../dto/merchant";
import { UploadButton } from "@/utils/uploadthing";
import { useState } from "react";

const formSchema = z.object({
  name: z.string().min(2).max(50),
  url: z.string().url().optional(),
  description: z.string().min(2).max(100),
  profileImage: z.string().min(0).optional(),
});

export function StoreForm() {
  const [error, setError] = useState<string | undefined>(undefined);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const merchantInfo: MerchantInfo = {
      name: values.name,
      description: values.description,
      url: values.url,
      profileImage: values.profileImage,
    };
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}${process.env.NEXT_PUBLIC_SAVE_MERCHANT_PATH}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          merchant: merchantInfo,
        }),
      }
    );
  }
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
          <FormField
            control={form.control}
            name="profileImage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Store Image</FormLabel>
                <FormControl>
                  <UploadButton
                    endpoint="imageUploader"
                    onClientUploadComplete={(res) => {
                      // setImageUrl(res[0].url);
                      form.setValue("profileImage", res[0].url);
                    }}
                    onUploadError={(error: Error) => {
                      setError(error.message);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
      {error && (
        <Alert variant="destructive" className="mt-5">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </div>
  );
}
