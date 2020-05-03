import Vue from 'vue'
import Router from 'vue-router'
import Browse from './components/Browse'
import Signup from './components/Signup'
import VerifyEmail from './components/VerifyEmail'
import Login from './components/Login'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/browse',
            name: 'browse',
            component: Browse
        },
        {
            path: '/signup',
            name: 'signup',
            component: Signup
        },
        {
            path: '/verifyEmail',
            name: 'verifyEmail',
            component: VerifyEmail
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        }
    ]
})