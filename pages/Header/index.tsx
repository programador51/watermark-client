import React from "react";
import scss from "./styles.module.scss";

export default function Header() {
  return (
    <header className={scss.header}>
      <a
        href={process.env.NEXT_PUBLIC_KOFI_LINK}
        target="_blank"
        rel="noreferrer"
      >
        <img
          src="https://uploads-ssl.webflow.com/5c14e387dab576fe667689cf/5ca5bf1dff3c03fbf7cc9b3c_Kofi_logo_RGB_rounded.png"
          alt="Buy Me a Coffee at ko-fi.com"
        />
        {process.env.NEXT_PUBLIC_KOFI_NAME}
      </a>
    </header>
  );
}
