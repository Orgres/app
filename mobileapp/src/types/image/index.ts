import { Photo } from "@capacitor/camera";

export type ImageType = { meter: "ПУ" };
export type ImageNames = keyof ImageType;

export type Images = {
    [key in ImageNames]: {
        files: { index: number, file: Photo }[];
        count: number;
        name: ImageType[key];
        errorMessage: string;
    }
}
