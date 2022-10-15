<script setup>
import { apiGetBooks } from '@/api';
import useModal from '@/composables/useModal';

const { isShowModal, showModal } = useModal();

const booksData = ref([]);

const getData = async () => {
  const { data } = await apiGetBooks();
  booksData.value = data.sort((a, b) => b.id - a.id);
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth',
  });
};

onMounted(async () => {
  getData();
});
</script>
<template>
  <Navbar @show-modal="showModal" />
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
  <Modal v-model="isShowModal" @get-data="getData" />
</template>
<style></style>
