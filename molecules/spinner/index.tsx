import React from "react";
import scss from "./styles.module.scss";

export default function Spinner({
  children,
}: {
  children?: JSX.Element | JSX.Element[] | null | undefined;
}) {
  return (
    <div>
      <div className={scss.spinner}>
        <div className={scss.cube1}></div>
        <div className={scss.cube2}></div>
      </div>

      {children ? children : null}
    </div>
  );
}
