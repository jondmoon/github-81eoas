<template>
  <v-card class="ma-4">
    <v-card-title>Form > Admin > {{ id }}</v-card-title>
  </v-card>
</template>
<script setup>
const route = useRoute();

const id = ref(route.params.id);
</script>
