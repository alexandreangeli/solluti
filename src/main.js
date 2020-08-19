import "@mdi/font/css/materialdesignicons.css";
import Vue from "vue";
import App from "./App.vue";

import VueRouter from "vue-router";
import { router } from "./router";
Vue.use(VueRouter);

import VueToast from "vue-toast-notification";
import "vue-toast-notification/dist/theme-default.css";
Vue.use(VueToast, {
  position: "top",
});

import vuetify from "@/plugins/vuetify";

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  router,
  vuetify,
}).$mount("#app");
