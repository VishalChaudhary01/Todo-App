import axios from "axios";
import { AppDispatch } from "../app/store";
import {
  USER_SIGNIN_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNOUT,
  USER_SIGNUP_FAIL,
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
} from "../constants/userConstants";


export const signin = ({ username, password }: UserSignin) => async (dispatch: AppDispatch) => {
    try {
      dispatch({
        type: USER_SIGNIN_REQUEST,
      });
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        "http://localhost:5000/api/user/signin",
        { username, password },
        config
      );
      dispatch({
        type: USER_SIGNIN_SUCCESS,
        payload: data,
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        dispatch({
          type: USER_SIGNIN_FAIL,
          payload: e.response?.data.message || e.message,
        });
      } else {
        dispatch({
          type: USER_SIGNIN_FAIL,
          payload: String(e),
        });
      }
    }
  };

export const signout = () => (dispatch: AppDispatch) => {
  localStorage.removeItem("userInfo");
  localStorage.removeItem("token");
  dispatch({ type: USER_SIGNOUT });
};

export const signup = ({firstName, lastName, username, password}: UserSignup) => async (dispatch: AppDispatch) => {
    try {
      dispatch({
        type: USER_SIGNUP_REQUEST,
      });
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        "http://localhost:5000/api/user/signup",
        { firstName, lastName, username, password },
        config
      );
      dispatch({
        type: USER_SIGNUP_SUCCESS,
        payload: data,
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        dispatch({
          type: USER_SIGNUP_FAIL,
          payload: String(e),
        })
      } else {
        dispatch({
          type : USER_SIGNUP_FAIL,
          payload: String(e),
        })
      }
    }
};

