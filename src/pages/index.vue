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
  <Navbar />
  <section class="mt-20">
    <div class="container m-auto">
      <div
        class="m-5 grid grid-cols-1 md:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:ml-8 xl:grid-cols-4 xl:gap-5 2xl:grid-cols-5 2xl:gap-8"
      >
        <Card
          v-for="(item, index) in booksData"
          :key="item.id"
          :data="item"
          :index="index"
        />
      </div>
    </div>
  </section>
</template>
<style></style>
