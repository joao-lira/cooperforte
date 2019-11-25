import { combineReducers } from "redux";
import settings from "./settings/reducer";
import auth from "../../src/redux/reducers/auth";

const reducers = combineReducers({
  auth,
  settings
});

export default reducers;
