import { AnyAction, Dispatch } from "@reduxjs/toolkit";
import { Id } from "Types/DataTypes/common/id";
import { NavigateFunction } from "react-router-dom";

export type TypeFnEdit = (id: Id, navigate: NavigateFunction) => void;

export type TypeFnDelete = (
  id: Id,
  setIsModalOpen: (value: boolean) => void,
  dispatch: Dispatch<AnyAction>
) => void;
