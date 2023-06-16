export type Account = Record<
  | "firstName"
  | "lastName"
  | "country"
  | "city"
  | "phone"
  | "email"
  | "password",
  string
> &
  Record<"isLogged", boolean>;

export interface AccountProps {
  account: Account;
}

export interface AccountAction {
  type: ACCOUNT_ACTIONS;
  payload: Account;
}

export enum ACCOUNT_ACTIONS {
  ADD = "ADD",
  LOGIN = "LOGIN",
  LOGOUT = "LOGOUT",
  DELETE = "DELETE",
}

export const signUp = (account: Account) => {
  return {
    type: ACCOUNT_ACTIONS.ADD,
    payload: account,
  };
};

export const login = ({ email, password }: any) => {
  return {
    type: ACCOUNT_ACTIONS.LOGIN,
    payload: { email, password },
  };
};

export const logout = () => {
  return {
    type: ACCOUNT_ACTIONS.LOGOUT,
  };
};
export const deleteAcc = () => {
  return {
    type: ACCOUNT_ACTIONS.DELETE,
  };
};
