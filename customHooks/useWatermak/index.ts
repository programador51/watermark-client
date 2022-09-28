import { useState, useEffect } from "react";
import * as mime from "mime-types";
import { v4 as uuidv4 } from "uuid";
import { CanvasI, ParamsUseWatermark } from "./types";

export default function useWatermark({
  watermark = "",
  file,
  onChange = () => {},
  title = uuidv4(),
}: ParamsUseWatermark) {
  const [canvas, setCanvas] = useState<CanvasI | undefined>(undefined);

  useEffect(() => {
    setCanvas({
      idCanvas: uuidv4(),
      imageBlob: URL.createObjectURL(
        new Blob([file], {
          type: file.type,
        })
      ),
      dimensions: {
        width: 0,
        height: 0,
      },
      file: file,
    });
  }, []);

  const [watermarked, setWatermarked] = useState<undefined | File>(undefined);

  useEffect(() => {
    if (watermarked !== undefined) onChange(watermarked);
  }, [watermarked]);

  useEffect(() => {
    (async function () {
      if (
        !canvas ||
        watermarked !== undefined ||
        canvas.dimensions.width === 0 ||
        canvas.dimensions.height === 0
      )
        return;

      const canvasDom = document.getElementById(
        canvas.idCanvas
      ) as HTMLCanvasElement;

      const context: CanvasRenderingContext2D = canvasDom.getContext("2d")!;
      const imgBitMap = await createImageBitmap(canvas.file);

      const sizeFont = +((canvas.dimensions.width * 100) / 3024).toFixed(2);

      context.drawImage(imgBitMap, 0, 0);
      context.font = `${sizeFont}px arial`;
      context.fillStyle = "#5e5e5e66";
      context.textAlign = "center";

      let yAxis = 0;
      while (yAxis < canvas.dimensions.height) {
        context.fillText(watermark, canvas.dimensions.width / 2, yAxis);
        yAxis += sizeFont * 2;
      }

      const domCanvas = document.getElementById(
        canvas.idCanvas
      ) as HTMLCanvasElement;

      if (!domCanvas) return;

      const blobCanvas: File = await new Promise((resolve, reject) => {
        domCanvas.toBlob((blob) => {
          if (blob) {
            const file = new File(
              [blob],
              `${title}.${mime.extension(blob.type)}`
            );

            resolve(file);
          }
        });
      });

      setWatermarked(blobCanvas);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canvas]);

  const updateDimensionsImage = (width: number, height: number) => {
    if (!canvas) return;

    setCanvas({
      ...canvas,
      dimensions: {
        height,
        width,
      },
    });
  };

  return {
    canvas,
    updateDimensionsImage,
    watermarked,
  };
}
