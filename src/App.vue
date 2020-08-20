<template>
  <v-app style="display: flex">
    <v-navigation-drawer v-model="drawer" app clipped>
      <v-list dense>
        <v-list-item
          v-for="item in menuItems"
          :key="item.text"
          link
          @click="() => goToRoute(item.route)"
        >
          <v-list-item-action>
            <v-icon
              :color="
                $router.history.current.name == item.route ? 'primary' : ''
              "
              >{{ item.icon }}</v-icon
            >
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              {{ item.text }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app clipped-left color="primary" gradient dense>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <v-img
        class="mx-4"
        height="auto"
        max-width="25px"
        large
        src="http://www.solluti.com.br/img/navbar/logotipo-branco.png"
        style="cursor: pointer"
        @click="() => goToRoute('home')"
      />

      <v-toolbar-title
        class="mr-12 align-center "
        style="cursor: pointer"
        @click="() => goToRoute('home')"
      >
        SOLLUTI
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-main v-bar style="max-height: 100vh; position: relative;">
      <router-view
        style="margin: 10px 0 10px 10px; height: 100%"
        :key="$route.component"
      />
    </v-main>

    <div
      v-if="$store.state.loading"
      style="flex-direction: column; background-color: rgba(0, 0, 0, 0.5); position: absolute; top: 0; left: 0; width: 100%; height: 100%; "
      class="d-flex justify-center"
    >
      <div class="d-flex justify-center">
        <v-progress-circular
          indeterminate
          color="grey lighten-5"
          style="position: absolute; top: 50vh"
        ></v-progress-circular>
      </div>
    </div>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      drawer: null,
      menuItems: [
        {
          icon: "mdi-note-text",
          text: "Postagens",
          route: "posts",
        },
        {
          icon: "mdi-image-multiple",
          text: "Fotos",
          route: "photos",
        },
      ],
    };
  },
  created() {
    this.$vuetify.theme.dark = true;
  },
  methods: {
    goToRoute(routeName) {
      if (this.$router.history.current.name != routeName) {
        this.$router.push({ name: routeName });
      }
    },
  },
};
</script>

<style>
body,
body * {
  font-family: Lato, sans-serif;
}
</style>

<style>
::-webkit-scrollbar {
  width: 0px;
  background: transparent; /* make scrollbar transparent */
}

.vb > .vb-dragger {
  z-index: 5;
  width: 12px;
  right: 0;
  transform: translateY(50px);
}

.vb > .vb-dragger > .vb-dragger-styler {
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  -webkit-transform: rotate3d(0, 0, 0, 0);
  transform: rotate3d(0, 0, 0, 0);
  -webkit-transition: background-color 100ms ease-out, margin 100ms ease-out,
    height 100ms ease-out;
  transition: background-color 100ms ease-out, margin 100ms ease-out,
    height 100ms ease-out;
  background-color: rgba(48, 121, 244, 0.1);
  margin: 5px 5px 5px 0;
  border-radius: 20px;
  height: calc(100% - 10px);
  display: block;
}

.vb.vb-scrolling-phantom > .vb-dragger > .vb-dragger-styler {
  background-color: rgba(48, 121, 244, 0.3);
}

.vb > .vb-dragger:hover > .vb-dragger-styler {
  background-color: rgba(48, 121, 244, 0.5);
  margin: 0px;
  height: 100%;
}

.vb.vb-dragging > .vb-dragger > .vb-dragger-styler {
  background-color: rgba(48, 121, 244, 0.5);
  margin: 0px;
  height: 100%;
}

.vb.vb-dragging-phantom > .vb-dragger > .vb-dragger-styler {
  background-color: rgba(48, 121, 244, 0.5);
}
</style>
