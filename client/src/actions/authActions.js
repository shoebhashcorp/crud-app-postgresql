import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import socketIOClient from "socket.io-client";
import { GET_ERRORS, SET_CURRENT_USER, SET_SOCKET_CONNECTION } from "./types";
import store from "../store";
// Register User
export const registerUser = (userData, history) => dispatch => {
  axios
    .post("/api/users/register", userData)
    .then(res => history.push("/login"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Login - Get User Token
export const loginUser = userData => dispatch => {
  axios
    .post("/api/users/login", userData)
    .then(res => {
      // Save to localStorage
      const { token } = res.data;
      // Set token to ls
      localStorage.setItem("jwtToken", token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const loginSocketUser = socketData => dispatch => {
  const { token } = socketData;

  // set token to localstorage
  localStorage.setItem("jwtToken", token);
  try {
    // set token to Auth header
    setAuthToken(token);
    //decode token to get user data
    const decoded = jwt_decode(token);
    //set current user
    dispatch(setCurrentUser(decoded));
  } catch (error) {
    //logout user
    dispatch(logoutUser());
    //redirect to login
    window.location.href = "/login";
  }
};

// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// Log user out
export const logoutUser = () => dispatch => {
  // Remove token from localStorage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};

export const setSocketConnection = () => dispatch => {
  const socketURI = store.getState().auth.socketURI;
  const socket = socketIOClient(socketURI);
  dispatch({ type: SET_SOCKET_CONNECTION, payload: socket });
};
