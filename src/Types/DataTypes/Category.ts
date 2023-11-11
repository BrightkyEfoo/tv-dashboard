import { Video } from "./common/Video";
import { Id } from "./common/id";

export type CategoryUpdate = {
  name?: string;
  videos?: Video[];
};

export type Category = {
  name: string;
  videos: Video[];
  id: Id;
};
