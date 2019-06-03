import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import jwt_decode from "jwt-decode";
import { logoutUser } from "./actions/authActions";

const middlware = [thunk];
const initialState = {};

const checkTokenExpirationMiddleware = store => next => action => {
  if (localStorage.jwtToken) {
    // set auth token header auth

    //decode token and get user info and exp
    const decoded = jwt_decode(localStorage.jwtToken);
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      //logout user
      store.dispatch(logoutUser());
    }
    checkTokenExpiry(decoded);
  }
  next(action);
};

let tokenExpiryInterval = null;
function checkTokenExpiry(decoded) {
  if (decoded) {
    if (!tokenExpiryInterval) {
      tokenExpiryInterval = setInterval(() => {
        // check for expired tokens
        const currentTime = Date.now() / 1000;
        if (decoded.exp < currentTime) {
          //logout user
          store.dispatch(logoutUser());
          //redirect to login
          window.location.href = "/login";
        }
      }, 1000);
    }
  } else if (tokenExpiryInterval) {
    clearInterval(tokenExpiryInterval);
  }
}

const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(...middlware, checkTokenExpirationMiddleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);
// compose(
//   applyMiddleware(...middlware),
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// )

export default store;
