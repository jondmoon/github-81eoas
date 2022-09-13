<template>
  <v-app id="inspire">
    <v-app-bar>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Game-Track</v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer">
      <v-list>
        <v-list-item
          v-for="{ icon, title, link } in navItems"
          :key="link"
          :to="link"
        >
          <template v-slot:prepend>
            <v-icon>{{ icon }}</v-icon>
          </template>
          <v-list-item-title>{{ title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main class="bg-grey-lighten-2">
      <slot />
    </v-main>
  </v-app>
</template>

<script setup>
const drawer = ref(false);
const navItems = ref([
  {
    icon: 'fas fa-home',
    title: 'Home',
    link: '/',
  },
  {
    icon: 'fas fa-dice',
    title: 'Games',
    link: '/games',
  },
  {
    icon: 'fas fa-chess-rook',
    title: 'Plays',
    link: '/plays',
  },
  {
    icon: 'fas fa-users',
    title: 'Friends',
    link: '/friends',
  },
]);
</script>
