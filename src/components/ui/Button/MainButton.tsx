import React from "react";
import "./button.css";

interface ButtonProps {
  type: "button" | "submit" | "reset";
  onClick: () => void;
  children: string;
  colorVariant: "red" | "blue" | "violet" | "yellow" | "green";
  isActive?: boolean;
  disabled?: boolean
}

const MainButton: React.FC<ButtonProps> = ({
  type,
  onClick,
  children,
  colorVariant,
  isActive,
  ...props
}) => {
  return (
    <button
      {...props}
      onClick={onClick}
      className={`main-button ${colorVariant} ${
        isActive ? "active" : "static"
      }`}
      type={type}
    >
      {children}
    </button>
  );
};

export default MainButton;
