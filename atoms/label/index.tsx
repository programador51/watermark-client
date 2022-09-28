import React from "react";
import scss from "./styles.module.scss";

export default function Label(
  props: React.DetailedHTMLProps<
    React.LabelHTMLAttributes<HTMLLabelElement>,
    HTMLLabelElement
  >
) {
  return (
    <label {...props} className={scss.label}>
      {props.children}
    </label>
  );
}
