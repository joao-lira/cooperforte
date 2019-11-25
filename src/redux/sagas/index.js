import { takeLatest, all, put, call } from "redux-saga/effects";
import { Types } from "../actionCreators";
import ActionCreators from "../actionCreators";
import { auth, login, destroyAuth } from "./auth";
import { PATH_BASE_URL_API } from "../../constants/constants";
import Api from "../../services/RestApi";

const api = Api(PATH_BASE_URL_API);
export default function* rootSaga() {
  yield all([
    takeLatest(Types.SIGNIN_REQUEST, login({ api })),
    takeLatest(Types.AUTH_REQUEST, auth),
    takeLatest(Types.DESTROY_AUTH_REQUEST, destroyAuth),

    put(ActionCreators.authRequest())
  ]);
}
