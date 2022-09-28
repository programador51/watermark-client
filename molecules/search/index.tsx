import React, { useState } from "react";
import scss from "./styles.module.scss";

export const Search = (
  props: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >
) => {
  const [state, setState] = useState(props.value || "");

  return (
    <div className={scss.search}>
      <input
        {...props}
        type="text"
        onChange={(e) => setState(e.target.value)}
        value={state}
      />
      {state !== "" ? (
        <button
          className={scss.clear}
          type="button"
          onClick={() => setState("")}
        >
          ✖
        </button>
      ) : null}
      <button type="submit">🔎</button>
    </div>
  );
};
