import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import API, { IData, IRej, IResp, ISqueezy } from "../api/api";

export const registration = createAsyncThunk(
  "auth/registration",
  async (data: IData, thunkAPI) => {
    try {
      const result = await API.registration(data);
      setTimeout(() => thunkAPI.dispatch(resetUsername()), 2000);
      return result;
    } catch (error) {
      const { response } = error as AxiosError<IRej>;
      setTimeout(() => thunkAPI.dispatch(resetUsername()), 2000);
      if (response?.status === 400)
        return thunkAPI.rejectWithValue(`${response?.data.detail}`);
      if (response?.status === 422)
        return thunkAPI.rejectWithValue("Validation error");
      return thunkAPI.rejectWithValue(`error status ${response?.status}`);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (data: IData, thunkAPI) => {
    try {
      await API.login(data);
    } catch (error) {
      const { response } = error as AxiosError<IRej>;
      setTimeout(() => thunkAPI.dispatch(resetError()), 2000);
      if (response?.status === 400)
        return thunkAPI.rejectWithValue(`${response?.data.detail}`);
      if (response?.status === 422)
        return thunkAPI.rejectWithValue("Validation Error");
      return thunkAPI.rejectWithValue(`error status ${response?.status}`);
    }
  }
);

export const squeezy = createAsyncThunk(
  'squeezy/link',
  async (data: ISqueezy, thunkAPI) => {
    try {
      await API.squeezy(data)
      setTimeout(() => thunkAPI.dispatch(resetDone()), 2000);
    } catch (error) {
      const { response } = error as AxiosError<IRej>;
      setTimeout(() => thunkAPI.dispatch(resetError()), 2000);
      if (response?.status === 400)
        return thunkAPI.rejectWithValue(`${response?.data.detail}`);
      if (response?.status === 422)
        return thunkAPI.rejectWithValue("Validation Error");
      return thunkAPI.rejectWithValue(`error status ${response?.status}`);
    }
  }
)

interface IinitialState {
  isAuth: boolean;
  username: string;
  error: string;
  isPending: boolean;
  isDone: boolean;
}

const initialState: IinitialState = {
  isAuth: false,
  username: "",
  error: "",
  isPending: false,
  isDone: false,
};

const authReducer = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetUsername: (state) => {
      state.error = "";
      state.username = "";
    },
    resetError: (state) => {
      state.error = "";
    },
    resetDone: (state) => {
      state.isDone = false
    }
  },
  extraReducers: {
    //registration
    [registration.fulfilled.type]: (
      state,
      { payload }: PayloadAction<IResp>
    ) => {
      state.username = payload.username;
      state.error = "";
      state.isPending = false;
    },
    [registration.pending.type]: (state) => {
      state.isPending = true;
    },
    [registration.rejected.type]: (
      state,
      { payload }: PayloadAction<string>
    ) => {
      state.error = payload;
      state.isPending = false;
    },
    //login
    [login.fulfilled.type]: (state) => {
      state.isAuth = true;
      state.error = "";
      state.isPending = false;
    },
    [login.rejected.type]: (state, { payload }: PayloadAction<string>) => {
      state.error = payload;
      state.isPending = false;
    },
    [login.pending.type]: (state) => {
      state.isPending = true;
    },
    //squeezy
    [squeezy.fulfilled.type]: (state) => {
      state.isDone = true
      state.error = "";
      state.isPending = false;
    },
    [squeezy.pending.type]: (state) => {
      state.isPending = true;
    },
    [squeezy.rejected.type]: (
      state,
      { payload }: PayloadAction<string>
    ) => {
      state.error = payload;
      state.isPending = false;
    },
  },
});

const { reducer, actions } = authReducer;

const { resetUsername, resetError, resetDone } = actions;

export default reducer;
