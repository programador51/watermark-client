import Link from "next/link";
import React from "react";
import scss from "./styles.module.scss";

export default function Nav() {
  return (
    <nav className={scss.nav}>
      <button>
        <Link href={"/albums"}>Albums 📷</Link>
      </button>

      <button>
        <Link href={"/download"}>Sells 💳</Link>
      </button>
    </nav>
  );
}
