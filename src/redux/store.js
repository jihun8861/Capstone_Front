import { configureStore } from "@reduxjs/toolkit";
import plantReducer from "./plantSlice";

const store = configureStore({
  reducer: {
    plant: plantReducer,
  },
});

export default store;
