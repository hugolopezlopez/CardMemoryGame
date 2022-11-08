import { configureStore } from "@reduxjs/toolkit";
import mainReducer from "./mainReducer";

const store = configureStore({
  reducer: mainReducer,
});

export default store;
