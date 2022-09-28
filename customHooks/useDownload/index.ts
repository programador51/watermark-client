import { useEffect, useState } from "react";
import {
  downloadPhoto,
  getDownloadInfo,
  getUrlPhotos,
} from "../../helpers/album";
import { reverseString } from "../../helpers/text";
import { calculateProgress, unzipFirstFilePasswored } from "../../helpers/zip";
import { OnDownloadedI, StateUseDownload } from "./types";

export default function useDownload(
  onDownloaded = (info: OnDownloadedI) => {}
) {
  const [state, setState] = useState<StateUseDownload>({
    photos: [],
    files: [],
    kofiLinkShop: undefined,
    namePhotos: [],
    isLoading: false,
    totalPhotos: 0,
    uuidTransaction: "",
    albumsBought: [],
    title: "",
    step: 1,
    progress: 0,
    currentPhoto: 1,
    toDownload: [],
  });

  const [toDownload, setToDownload] = useState<File[]>([]);

  const performDownload = async (
    iteration = 0,
    url: string[],
    files: File[]
  ): Promise<any> => {
    const file = await downloadPhoto(state.kofiLinkShop, url[iteration]);

    if (iteration < url.length - 1) {
      setState((value) => ({
        ...value,
        currentPhoto: iteration + 1,
        progress: calculateProgress(state.totalPhotos, iteration + 1),
      }));
      return performDownload(
        iteration + 1,
        url,
        file === undefined ? files : [file, ...files]
      );
    }

    setState({
      ...state,
      photos: [file!, ...files],
    });
    return;
  };

  useEffect(() => {
    (async function () {
      if (state.namePhotos.length <= 0) return;

      await performDownload(0, state.namePhotos, []);
    })();
  }, [state.namePhotos]);

  useEffect(() => {
    (async function () {
      if (
        state.photos.length === state.totalPhotos &&
        state.photos.length > 0
      ) {
        const querys = state.photos.map((zip) =>
          (async function () {
            const fileNameReversed = reverseString(zip.name);
            const unzipedFile = await unzipFirstFilePasswored(
              zip,
              fileNameReversed.substring(4, fileNameReversed.length)
            );
            return unzipedFile;
          })()
        );

        const unziped = await Promise.all(querys);

        const album = state.albumsBought.find(
          (album) => album.kofiLinkShop === state.kofiLinkShop
        );

        setState({
          ...state,
          files: unziped,
          step: 5,
          title: album?.title || window.crypto.randomUUID(),
        });

        onDownloaded({
          watermark: state.uuidTransaction,
          title: album?.title || window.crypto.randomUUID(),
          files: unziped,
        });
      }
    })();
  }, [state.photos]);

  const updateUuid = (uuidTransaction: string) =>
    setState({ ...state, uuidTransaction });

  const attemptGetInfoDownload = async () => {
    setState({
      ...state,
      isLoading: true,
    });

    const albumsBought = await getDownloadInfo(state.uuidTransaction);

    setState({
      ...state,
      albumsBought,
      step: albumsBought.length > 0 ? 2 : 1,
      isLoading: false,
    });
  };

  const setKofiLink = (kofiLinkShop: string, totalPhotos: number) =>
    setState({
      ...state,
      kofiLinkShop,
      totalPhotos,
    });

  const getPhotosInfo = async () => {
    const urls = await getUrlPhotos(state.kofiLinkShop);
    setState({
      ...state,
      isLoading: true,
      namePhotos: urls,
      step: 3,
    });
  };

  const appendWatermarkedFile = (file: File) =>
    setToDownload([...toDownload, file]);

  return {
    ...state,
    updateUuid,
    attemptGetInfoDownload,
    setKofiLink,
    getPhotosInfo,
    appendWatermarkedFile,
    performDownload,
  };
}
