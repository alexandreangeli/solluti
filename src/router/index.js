import VueRouter from "vue-router";
import Home from "../pages/Home";
import Posts from "../pages/Posts";
import Photos from "../pages/Photos";

export const router = new VueRouter({
  routes: [{
      path: "",
      name: "home",
      component: Home
    },
    {
      path: "/posts",
      name: "posts",
      component: Posts
    },
    {
      path: "/photos",
      name: "photos",
      component: Photos
    },
    {
      path: '*',
      redirect: {
        name: 'home'
      }
    }
  ],
});