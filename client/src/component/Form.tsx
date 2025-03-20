import { useContext } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FloatingInput, FloatingLabel } from "@/components/ui/floatingLabel";
import {
  Form as UrlForm,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { formatDate } from "@/helper/function";
import { postUrl } from "@/services/services";
import { ApiContext } from "@/context/ApiContext";

const Form = () => {
  const { onUpdate } = useContext(ApiContext);

  const formSchema = z.object({
    url: z
      .string()
      .min(1, { message: "Your URL cannot be empty." })
      .url({ message: "This is not an URL." }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const { url } = values;
    try {
      toast.promise(postUrl(url), {
        loading: "Shorten Your Link...",
        success: (response) => {
          if (response.success === false) {
            return {
              message: "URL has failed shorten.",
              description: response.message,
              type: "error",
            };
          }
          return {
            message: "URL has been shortened.",
            description: response.data?.createdAt
              ? formatDate(response.data.createdAt)
              : "Unknown date",
          };
        },
        error: "Something went wrong here.",
      });
      form.setValue("url", "");
      onUpdate();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <UrlForm {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full items-center justify-center"
      >
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem className="relative mr-6 w-[50%]">
              <FloatingInput
                id="urlInput"
                className="peer block w-full appearance-none rounded-lg border-1 border-gray-600 bg-transparent px-2.5 py-4 text-sm text-gray-800 placeholder:w-0 placeholder:transform placeholder:opacity-0 placeholder:duration-300 focus:border-blue-600 focus:placeholder:w-full focus:placeholder:opacity-100 focus-visible:border-blue-600 focus-visible:ring-0 dark:border-gray-300 dark:bg-transparent dark:text-gray-200 dark:focus:border-blue-500 dark:focus-visible:border-blue-500"
                placeholder="https://www.example.com"
                {...field}
              />
              <FloatingLabel
                htmlFor="urlInput"
                className="bg-color absolute start-1 top-2 z-10 origin-[0] -translate-y-4 scale-75 transform px-2 text-sm text-gray-600 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4 dark:text-gray-300 peer-focus:dark:text-blue-500"
              >
                Drop Your Link
              </FloatingLabel>
              <FormMessage className="absolute translate-y-10" />
            </FormItem>
          )}
        />
        <button
          className="rounded-lg bg-gradient-to-bl from-blue-400 to-blue-700 px-4 py-2 text-sm text-white hover:from-blue-500 hover:to-blue-900"
          type="submit"
        >
          Submit
        </button>
      </form>
    </UrlForm>
  );
};

export default Form;
