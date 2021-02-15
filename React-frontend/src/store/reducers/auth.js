import { LOGIN, LOGOUT, TOGGLE_AUTH_LOADING } from '../actions/auth';

const initialState = {
  isAuthenticated: false,
  isLoading: false,
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOGIN:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
      };
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        isLoading: false,
      };
    case TOGGLE_AUTH_LOADING:
      return {
        ...state,
        isLoading: payload,
      };
    default:
      return state;
  }
};

export default reducer;
