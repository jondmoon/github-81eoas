<template>
  <v-app id="inspire">
    <v-app-bar>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Scots Portal</v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer">
      <v-list>
        <template
          v-for="{ icon, title, link, href, children, base } in navItems"
          :key="title"
        >
          <v-list-item
            v-if="link"
            :to="link"
            :prepend-icon="icon"
            :title="title"
          >
          </v-list-item>
          <v-list-item
            v-else-if="href"
            :href="href"
            :prepend-icon="icon"
            :title="title"
          >
          </v-list-item>
          <v-list-group v-else-if="children.length > 0">
            <template v-slot:activator="{ props }">
              <v-list-item v-bind="props" :prepend-icon="icon" :title="title">
              </v-list-item>
            </template>
            <v-list-item
              v-for="{ icon, title, link, href } in children"
              :key="title"
              :to="link ? base + link : ''"
              :href="href"
              :prepend-icon="icon"
              :title="title"
            >
            </v-list-item>
          </v-list-group>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-main class="bg-grey-lighten-2">
      <slot />
    </v-main>
  </v-app>
</template>
<style></style>
<script setup>
const drawer = ref(false);
const navItems = ref([
  {
    icon: 'fas fa-home',
    title: 'Dashboard',
    link: '/',
  },
  {
    icon: 'fas fa-bookmark',
    title: 'Banner',
    children: [
      {
        icon: '',
        title: 'Employee',
        href: 'https://bannerweb.covenant.edu:8443/EmployeeSelfService',
      },
      {
        icon: '',
        title: 'Student',
        href: 'https://bannerweb.covenant.edu:8443/StudentSelfService/ssb/studentProfile',
      },
      {
        icon: '',
        title: 'Finance',
        href: 'https://bannerweb.covenant.edu:8443/FinanceSelfService',
      },
    ],
  },
  {
    icon: 'fas fa-calendar',
    title: 'Calendar',
    base: '/calendar',
    children: [
      {
        icon: '',
        title: 'Class Calendar',
        link: '/classes',
      },
      {
        icon: '',
        title: 'Class Schedule',
        link: '/schedule',
      },
      {
        icon: '',
        title: 'Term Setup',
        link: '/setup',
      },
    ],
  },
  {
    icon: 'fas fa-file-alt',
    title: 'Forms',
    base: '/forms',
    children: [
      {
        icon: '',
        title: 'List',
        link: '/',
      },
      {
        icon: '',
        title: 'Admin',
        link: '/admin',
      },
      {
        icon: '',
        title: 'Option Editor',
        link: '/admin/options',
      },
    ],
  },
]);
</script>
