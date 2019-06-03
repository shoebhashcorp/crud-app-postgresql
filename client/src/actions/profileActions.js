import axios from "axios";

import {
  GET_PROFILE,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  GET_ERRORS
} from "./types";

export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get("/api/profile/add")
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: {}
      })
    );
};

export const getProfileById = id => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get(`/api/profile/contact/${id}`)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const createProfile = (profileData, history) => dispatch => {
  axios
    .post("/api/profile/add", profileData)
    .then(res => history.push("/dashboard"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const updateProfile = (profileData, history) => dispatch => {
  axios
    .put(`/api/profile/profile/${profileData.id}`, profileData)
    .then(res => history.push("/dashboard"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};

export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};

export const deleteAddress = id => dispatch => {
  axios
    .delete(`/api/profile/user/${id}`)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: {}
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.res.data
      })
    );
};
