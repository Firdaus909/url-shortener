import { getAllUrls } from "@/services/services";
import { UrlTypes } from "@/types/urlTypes";
import { createContext, ReactNode, useEffect, useState } from "react";

interface ApiContextProps {
  urls: UrlTypes[];
  error: string;
  setUrls: React.Dispatch<React.SetStateAction<UrlTypes[]>>;
  fetchUrls: () => void;
  onUpdate: () => void;
}

interface ApiProviderProps {
  children: ReactNode;
}

export const ApiContext = createContext<ApiContextProps>({
  urls: [],
  error: "",
  setUrls: () => {},
  fetchUrls: () => {},
  onUpdate: () => {},
});

export const ApiProvider = ({ children }: ApiProviderProps) => {
  const [urls, setUrls] = useState<UrlTypes[]>([]);
  const [reload, setReload] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const fetchUrls = async () => {
    const response = await getAllUrls();

    if (response.success === true && response.data) {
      setUrls(response.data);
    } else if (response.success === false && response.message) {
      setError(response.message);
    } else {
      console.log("Something Went Wrong!");
    }
  };

  const onUpdate = () => {
    setReload(true);
  };

  useEffect(() => {
    fetchUrls();
    setReload(false);
  }, [reload]);

  return (
    <ApiContext.Provider value={{ urls, error, setUrls, fetchUrls, onUpdate }}>
      {children}
    </ApiContext.Provider>
  );
};
