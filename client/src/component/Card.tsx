import { useContext, useEffect, useState } from "react";
import { deleteUrl } from "../services/services";
import { ApiContext } from "@/context/ApiContext";
import { UrlTypes } from "@/types/urlTypes";
import { toast } from "sonner";
import { copyToClipboard } from "@/helper/function";
import {
  AlertDialog,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface CardProps {
  url: UrlTypes;
}

const Card = ({ url }: CardProps) => {
  const [clicks, setClicks] = useState<number>(0);
  const { urls, setUrls, onUpdate } = useContext(ApiContext);

  useEffect(() => {
    const sse = new EventSource(`/api/sse/${url.shortUrl}`);

    sse.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setClicks(data.clicks);
    };

    sse.onerror = (error) => {
      console.error("SSE Error:", error);
      sse.close();
    };

    return () => {
      sse.close();
    };
  }, [url]);

  const handleDelete = () => {
    const prevUrls = urls;
    setUrls(urls.filter((item) => item._id !== url._id));

    toast.promise(deleteUrl(url._id), {
      loading: "Delete Your Link...",
      success: (response) => {
        if (response.success === false) {
          setUrls(prevUrls);
          return {
            message: "URL not deleted properly.",
            description: response.message,
            type: "error",
          };
        }
        return {
          message: "URL has been deleted.",
          description: response.data?.message,
        };
      },
      error: () => {
        setUrls(prevUrls);
        return { message: "Something went wrong here." };
      },
    });
    onUpdate();
  };

  return (
    <div className="bg-color flex w-full items-center justify-between overflow-hidden rounded-lg pr-2 pl-4 shadow-md">
      <div className="flex flex-grow flex-col overflow-hidden">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger className="w-fit max-w-full">
              <p className="text-color text-md truncate font-semibold">
                {url.fullUrl}
              </p>
            </TooltipTrigger>
            <TooltipContent className="max-w-[calc(100vw-5rem)] text-center">
              <p className="text-color text-md truncate font-semibold text-wrap">
                {url.fullUrl}
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <p className="text-sm text-gray-500">{url.shortUrl}</p>
      </div>
      <p className="ml-4 text-sm whitespace-nowrap text-gray-700 dark:text-gray-300">
        Visited: {clicks}
      </p>
      <div className="ml-4 flex items-center space-x-2">
        <button
          onClick={() => copyToClipboard(url.shortUrl)}
          className="px-2 py-2.5 text-blue-500 hover:cursor-pointer"
        >
          <i className="fas fa-copy"></i>
        </button>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <button className="px-2 py-4 text-red-500 hover:cursor-pointer">
              <i className="fas fa-trash-alt"></i>
            </button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the
                URL from your list.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete}>
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default Card;
