import "./App.css";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import "./App.css";
import { Header } from "./components/Header/Header";
import {
  VideoJsController,
  VideoJsPlayer,
  VideoPlayer,
} from "./components/VideoPlayer/VideoPlayer";
import { VideoPlaylist } from "./components/VideoPlaylist/VideoPlaylist";
import { Description } from "./components/Description/Description";

const ThemeContext = createContext({
  theme: "light",
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.getElementById("theme-container")!.className =
      theme + " theme-container w-screen h-screen";
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

function App() {
  return (
    <ThemeProvider>
      <div
        className="dark theme-container w-screen h-screen"
        id="theme-container"
      >
        <div className="bg-backgroundColor w-full h-full flex flex-col gap-10">
          <Header />
          <div className="grid gap-6 md:grid-cols-[2fr,1fr] container">
            <VideoPlayer />
            <div className="">
              <div>
                <input type="text" className="w-full h-10 bg-red-500" />
              </div>
              <VideoPlaylist />
            </div>
          </div>
          <Description />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
