import VueRouter from "vue-router";
import Home from "../components/Home";
import Posts from "../components/Posts";
import Photos from "../components/Photos";

export const router = new VueRouter({
  routes: [
    { path: "/", name: "home", component: Home },
    { path: "/posts", name: "posts", component: Posts },
    { path: "/photos", name: "photos", component: Photos },
  ],
});
