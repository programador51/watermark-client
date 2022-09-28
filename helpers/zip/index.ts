import { ZipReader, BlobReader, BlobWriter } from "@zip.js/zip.js";
import * as mime from "mime-types";
import FileSaver, { saveAs } from "file-saver";
import JSZip from "jszip";

/**
 * Unzip a file and get the first file on that .zip
 * @param file - File
 * @param password - Password of the file to unzip
 * @returns Unziped file
 * @example
 * (async function(){
 *  const file = await unzipFirstFilePasswored(new Blob[],'123');
 * })()
 */
export async function unzipFirstFilePasswored(
  file: Blob | File,
  password: string
): Promise<File> {
  const blobReadable = new BlobReader(file);

  const zip = new ZipReader(blobReadable, {
    password,
  });

  const unzipedFile = await zip.getEntries();

  const fileWrite = new BlobWriter();

  const fileExtracted = await unzipedFile[0].getData?.(fileWrite, {
    password,
  });

  const mimeType = mime.lookup(unzipedFile[0].filename) || "text/html";

  const instance = new File([fileExtracted!], unzipedFile[0].filename, {
    type: mimeType,
  });
  return instance;
}

/**
 * Compress files
 * @param title - Filname of the folder that's gonna be created inside of the zip to put the files
 * @param downloadOnFinish - If true, zip will be downloaded after compression process
 * @returns {Blob} Zipped file as blob instance
 */
export async function compress(
  files: File[],
  title = window.crypto.randomUUID(),
  downloadOnFinish = false
): Promise<Blob | undefined> {
  if (files.length === 0) return undefined;
  const zip = new JSZip();
  const photos = zip.folder(title);
  files.forEach((blob, i) => {
    if (photos) {
      photos.file(`${blob.name}`, blob);
    }
  });

  const blobZip = await new Promise<Blob>((resolve, reject) => {
    zip
      .generateAsync({ type: "blob" })
      .then(function (content) {
        resolve(content);
      })
      .catch((e) => {
        console.log(e);
        return e;
      });
  });

  if (downloadOnFinish) {
    FileSaver.saveAs(blobZip, `${title}.zip`);
  }

  return blobZip;
}

export const calculateProgress = (
  totalPhotos: number,
  currentPhotosUploaded: number
) => +((100 * currentPhotosUploaded) / totalPhotos).toFixed(2);
