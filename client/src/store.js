import { configureStore } from "@reduxjs/toolkit";
import { getFilmURL } from "./components/loginedcomponents/reducers";

export default configureStore({
  reducer: {
    film: getFilmURL,
  },
});
