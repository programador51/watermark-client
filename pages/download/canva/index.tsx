/* eslint-disable @next/next/no-img-element */
import React from "react";
import useWatermark from "../../../customHooks/useWatermak";
import { PropsI } from "./types";

export default function Canva({
  file,
  onChange = () => {},
  watermark,
  title = window.crypto.randomUUID(),
}: PropsI) {
  const hook = useWatermark({
    file,
    watermark,
    onChange,
    title,
  });

  return hook.canvas === undefined ? (
    <></>
  ) : hook.watermarked === undefined ? (
    <>
      <div style={{ display: "none" }}>
        <img
          alt={`canvas-for-the-image-${hook.canvas.file.name}`}
          onLoad={(e) => {
            hook.updateDimensionsImage(
              e.currentTarget.width,
              e.currentTarget.height
            );
          }}
          src={hook.canvas.imageBlob}
        />

        <canvas
          id={hook.canvas.idCanvas}
          height={hook.canvas.dimensions.height}
          width={hook.canvas.dimensions.width}
        ></canvas>
      </div>
      <p>⏰ Downloading {title}</p>
    </>
  ) : (
    <p>✅ Downloaded {title}</p>
  );
}
