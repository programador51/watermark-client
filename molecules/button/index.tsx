import React from "react";
import scss from "./styles.module.scss";

export const Button = (
  props: React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >
) => {
  return (
    <button {...props} className={scss.button}>
      {props.children}
    </button>
  );
};
