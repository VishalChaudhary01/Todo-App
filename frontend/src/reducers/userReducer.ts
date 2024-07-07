import { PayloadAction } from "@reduxjs/toolkit";
import {
  USER_SIGNIN_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNOUT,
  USER_SIGNUP_FAIL,
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
} from "../constants/userConstants";


export const signinReducer = (state = {}, action: PayloadAction<any>): UserState => {
     switch (action.type) {
          case USER_SIGNIN_REQUEST:
               return { loading: true }
          case USER_SIGNIN_SUCCESS:
               return { loading: false, userInfo: action.payload }
          case USER_SIGNIN_FAIL:
               return { loading: false, error: action.payload }
          case USER_SIGNOUT:
               return {}
          default:
               return state
     }
}

export const signupReducer = (state = {}, action: PayloadAction<any>): UserState => {
     switch (action.type) {
          case USER_SIGNUP_REQUEST:
               return { loading: true }
          case USER_SIGNUP_SUCCESS:
               return { loading: false, userInfo: action.payload }
          case USER_SIGNUP_FAIL:
               return { loading: false, error: action.payload }
          case USER_SIGNOUT:
               return {}
          default:
               return state
     }
}

