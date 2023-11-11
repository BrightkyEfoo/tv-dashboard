import { Id } from "Types/DataTypes/common/id";

export type Props = {
  name: string;
  videos: {
    videoUrl: string;
    imageUrl: string;
    title: string;
    author: string;
    id: Id;
  }[];
  id: Id;
};
