export interface PropsI {
  /**
   * Username to use on the watermark
   */
  watermark: string;

  /**
   * List of the canvas created in order to download the watermarked media
   */
  onChange?: (img: File) => void;

  /**
   * Image files to render
   */
  file: File;

  /**
   * Name of the folder that will be downloaded on the machine of the user
   */
  title?: string;
}
