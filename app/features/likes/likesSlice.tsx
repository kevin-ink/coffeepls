import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LikeEntry {
  likes: number;
  liked: boolean;
}

export interface LikesState {
  [postId: number]: LikeEntry;
}

const initialState: LikesState = {};

const likesSlice = createSlice({
  name: "likes",
  initialState,
  reducers: {
    setLikes: (
      state,
      action: PayloadAction<{ postId: number; likes: number; liked: boolean }>
    ) => {
      const { postId, likes, liked } = action.payload;
      state[postId] = { likes, liked };
    },
    resetLikes: () => {
      return initialState;
    },
  },
});

export const { setLikes } = likesSlice.actions;

export default likesSlice.reducer;
