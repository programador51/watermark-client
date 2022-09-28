import { useEffect, useState } from "react";
import { getAlbums } from "../../helpers/album";
import { StateUseListAlbums } from "./types";

export default function useListAlbums() {
  const [state, setState] = useState<StateUseListAlbums>({
    isLoading: true,
    currentPage: 1,
    albums: [],
    areMoreRecords: true,
  });

  const fetchPage = async (page: number) => {
    setState({
      ...state,
      isLoading: true,
    });

    const apiAlbums = await getAlbums(page);

    if (apiAlbums.length > 0) {
      setState({
        ...state,
        isLoading: false,
        albums: [...apiAlbums, ...state.albums],
        currentPage: page,
      });
    } else {
      setState({
        ...state,
        isLoading: false,
        areMoreRecords: false,
      });
    }
  };

  useEffect(() => {
    (async function () {
      await fetchPage(state.currentPage);
    })();
  }, []);

  return {
    ...state,
  };
}
