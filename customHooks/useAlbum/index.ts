import { useEffect, useState } from "react";
import { uploadAlbum } from "../../helpers/album";
import { FileValidated } from "@dropzone-ui/react";

import { StateUseAlbum } from "./types";

export default function useAlbum(id?: number) {
  const [form, setForm] = useState<StateUseAlbum>({
    title: "",
    kofiLink: "",
    files: [],
    toDelete: [],
    canSave: false,
    isWaitingServerResponse: false,
    progress: 1,
    uploadProgrss: 0,
  });

  const updateTitle = (title: string) => setForm({ ...form, title });
  const updateKofiLink = (kofiLink: string) => setForm({ ...form, kofiLink });

  const removeFile = (id: string | number | undefined) => {
    setForm({
      ...form,
      files: form.files.filter((x) => x.id !== id),
    });
  };

  const setIsLoading = (isWaitingServerResponse: boolean) =>
    setForm({ ...form, isWaitingServerResponse });

  const appendFiles = (incommingFiles: FileValidated[]) => {
    setForm({
      ...form,
      files: incommingFiles,
    });
  };
  useEffect(() => {
    setForm({
      ...form,
      canSave:
        form.title.length > 0 &&
        form.kofiLink.length > 0 &&
        form.files.length > 0,
    });
  }, [form.title, form.kofiLink, form.files]);

  const calculateProgress = (
    totalPhotos: number,
    currentPhotosUploaded: number
  ) => +((100 * currentPhotosUploaded) / totalPhotos).toFixed(2);

  const setProgress = (iteration: number) => {
    const uploadProgrss = calculateProgress(form.files.length, iteration);

    setForm({
      ...form,
      progress: iteration,
      uploadProgrss,
      isWaitingServerResponse: true,
    });
  };

  const attemptCreateAlbum = async (iteration = 1): Promise<any> => {
    setProgress(iteration);

    const file = form.files[iteration - 1].file;

    await uploadAlbum({
      title: form.title,
      file,
      kofiLink: form.kofiLink,
    });

    if (iteration < form.files.length) {
      return attemptCreateAlbum(iteration + 1);
    }

    setIsLoading(false);
  };

  return {
    ...form,
    updateTitle,
    appendFiles,
    updateKofiLink,
    attemptCreateAlbum,
    removeFile,
  };
}
