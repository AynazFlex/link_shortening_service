import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import API, { IRej, IRespSqueezy } from "../api/api";

export const getStatistics = createAsyncThunk(
  "statistics",
  async (offset: number, thunkAPI) => {
    try {
      const result = await API.getStatistics(offset);
      return result;
    } catch (error) {
      const { response } = error as AxiosError<IRej>;
      if (response?.status === 400)
        return thunkAPI.rejectWithValue(`${response?.data.detail}`);
      if (response?.status === 422)
        return thunkAPI.rejectWithValue("Validation Error");
      return thunkAPI.rejectWithValue(`error status ${response?.status}`);
    }
  }
);

interface IState {
  items: IRespSqueezy[];
  isFetch: boolean;
  error: string
}

const initialState: IState = {
  items: [],
  isFetch: false,
  error: ''
};

const statisticsReducer = createSlice({
  name: "statistics",
  initialState,
  reducers: {
    resetItems(state) {
        state.items = [];
    }
  },
  extraReducers: {
    [getStatistics.fulfilled.type]: (state, {payload}: PayloadAction<IRespSqueezy[]>) => {
        state.items = state.items.concat(payload)
        state.isFetch = false
        state.error = ''
    },
    [getStatistics.pending.type]: (state) => {
        state.isFetch = true
    },
    [getStatistics.rejected.type]: (state, {payload}: PayloadAction<string>) => {
        state.isFetch = false
        state.error = payload
    }
  },
});

const { reducer, actions } = statisticsReducer;

export const { resetItems } = actions;

export default reducer;
