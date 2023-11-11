import { Category } from "Types/DataTypes/Category";
import { Id } from "Types/DataTypes/common/id";
import { NavigateFunction } from "react-router-dom";

export type videoListRendererArgs = {
  category: Category | null | undefined;
  setVideoId: (v: Id) => void;
  setIsModalOpen: (v: boolean) => void;
  navigate: NavigateFunction;
};
