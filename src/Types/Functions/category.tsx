import { AnyAction, Dispatch } from "@reduxjs/toolkit";
import { Category } from "Types/DataTypes/Category";
import { NavigateFunction } from "react-router-dom";

export type renderCategoriesArgs = {
  categories?: Category[];
  navigate: NavigateFunction;
  setIsModalOpen: (value: boolean) => void;
  dispatch: Dispatch<AnyAction>;
};
