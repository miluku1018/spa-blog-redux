import { createSlice } from "@reduxjs/toolkit";
import {
  getMe,
  login as loginAPI,
  register as registerAPI,
} from "../../WebAPI";
import { setAuthToken, getAuthToken } from "../../utils";

export const userReducer = createSlice({
  name: "users",
  initialState: {
    isLoadingUser: false,
    user: null,
    errorMessage: null,
  },
  reducers: {
    setIsLoadingUser: (state, action) => {
      state.isLoadingUser = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setErrorMessage: (state, action) => {
      state.errorMessage = action.payload;
    },
  },
});

export const {
  setIsLoadingUser,
  setUser,
  setErrorMessage,
} = userReducer.actions;

export const getUser = () => (dispatch) => {
  dispatch(setIsLoadingUser(true));
  if (getAuthToken()) {
    return getMe().then((res) => {
      dispatch(setIsLoadingUser(false));
      if (res.ok !== 1) {
        setAuthToken(null);
        return;
      }
      dispatch(setUser(res.data));
      return res.data;
    });
  }
};

export const login = (username, password) => (dispatch) => {
  return loginAPI(username, password).then((data) => {
    if (data.ok === 0) {
      dispatch(setErrorMessage(data.message));
      return;
    }
    setAuthToken(data.token);
    return getMe().then((res) => {
      if (res.ok !== 1) {
        setAuthToken(null);
        dispatch(setErrorMessage(res.toString()));
        return;
      }
      dispatch(setUser(res.data));
      return res;
    });
  });
};

export const register = (username, nickname, password) => (dispatch) => {
  return registerAPI(username, nickname, password).then((data) => {
    if (data.ok === 0) {
      dispatch(setErrorMessage(data.message));
      return;
    }
    setAuthToken(data.token);
    return getMe().then((res) => {
      if (res.ok !== 1) {
        dispatch(setErrorMessage(res.toString()));
        return;
      }
      dispatch(setUser(res.data));
      return res;
    });
  });
};
export default userReducer.reducer;
