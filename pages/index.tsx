import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div>
      <iframe
        id="kofiframe"
        src="https://ko-fi.com/joseluisperez18614/?hidefeed=true&widget=true&embed=true&preview=true"
        styles={
          "border:none;width:100%;padding:4px;background:#f9f9f9;height:100%"
        }
        height="712"
        title="joseluisperez18614"
      ></iframe>
    </div>
  );
};

export default Home;
