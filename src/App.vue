<template>
  <v-app>
    <router-view :key="$route.component" />
  </v-app>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
body,
body * {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
</style>
