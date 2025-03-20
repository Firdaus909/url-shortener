import { useContext } from "react";
import Card from "./component/Card";
import Footer from "./component/Footer";
import Header from "./component/Header";
import { Toaster } from "sonner";
import { ThemeContext } from "./context/ThemeContext";
import { ApiContext } from "./context/ApiContext";

const App = () => {
  const { urls, error } = useContext(ApiContext);
  const { theme } = useContext(ThemeContext) as {
    theme: "light" | "dark" | "system" | undefined;
  };

  return (
    <div>
      <Header />
      <div id="main" className="min-h-[50vh] bg-gray-200 p-4 dark:bg-gray-600">
        <h3 className="text-color text-center text-[min(5vw,1.5rem)]">
          List of Your Shorten Link
        </h3>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {urls && urls.length > 0 ? (
            urls.map((url, index) => <Card key={index} url={url} />)
          ) : (
            <p className="text-color text-center mt-2">{error}</p>
          )}
        </div>
      </div>
      <Footer />
      <Toaster theme={theme} />
    </div>
  );
};

export default App;
