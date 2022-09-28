import "../styles/globals.css";
import type { AppProps } from "next/app";
import Nav from "./Nav";
import Header from "./Header";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="view">
      <div className="app">
        <Header />
        <main>
          <Component {...pageProps} />
        </main>
        <Nav />
      </div>
    </div>
  );
}

export default MyApp;
