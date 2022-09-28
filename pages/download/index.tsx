import React, { createContext, useState } from "react";
import Label from "../../atoms/label";
import useDownload from "../../customHooks/useDownload";
import { Button } from "../../molecules/button";
import Input from "../../molecules/input";
import { Required } from "../../molecules/required";
import scss from "./styles.module.scss";
import Spinner from "../../molecules/spinner";
import Canva from "./canva";
import { OnDownloadedI } from "../../customHooks/useDownload/types";

const ContextDownload = createContext({});
const { Provider } = ContextDownload;

export default function Download({
  onDownloaded = (info: OnDownloadedI) => {},
}) {
  const hook = useDownload(onDownloaded);

  switch (hook.step) {
    //Request paypal id transaction
    case 1: {
      if (hook.isLoading) return <p>Retrieving purchase info...</p>;

      return (
        <Provider value={{ ...hook }}>
          <div className={scss.password}>
            <Label>Payment transaction id</Label>
            <Input
              type={"text"}
              placeholder="Example: d380b3d8-f45b-48d5-aaef-680c67a9359a"
              onChange={(e) => hook.updateUuid(e.target.value)}
            />
            <Required value={hook.uuidTransaction} />
            <Button
              onClick={hook.attemptGetInfoDownload}
              disabled={hook.uuidTransaction === ""}
              style={{ margin: "10px 0" }}
            >
              Download
            </Button>
          </div>
        </Provider>
      );
    }

    // Ask for the album to download
    case 2: {
      return (
        <Provider value={{ ...hook }}>
          <div className={scss.instructions}>
            <p>Please, select the album title</p>
            <Button
              onClick={hook.getPhotosInfo}
              disabled={hook.kofiLinkShop === undefined}
            >
              Continue
            </Button>
          </div>

          {hook.albumsBought.map((album) => (
            <div className={scss.container} key={album["_id"]}>
              <input
                onChange={(e) =>
                  hook.setKofiLink(album.kofiLinkShop, album.photos)
                }
                style={{ display: "none" }}
                type={"radio"}
                name="album"
                id={album["_id"]}
              />
              <label htmlFor={album["_id"]} className={scss.albumBought}>
                <header>
                  <p>{album.title}</p>

                  <p>📷 [{album.photos}]</p>
                </header>
              </label>
            </div>
          ))}
        </Provider>
      );
    }

    // Download photos from server
    case 3: {
      return (
        <Provider value={{ ...hook }}>
          <Spinner>
            <div className={scss.loading}>
              <hr />
              <p>
                Downloading {hook.currentPhoto} of {hook.totalPhotos} - (
                {hook.progress}%)
              </p>
              <hr />
            </div>
          </Spinner>
        </Provider>
      );
    }

    // Unziping the files
    case 4: {
      return (
        <Provider value={{ ...hook }}>
          <Spinner>
            <div className={scss.loading}>
              <hr />
              <p>
                Downloading {hook.currentPhoto} of {hook.totalPhotos} - (
                {hook.progress}%)
              </p>
              <hr />
            </div>
          </Spinner>
        </Provider>
      );
    }

    default:
      return <p>Try to contact tech support: jperezo98@hotmail.com</p>;
  }
}
