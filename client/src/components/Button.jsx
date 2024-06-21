import React from "react";
import {
  FaCheckCircle,
  FaClock,
  FaEdit,
  FaTrashAlt,
  FaPaperPlane,
} from "react-icons/fa";

const Button = ({ type, onClick, children, icon, className, submit }) => {
  const baseStyle =
    "px-4 font-medium text-sm rounded-md inline-flex justify-center items-center max-custom:grow ";
  const typeStyles = {
    update: "bg-blue-500 text-dark-font-secondary hover:bg-blue-700 py-1",
    delete: "bg-red-500 text-dark-font-secondary hover:bg-red-700 py-1",
    submit:
      "bg-blue-500 text-dark-font-secondary hover:bg-blue-700 w-full justify-center py-2",
    done: "bg-green-600 text-dark-font-secondary hover:bg-green-700 py-1",
    pending: "bg-slate-500 text-dark-font-secondary hover:bg-green-700 py-1",
  };

  const IconComponent =
    icon ||
    {
      update: FaEdit,
      delete: FaTrashAlt,
      submit: FaPaperPlane,
      done: FaCheckCircle,
      pending: FaClock,
    }[type];

  const buttonStyle = `${baseStyle} ${typeStyles[type] || ""} ${className}`;

  return (
    <button
      className={buttonStyle}
      onClick={onClick}
      type={submit ? "submit" : "button"}
    >
      {IconComponent && <IconComponent className="mr-2" />}
      {children}
    </button>
  );
};

export default Button;
