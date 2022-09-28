import React from "react";
import { Dropzone, FileItem } from "@dropzone-ui/react";
import scss from "./styles.module.scss";
import { Required } from "../../molecules/required";
import Input from "../../molecules/input";
import Label from "../../atoms/label";
import { Button } from "../../molecules/button";
import useAlbum from "../../customHooks/useAlbum";
import Spinner from "../../molecules/spinner";

export default function Album() {
  const hookAlbum = useAlbum();

  if (hookAlbum.isWaitingServerResponse)
    return (
      <Spinner>
        <div className={scss.loading}>
          <p>Uploading</p>
          <p>
            {hookAlbum.progress} of {hookAlbum.files.length} (
            {hookAlbum.uploadProgrss}%)
          </p>
        </div>
      </Spinner>
    );

  return (
    <div className={scss.container}>
      <form onSubmit={(e) => e.preventDefault()} className={scss.form}>
        <div
          style={{
            margin: "0 0 20px 0",
          }}
        >
          <Label>Ko-Fi link shop</Label>
          <Input
            type={"text"}
            onChange={(e) => hookAlbum.updateKofiLink(e.target.value)}
          />
          <Required value={hookAlbum.kofiLink} />
        </div>

        <div>
          <Label>Title</Label>
          <Input
            type={"text"}
            onChange={(e) => hookAlbum.updateTitle(e.target.value)}
          />
          <Required value={hookAlbum.title} />
        </div>

        <Button
          onClick={async () => await hookAlbum.attemptCreateAlbum()}
          disabled={!hookAlbum.canSave}
          style={{
            margin: "10px 0 0 0",
          }}
        >
          Save
        </Button>
      </form>

      <Dropzone
        onChange={hookAlbum.appendFiles}
        value={hookAlbum.files}
        accept="image/png,image/jpg,image/jpeg"
        view="grid"
        footer={false}
        style={{
          width: "100%",
          height: "200px",
        }}
      >
        {hookAlbum.files.map((file, i) => (
          <FileItem
            key={`file-${i}`}
            {...hookAlbum.files}
            {...file}
            preview
            info={true}
            onDelete={hookAlbum.removeFile}
          />
        ))}
      </Dropzone>
    </div>
  );
}
