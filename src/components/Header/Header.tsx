import logo from "../../assets/logo.svg";
import Avatar from "../../assets/Avatar.svg";
import { useTheme } from "../../App";

export const Header = () => {
  const { toggleTheme } = useTheme();
  const navLinks = ["Home", "Courses", "Contact"];
  return (
    <header className="top-0 left-0 w-full  bg-secondaryBackgroundColor h-16 text-text ">
      <div className="container h-full flex justify-between items-center">
        <img src={logo} alt="logo" className="w-8 h-8" />
        <div className="center flex gap-4">
          {navLinks.map((link) => (
            <a href={`#${link}`} key={link}>
              {link}
            </a>
          ))}
        </div>
        <div className="flex gap-2 text-sm">
          <button className="bg-primary" onClick={toggleTheme}>
            theme
          </button>
          <img src={Avatar} alt="avatar" className="w-8 h-8" />
        </div>
      </div>
    </header>
  );
};
