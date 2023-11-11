import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Id } from "Types/DataTypes/common/id";
import { videoDeleteModalState } from "Types/Store/videoDeleteModal";

const initialState: videoDeleteModalState & { reloadVar: boolean } = {
  videoId: "",
  reloadVar: false,
};

export const videoDeleteModalSlice = createSlice({
  name: "videoDeleteModal",
  initialState,
  reducers: {
    setVideoId: (state, action: PayloadAction<Id>) => {
      state.videoId = action.payload;
    },
    reload: (state) => {
      state.reloadVar = !state.reloadVar;
    },
  },
});

// Action creators are generated for each case reducer function
export const videoDeleteModalActions = videoDeleteModalSlice.actions;
const videoDeleteModalReducer = videoDeleteModalSlice.reducer;
export default videoDeleteModalReducer;
