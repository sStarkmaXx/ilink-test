import { combineReducers, createStore } from "redux";
import { commentsReducer } from "./commentsReducer";

const rootReducer = combineReducers({
  comments: commentsReducer
});

export const store = createStore(rootReducer);

export type AppRootStateType = ReturnType<typeof rootReducer>;
