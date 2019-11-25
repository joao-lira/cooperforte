import { createStore, applyMiddleware } from "redux";
import createSagaMiddlaware from "redux-saga";
import sagas from "./sagas";
import redurcers from "./reducers";

const sagaMiddlaware = createSagaMiddlaware();

export default createStore(redurcers, applyMiddleware(sagaMiddlaware));
sagaMiddlaware.run(sagas);
