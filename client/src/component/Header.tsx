import { useContext } from "react";
import { ThemeContext } from "@/context/ThemeContext";
import Form from "@/component/Form";

const Header = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div
      id="header"
      className="bg-color flex min-h-[50vh] flex-col items-center justify-center"
    >
      <button
        className="absolute top-0 right-0 m-5 flex h-10 w-10 items-center justify-center rounded-full bg-blue-400"
        onClick={toggleTheme}
      >
        {theme == "light" ? (
          <i className="fas fa-sun text-2xl text-yellow-500"></i>
        ) : (
          <i className="fas fa-moon text-2xl text-white"></i>
        )}
      </button>
      <h1 className="text-color mb-6 text-center text-[min(5vw,3rem)]">
        URL Shortener App
      </h1>
      <Form />
    </div>
  );
};

export default Header;
