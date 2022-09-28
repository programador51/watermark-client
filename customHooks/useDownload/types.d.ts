import { AlbumI } from "../../helpers/album/types";

export interface OnDownloadedI {
  watermark: string;
  title: string;
  files: File[];
}

export interface StateUseDownload {
  /**
   * File instances of the files once that have been downloaded from the server
   * (.zips)
   */
  photos: File[];

  currentPhoto: number;
  progress: number;

  /**
   * Unzipped files, this is the array of type photos in order to watermark them
   * (Unwatermarked)
   */
  files: File[];

  title: string;

  /**
   * Images that need to be downloaded
   * (Watermakeds)
   */
  toDownload: File[];

  /**
   * Kofi link shop of the item tried to be downloaded
   * @example 'https://ko-fi.com/s/1f5s3eca9b6d'
   */
  kofiLinkShop: string | undefined;

  /**
   * Name of the files that are allocated on the server
   * @example ['A.zip','B.zip']
   */
  namePhotos: string[];
  isLoading: boolean;

  /**
   * Number of photos that has the item purchased
   */
  totalPhotos: number;

  /**
   * UUID of the paypal transaction
   * @example '0a1fac0c-f960-4506-a60e-824979a74e71'
   */
  uuidTransaction: string;

  /**
   * Information of the albums bought with the UUID transaction
   */
  albumsBought: AlbumI[];

  /**
   * Step of the convertion
   */
  step: number;
}
