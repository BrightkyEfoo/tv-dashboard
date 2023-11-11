import { Id } from "./id";

export type Video = {
  videoUrl: string;
  imageUrl: string;
  title: string;
  author: string;
  id: Id;
};

export type VideoUpdate = {
  videoUrl?: string;
  imageUrl?: string;
  title?: string;
  author?: string;
};
