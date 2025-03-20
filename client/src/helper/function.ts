import { toast } from "sonner";
import { serverUrl } from "./constant";

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZoneName: "short",
  };
  return date.toLocaleDateString("en-US", options);
};

export const copyToClipboard = async (shortUrl: string) => {
  try {
    toast.promise(
      navigator.clipboard.writeText(`${serverUrl}/shortUrl/${shortUrl}`),
      {
        loading: "Copying Your Link...",
        success: () => {
          return {
            message: "URL copied",
            description: `${serverUrl}/shortUrl/${shortUrl}`,
          };
        },
        error: "Something went wrong here.",
      },
    );
  } catch (error) {
    console.log(error);
  }
};
