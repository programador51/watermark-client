import { saveAs } from "file-saver";
import React, { useState } from "react";
import Download from "..";
import { OnDownloadedI } from "../../../customHooks/useDownload/types";
import Canva from "../canva";
import { v4 as uuidv4 } from "uuid";

export default function Set() {
  const [info, setInfo] = useState<OnDownloadedI | undefined>(undefined);
  const [iteration, setIteration] = useState(0);

  return !info ? (
    <Download onDownloaded={setInfo} />
  ) : (
    info.files.map((file, i) =>
      i === iteration ? (
        <Canva
          key={uuidv4()}
          file={file}
          onChange={(img) => {
            setIteration(i + 1);

            saveAs(img, img.name);
          }}
          watermark={info.watermark}
          title={`${info.title} - ${i + 1}`}
        />
      ) : null
    )
  );
}
