import Login from "../views/authentication/login";
import Register from "../views/authentication/register";
import Lockscreen from "../views/authentication/lockscreen";
import Recoverpwd from "../views/authentication/recover-pwd";
import Maintanance from "../views/authentication/maintanance";

var authRoutes = [
  {
    path: "/authentication/login",
    name: "Login",
    icon: "mdi mdi-account-key",
    component: Login
  },
  {
    path: "/authentication/register",
    name: "Register",
    icon: "mdi mdi-account-plus",
    component: Register
  },
  {
    path: "/authentication/lockscreen",
    name: "Lockscreen",
    icon: "mdi mdi-account-off",
    component: Lockscreen
  },
  {
    path: "/authentication/recover-pwd",
    name: "Recover Password",
    icon: "mdi mdi-account-convert",
    component: Recoverpwd
  },
  {
    path: "/authentication/maintanance",
    name: "Maintanance",
    icon: "mdi mdi-pencil-box-outline",
    component: Maintanance
  }
];
export default authRoutes;
