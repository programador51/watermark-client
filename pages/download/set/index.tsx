import { saveAs } from "file-saver";
import React, { useState } from "react";
import Download from "..";
import { OnDownloadedI } from "../../../customHooks/useDownload/types";
import Canva from "../canva";

export default function Set() {
  const [info, setInfo] = useState<OnDownloadedI | undefined>(undefined);

  return !info ? (
    <Download onDownloaded={setInfo} />
  ) : (
    info.files.map((file, i) => (
      <Canva
        key={window.crypto.randomUUID()}
        file={file}
        onChange={(img) => saveAs(img, img.name)}
        watermark={info.watermark}
        title={`${info.title} - ${i + 1}`}
      />
    ))
  );
}
