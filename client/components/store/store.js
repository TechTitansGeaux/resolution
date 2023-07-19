import { configureStore, thunkMiddleware } from "@reduxjs/toolkit";
import logger from "redux-logger";
import appReducer from "./appSlice";

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(logger),
  reducer: {
    app: appReducer
  },
});

export const AppDispatch = store.dispatch;
export const RootState = store.getState;

export const AppThunk = (action) => {
  return function (dispatch, getState) {
    return action(dispatch, getState);
  };
};

