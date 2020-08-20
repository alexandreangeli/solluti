import Vue from "vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";

Vue.use(Vuetify);

const opts = {
  icons: {
    iconfont: "mdi",
  },
  theme: {
    themes: {
      dark: {
        primary: "#ff981b",
        negative: "#f44336",
        positive: "#4caf50",
        action: "#3f51b5",
      },
    },
  },
};

export default new Vuetify(opts);