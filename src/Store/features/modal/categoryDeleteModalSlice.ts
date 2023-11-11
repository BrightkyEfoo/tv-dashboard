import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Id } from "Types/DataTypes/common/id";
import { categoryDeleteModalState } from "Types/Store/categoryDeleteModal";

const initialState: categoryDeleteModalState = {
  categoryId: "",
};

export const categoryDeleteModalSlice = createSlice({
  name: "categoryDeleteModal",
  initialState,
  reducers: {
    setCategoryId: (state, action: PayloadAction<Id>) => {
      state.categoryId = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const categoryDeleteModalActions = categoryDeleteModalSlice.actions;
const categoryDeleteModalReducer = categoryDeleteModalSlice.reducer;
export default categoryDeleteModalReducer;
