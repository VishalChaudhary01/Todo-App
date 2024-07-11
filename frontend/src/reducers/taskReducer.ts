import { PayloadAction } from "@reduxjs/toolkit";
import {
  ALL_TASK_FAIL,
  ALL_TASK_REQUEST,
  ALL_TASK_SUCCESS,
  CREATE_TASK_FAIL,
  CREATE_TASK_REQUEST,
  CREATE_TASK_SUCCESS,
  DELETE_TASK_FAIL,
  DELETE_TASK_REQUEST,
  DELETE_TASK_SUCCESS,
  DELETE_TASK_RESET,
  RESET_TASK,
  UPDATE_TASK_FAIL,
  UPDATE_TASK_REQUEST,
  UPDATE_TASK_SUCCESS,
} from "../constants/taskConstants";

export const createTaskReducer = (state = {}, action: PayloadAction<any>): TaskState => {
  switch (action.type) {
    case CREATE_TASK_REQUEST:
      return { loading: true };
    case CREATE_TASK_SUCCESS:
      return { loading: false, task: action.payload };
    case CREATE_TASK_FAIL:
      return { loading: false, error: action.payload };
    case RESET_TASK:
      return { task: null, error: null }
    default:
      return state;
  }
};

const initialState: TaskState = {
  tasks: [],
};

export const getTasksReducer = (state = initialState, action: PayloadAction<any>): TaskState => {
  switch (action.type) {
    case ALL_TASK_REQUEST:
      return { ...state, loading: true, tasks: [] };
    case ALL_TASK_SUCCESS:
      return { ...state, loading: false, tasks: action.payload };
    case ALL_TASK_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const updateTaskReducer = (state = {}, action: PayloadAction<any>): TaskState => {
  switch (action.type) {
    case UPDATE_TASK_REQUEST:
      return { done: false };
    case UPDATE_TASK_SUCCESS:
      return { done: true };
    case UPDATE_TASK_FAIL:
      return { done: false, error: action.payload };
    default:
      return state;
  }
};

export const deleteTaskReducer = (state = {}, action: PayloadAction<any>): TaskState => {
  switch (action.type) {
    case DELETE_TASK_REQUEST:
      return { success: false };
    case DELETE_TASK_SUCCESS:
      return { success: true };
    case DELETE_TASK_FAIL:
      return { success: false, error: action.payload };
    case DELETE_TASK_RESET:
      return { success: false }
    default:
      return state;
  }
};
