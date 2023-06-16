import {
  ACCOUNT_ACTIONS,
  AccountAction,
  AccountProps,
} from "../actions/accountActions";

const initialState: AccountProps = {
  account: {
    firstName: "",
    lastName: "",
    country: "",
    phone: "",
    city: "",
    email: "",
    password: "",
    isLogged: false,
  },
};

const accountReducer = (state = initialState, action: AccountAction) => {
  switch (action.type) {
    case ACCOUNT_ACTIONS.ADD:
      return {
        ...state,
        account: action.payload,
      };
    case ACCOUNT_ACTIONS.LOGIN:
      if (
        state.account?.email === action.payload.email &&
        state.account?.password === action.payload.password
      )
        return {
          ...state,
          account: {
            ...state.account,
            isLogged: true,
          },
        };
    case ACCOUNT_ACTIONS.LOGOUT:
      return {
        ...state,
        account: {
          ...state.account,
          isLogged: false,
        },
      };
    case ACCOUNT_ACTIONS.DELETE:
      return {
        ...state,
        account: {},
      };
    default:
      return state;
  }
};

export default accountReducer;
