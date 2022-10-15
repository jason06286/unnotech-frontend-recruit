<script setup>
const route = useRoute();
const {
  params: { id },
} = route;
console.log('id :>> ', id);
</script>
<template>
  <Navbar />
  <div class="mt-20 text-white">
    {{ id }}
  </div>
</template>
<style></style>
