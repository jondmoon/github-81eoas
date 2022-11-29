<template>
  <v-card class="ma-4">
    <v-card-title>Form > {{ id }}</v-card-title>
    <v-card-actions>
      <v-btn to="/forms">Back to List</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script setup>
const route = useRoute();

const id = ref(route.params.id);
</script>
