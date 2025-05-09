import React from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

const ThemeSwitch = () => {
  const { setTheme, theme } = useTheme();
  const isDark = theme === "dark";
  return (
    <div className="flex flex-row items-center justify-center gap-1">
      <div className="hover:bg-gray-100 rounded-lg">
        {isDark ? (
          <div
            className="p-2 cursor-pointer"
            onClick={() => {
              setTheme("light");
            }}
          >
            <Sun />
          </div>
        ) : (
          <div
            className="p-2 cursor-pointer"
            onClick={() => {
              setTheme("dark");
            }}
          >
            <Moon />
          </div>
        )}
      </div>
    </div>
  );
};

export default ThemeSwitch;
