import { configureStore, thunkMiddleware } from "@reduxjs/toolkit";
import logger from "redux-logger";

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(logger),
  reducer: {},
});

export const AppDispatch = store.dispatch;
export const RootState = store.getState;

export const AppThunk = (action) => {
  return function (dispatch, getState) {
    return action(dispatch, getState);
  };
};

