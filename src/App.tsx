import "./App.css";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import "./App.css";
import { Header } from "./components/Header/Header";
import { VideoPlayer } from "./components/VideoPlayer/VideoPlayerController";
import { VideoPlaylist } from "./components/VideoPlaylist/VideoPlaylist";
import { Description } from "./components/Description/Description";
import { CameraButton } from "./components/NewVideoInput/CameraButton";
import { AddNewVideo } from "./components/VideoPlayer/ui/AddNewVideo";

const ThemeContext = createContext({
  theme: "dark",
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

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
            <div>
              <div className="flex w-full gap-4">
                <AddNewVideo />
                <CameraButton />
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
