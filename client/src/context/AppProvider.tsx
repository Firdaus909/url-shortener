import { ReactNode } from "react";
import { ApiProvider } from "./ApiContext";
import { ThemeProvider } from "./ThemeContext";

interface AppProviderProps {
  children: ReactNode;
}

const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <ApiProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </ApiProvider>
  );
};

export default AppProvider;
