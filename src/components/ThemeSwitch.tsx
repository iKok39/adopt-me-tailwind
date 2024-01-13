import React from "react";
import Switch from "react-switch";

interface Props {
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
}

const ThemeSwitch = ({ theme, setTheme }: Props) => {
  const toggleTheme = () => {
    setTheme((current) => (current === "light" ? "dark" : "light"));
  };
  return (
    <div>
      <label>{theme === "light" ? "Light Mode" : "Dark Mode"}</label>
      <Switch onChange={toggleTheme} checked={theme === "dark"} />
    </div>
  );
};

export default ThemeSwitch;
