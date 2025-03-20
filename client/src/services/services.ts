import { DeletedUrlTypes, UrlTypes } from "@/types/urlTypes";
import axios from "axios";

export const postUrl = async (fullUrl: string) => {
  try {
    const { data } = await axios.post<UrlTypes>(`/api/shortUrl`, {
      fullUrl,
    });
    // console.log(response);
    return {
      success: true,
      message: "URL has been shortened.",
      data: data,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error;

      if (axiosError.response) {
        const { status, data } = axiosError.response;

        const errorMsg = data.message || "An error occured.";
        if (status === 409) {
          return { success: false, message: errorMsg };
        }
        return { success: false, message: errorMsg };
      } else if (axiosError.request) {
        return {
          success: false,
          message: "No response received from the server.",
        };
      } else {
        return { success: false, message: axiosError.message };
      }
    } else {
      return { success: false, message: "An unexpected error occured." };
    }
  }
};

export const getAllUrls = async () => {
  try {
    const { data } = await axios.get<UrlTypes[]>(`/api/shortUrl`);
    // console.log(response);
    return {
      success: true,
      message: "URL has been founded.",
      data: data,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error;

      if (axiosError.response) {
        const { status, data } = axiosError.response;

        const errorMsg = data.message || "An error occured.";
        if (status === 404) {
          return { success: false, message: errorMsg };
        }
        return { success: false, message: errorMsg };
      } else if (axiosError.request) {
        return {
          success: false,
          message: "No response received from the server.",
        };
      } else {
        return { success: false, message: axiosError.message };
      }
    } else {
      return { success: false, message: "An unexpected error occured." };
    }
  }
};

export const deleteUrl = async (id: string) => {
  try {
    const { data } = await axios.delete<DeletedUrlTypes>(`/api/shortUrl/${id}`);
    // console.log(response);
    return {
      success: true,
      message: "URL has been deleted.",
      data: data,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error;

      if (axiosError.response) {
        const { data } = axiosError.response;

        const errorMsg = data.message || "An error occured.";

        return { success: false, message: errorMsg };
      } else if (axiosError.request) {
        return {
          success: false,
          message: "No response received from the server.",
        };
      } else {
        return { success: false, message: axiosError.message };
      }
    } else {
      return { success: false, message: "An unexpected error occured." };
    }
  }
};
