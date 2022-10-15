<script setup>
import { apiGetBooks } from '@/api';

const booksData = ref([]);

onMounted(async () => {
  const { data } = await apiGetBooks();
  booksData.value = data.sort((a, b) => b.id - a.id);
  console.log('data :>> ', data);
  console.log('booksData.value :>> ', booksData.value);
});
</script>
<template>
  <div>
    <Card />
  </div>
</template>
<style></style>
