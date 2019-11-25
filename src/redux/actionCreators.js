import { createActions } from "reduxsauce";

export const { Types, Creators } = createActions({
  signinRequest: ["username", "password"],
  signinSuccess: ["user"],
  signinFailure: ["error"],

  authRequest: null,
  authSuccess: ["user"],
  authFailure: null,

  destroyAuthRequest: null,
  destroyAuthSuccess: null,

  registryUserRequest: ["em", "pw", "cnpj", "nmf", "nmp"]
});

export default Creators;
