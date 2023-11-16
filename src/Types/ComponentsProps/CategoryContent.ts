import { Id } from "Types/DataTypes/common/id";

export type Props = {
  name: string;
  Videos: {
    videoUrl: string;
    imageUrl: string;
    title: string;
    author: string;
    id: Id;
  }[];
  description: string;
  id: Id;
};
