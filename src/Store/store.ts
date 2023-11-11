import { configureStore } from "@reduxjs/toolkit";
import categoryDeleteModalReducer from "./features/modal/categoryDeleteModalSlice";
import categoryReducer from "./features/category/categorySlice";
import videoDeleteModalReducer from "./features/modal/videoDeleteModalSlice";

export const store = configureStore({
  reducer: {
    categoryDeleteModal: categoryDeleteModalReducer,
    category: categoryReducer,
    videoDeleteModal: videoDeleteModalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
