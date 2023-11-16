import { Video } from "./common/Video";
import { Id } from "./common/id";

export type CategoryUpdate = {
  name?: string;
  Videos?: Video[];
  description?: string;
};

export type Category = {
  description: string;
  name: string;
  Videos: Video[];
  id: Id;
};
