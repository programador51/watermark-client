import { FileValidated } from "@dropzone-ui/react";

// FileValidated
export interface StateUseAlbum {
  title: string;
  kofiLink: string;
  files: FileValidated[];
  toDelete: string[];
  canSave: boolean;
  isWaitingServerResponse: boolean;
  /**
   * Indicates how many files have been uploaded to the server
   */
  progress: number;
  uploadProgrss: number;
}
