import axios from "axios";
import { AlbumI, ParamsUploadAlbum } from "./types";

export async function uploadAlbum({
  title,
  kofiLink,
  file,
}: ParamsUploadAlbum) {
  const dto = {
    title,
    kofiLink,
  };

  const formData = new FormData();
  formData.append("data", JSON.stringify(dto));
  formData.append("image", file, file.name);

  try {
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_URL_SERVER}/files`,
      formData
    );
  } catch (error) {
    console.log(error);
  }
}

/**
 * Get the albums registered on the system
 * @param page - Page requested
 * @returns {Promise<AlbumI[]>} Albums got
 */
export async function getAlbums(page = 1): Promise<AlbumI[]> {
  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_URL_SERVER}/albums?page=${page}`
    );
    return data;
  } catch (error) {
    return [];
  }
}

/**
 * Get the information of the albums bought according the UUID of the paypal transaction
 * @param uuid - UUID of the paypal transaction
 * @returns {Promise<AlbumI[]>}
 */
export async function getDownloadInfo(uuid: string): Promise<AlbumI[]> {
  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_URL_SERVER}/albums/info-download/${uuid}`
    );

    return data;
  } catch (error) {
    return [];
  }
}

export async function getUrlPhotos(
  kofiLinkShop: string | undefined
): Promise<string[]> {
  if (kofiLinkShop === undefined) return [];

  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_URL_SERVER}/albums/photos?url=${kofiLinkShop}`
    );
    return data;
  } catch (error) {
    return [];
  }
}

function getDriveName(link: string) {
  const lastSlashLink = link.lastIndexOf("/");
  const drivename = link.substring(lastSlashLink + 1, link.length);
  return drivename;
}

export async function downloadPhoto(
  kofiLinkShop: string | undefined,
  filename: string
): Promise<File | undefined> {
  if (kofiLinkShop === undefined) return undefined;

  const drivename = getDriveName(kofiLinkShop);

  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_URL_SERVER}/files/download/album?filename=${filename}&drivename=${drivename}`,
      {
        responseType: "blob",
      }
    );

    const file = new File([data], filename, {
      type: "application/zip",
    });

    return file;
  } catch (error) {
    return undefined;
  }
}
