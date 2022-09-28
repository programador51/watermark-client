import Link from "next/link";
import React from "react";
import useListAlbums from "../../customHooks/useListAlbums";
import { Button } from "../../molecules/button";
import { Search } from "../../molecules/search";
import scss from "./styles.module.scss";

export default function Albums() {
  const hook = useListAlbums();

  return (
    <div className={scss.container}>
      <div className={scss.search}>
        <Search />
        <Link href={"/albums/new"}>
          <Button style={{ margin: "10px 0 0 0" }}>Create album</Button>
        </Link>
      </div>

      {hook.isLoading ? (
        <p>Loading your albums...</p>
      ) : (
        hook.albums.map((album) => (
          <article className={scss.article} key={album["_id"]}>
            <header>
              <h1>{album.title}</h1>
              <span>📷 [{album.photos}]</span>
            </header>
            <p>
              Kofi Link Shop:
              <a href={album.kofiLinkShop}>{album.kofiLinkShop}</a>
            </p>
            <div className={scss.actions}>
              <Button>📝</Button>
              <Button>✖</Button>
            </div>
          </article>
        ))
      )}

      {/* <div className={scss.dummie}></div>
      <div className={scss.dummie}></div>
      <div className={scss.dummie}></div>
      <div className={scss.dummie}></div>
      <div className={scss.dummie}></div>
      <div className={scss.dummie}></div>
      <div className={scss.dummie}></div>
      <div className={scss.dummie}></div>
      <div className={scss.dummie}></div>
      <div className={scss.dummie}></div>
      <div className={scss.dummie}></div>
      <div className={scss.dummie}></div>
      <div className={scss.dummie}></div>
      <div className={scss.dummie}></div> */}
    </div>
  );
}
