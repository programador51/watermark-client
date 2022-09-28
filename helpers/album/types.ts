export interface ParamsUploadAlbum {
  title: string;
  kofiLink: string;
  file: File;
}

export interface AlbumI {
  _id: string;
  kofiLinkShop: string;
  photos: number;
  title: string;
  __v: number;
}
