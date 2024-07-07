import axios from "axios";
import { RootState, AppDispatch } from "../app/store";
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
  UPDATE_TASK_FAIL,
  UPDATE_TASK_REQUEST,
  UPDATE_TASK_SUCCESS,
} from "../constants/taskConstants";


export const createTask = ({ title, description }: Task) => async (dispatch: AppDispatch, getState:() => RootState) => {
    try {
      dispatch({
        type: CREATE_TASK_REQUEST,
      });
      const { userSignin: { userInfo } } = getState();
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo?.token}`,
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        "http://localhost:5000/api/tasks/create-task",
        {title, description},
        config
      );
      dispatch({
        type: CREATE_TASK_SUCCESS,
        payload: data,
      });
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        dispatch({
          type: CREATE_TASK_FAIL,
          payload: e.response?.data.message || e.message,
        });
      } else {
        dispatch({
          type: CREATE_TASK_FAIL,
          payload: String(e),
        });
      }
    }
  };

export const updateTask = (done: boolean, id: number) => async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      dispatch({
        type: UPDATE_TASK_REQUEST,
      });
      const { userSignin: { userInfo } } = getState();
      const config = {
        headers: {
           Authorization: `Bearer ${userInfo?.token}`,
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.put(
        `http://localhost:5000/api/tasks/update-task/${id}`,
        { done },
        config
      );
      dispatch({
        type: UPDATE_TASK_SUCCESS,
        payload: data,
      });
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        dispatch({
          type: UPDATE_TASK_FAIL,
          payload: e.response?.data.message || e.message,
        });
      } else {
        dispatch({
          type: UPDATE_TASK_FAIL,
          payload: String(e),
        });
      }
    }
  };

export const allTask = () => async (dispatch: AppDispatch, getState: () => RootState) => {
  try {
    dispatch({
      type: ALL_TASK_REQUEST,
    });
    const { userSignin: { userInfo } } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo?.token}`
      }
    }
    const { data } = await axios.get("http://localhost:5000/api/tasks/all-tasks", config);
    dispatch({
      type: ALL_TASK_SUCCESS,
      payload: data,
    });
  } catch (e: unknown) {
    if (axios.isAxiosError(e)) {
      dispatch({
        type: ALL_TASK_FAIL,
        payload: e.response?.data.message || e.message,
      });
    } else {
      dispatch({
        type: ALL_TASK_FAIL,
        payload: String(e),
      });
    }
  }
};

export const deleteTask = (id: number) => async (dispatch: AppDispatch, getState: () => RootState) => {
  try {
    dispatch({
      type: DELETE_TASK_REQUEST,
    });
    const { userSignin: { userInfo } } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo?.token}`
      }
    }
    await axios.delete(
      `http://localhost:5000/api/tasks/delete-task/${id}`,
      config
    );
    dispatch({
      type: DELETE_TASK_SUCCESS
    });
  } catch (e: unknown) {
    if (axios.isAxiosError(e)) {
      dispatch({
        type: DELETE_TASK_FAIL,
        payload: e.response?.data.message || e.message,
      });
    } else {
      dispatch({
        type: DELETE_TASK_FAIL,
        payload: String(e),
      });
    }
  }
};
