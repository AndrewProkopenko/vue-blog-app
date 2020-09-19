import Vue from 'vue'
import VueRouter from 'vue-router' 

import Home from '../components/Home'
import SignUp from '../components/Auth/SignUp'
import SignIn from '../components/Auth/SignIn'
import UserProfileSettings from '@/components/User/Settings/UserProfileSettings'
import UserPasswordSettings from '@/components/User/Settings/UserPasswordSettings' 
import SinglePost from '@/components/Post/SinglePost'
import UserProfile from '@/components/User/Profile/UserProfile'

 

Vue.use(VueRouter)

  const routes = [
    {
      path: '/',  
      component: Home
    },
    {
      path: '/signup',  
      component: SignUp
    },
    {
      path: '/signin',  
      component: SignIn
    }, 
    {
       path: '/settings/profile',
       component: UserProfileSettings
    },
    {
       path: '/settings/password',
       component: UserPasswordSettings
    },
    {
       path: '/:username/post/:id',
       component: SinglePost
    },
    {
      path: '/:username', 
      component: UserProfile,
      props: true
    }
  ]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
