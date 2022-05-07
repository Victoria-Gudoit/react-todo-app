import { createSlice } from "@reduxjs/toolkit";
import { FILTER_STATUSES } from "../components/Tasks/constants";

export const { actions, reducer } = createSlice({
  name: "filter",
  initialState: {
    filter: FILTER_STATUSES.ALL,
  },
  reducers: {
    changeFilter: (state, action) => {
      return {
        filter: action.payload,
      };
    },
  },
});
