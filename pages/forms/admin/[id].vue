<template>
  <v-card class="ma-4">
    <v-card-title>Form > Admin > {{ id }}</v-card-title>
    <v-card-actions>
      <v-btn to="/forms/admin">Back to Admin</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script setup>
const route = useRoute();

const id = ref(route.params.id);
</script>
