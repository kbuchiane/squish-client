import Vue from "vue";
import Router from "vue-router";
import Browse from "./components/Browse";
import Signup from "./components/Signup";
import VerifyEmail from "./components/VerifyEmail";
import Login from "./components/Login";
import ResetPassword from "./components/ResetPassword"

Vue.use(Router);

export default new Router({
    mode: "history",
    routes: [
        {
            path: "/",
            redirect: {
                name: "Browse"
            }
        },
        {
            path: "/browse",
            name: "Browse",
            component: Browse
        },
        {
            path: "/signup",
            name: "Signup",
            component: Signup
        },
        {
            path: "/verifyemail",
            name: "VerifyEmail",
            component: VerifyEmail
        },
        {
            path: "/login",
            name: "Login",
            component: Login
        },
        {
            path: "/resetpassword",
            name: "ResetPassword",
            component: ResetPassword
        },
        {
            path: "*",
            redirect: {
                name: "Browse"
            }
        }
    ]
});