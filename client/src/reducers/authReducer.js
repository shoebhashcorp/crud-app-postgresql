import { SET_CURRENT_USER, SET_SOCKET_CONNECTION } from "../actions/types";
import isEmpty from "../validation/is-empty";

var protocol = window.location.protocol;
var slashes = protocol.concat("//");
var host = slashes.concat(window.location.hostname);

const initialState = {
  isAuthenticated: false,

  user: {},
  socket: null,

  socketURI: `${host}:8080`
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };

    case SET_SOCKET_CONNECTION:
      return {
        ...state,
        socket: action.payload
      };

    default:
      return state;
  }
}
