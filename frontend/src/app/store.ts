import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";

import { 
     signinReducer, 
     signupReducer 
} from "../reducers/userReducer";

import {
  createTaskReducer,
  deleteTaskReducer,
  getTasksReducer,
  updateTaskReducer,
} from "../reducers/taskReducer";
import { setupListeners } from "@reduxjs/toolkit/query";

const reducer = combineReducers({
  userSignin: signinReducer,
  userSignup: signupReducer,
  createTask: createTaskReducer,
  updateTask: updateTaskReducer,
  deleteTask: deleteTaskReducer,
  allTasks: getTasksReducer,
});

const initialState = {};

const middleware = [thunk];

export type RootState = ReturnType<typeof reducer>

export const makeStore = (preloadedState?: Partial<RootState>) => {
  const store = configureStore({
    reducer: reducer,
    middleware: getDefaultMiddleware => {
      return getDefaultMiddleware().concat(middleware)
    },
    preloadedState: initialState,
  })
  setupListeners(store.dispatch)
  return store
}

export const store = makeStore()
export type AppStore = typeof store;

export type AppDispatch = AppStore['dispatch']

