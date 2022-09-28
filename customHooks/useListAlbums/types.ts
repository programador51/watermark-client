import { AlbumI } from "../../helpers/album/types";

export interface StateUseListAlbums {
  isLoading: boolean;
  currentPage: number;
  albums: AlbumI[];
  areMoreRecords: boolean;
}
