import logoImg from "../../assets/logo.svg";
import avatarImg from "../../assets/Avatar.svg";
import { useTheme } from "../../App";

export const Header = () => {
  const { toggleTheme } = useTheme();
  const navLinks = ["Home", "Courses", "Contact"];
  return (
    <header className="bg-secondaryBackgroundColor h-16 text-text">
      <div className="container h-full flex justify-between items-center">
        <img src={logoImg} alt="logo" className="w-8 h-8" />
        <nav className="center flex gap-4">
          {navLinks.map((link) => (
            <a href={`#${link}`} key={link}>
              {link}
            </a>
          ))}
        </nav>
        <div className="flex gap-2 text-sm">
          <button className="bg-primary" onClick={toggleTheme}>
            theme
          </button>
          <img src={avatarImg} alt="avatar" className="w-8 h-8" />
        </div>
      </div>
    </header>
  );
};
