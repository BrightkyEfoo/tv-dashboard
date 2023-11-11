import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Category } from "Types/DataTypes/Category";
// import { Id } from "Types/DataTypes/common/id";
import { findIndexByKey } from "Utils/Common/ArrayOfObject";
import categories from "mock-data/Categories";

const initialState: Category[] = categories;

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<Category>) => {
      const prevCategoryIdx = findIndexByKey(state, "id", action.payload.id);
      state[prevCategoryIdx] = { ...action.payload };
      // return sta
    },
    addCategory: (state, action: PayloadAction<Category>) => {
      state.push(action.payload);
    }
    // getCategory: (state,action:PayloadAction<Id>) => {
    //   return findByKey(state , 'id',action.payload)
    // }
  },
});

// Action creators are generated for each case reducer function
export const categoryActions = categorySlice.actions;
const categoryReducer = categorySlice.reducer;
export default categoryReducer;
