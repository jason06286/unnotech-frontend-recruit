<script setup>
import { apiGetBook } from '@/api';
import useModal from '@/composables/useModal';

const { isShowModal, showModal } = useModal();

const route = useRoute();
const router = useRouter();

const {
  params: { id },
} = route;

const bookData = ref([]);

const getData = async () => {
  try {
    const { data } = await apiGetBook(id);
    bookData.value = data;
  } catch (error) {
    router.push(`/books`);
  }
};

onMounted(async () => {
  getData();
});
</script>
<template>
  <Navbar @show-modal="showModal" />
  <section class="mt-20">
    <div class="container m-auto px-2">
      <div class="w-full rounded-md bg-yellow-50 p-5 md:m-auto md:w-[500px]">
        <div class="mb-3 border-collapse overflow-hidden rounded-md border-4">
          <img
            src="https://i.imgur.com/yI2NrKM.jpg"
            alt="book image"
            class="h-full w-full"
          />
        </div>
        <h3 class="mb-3 border-b-2 pb-2 text-xl font-bold text-orange-400">
          {{ bookData.title }}
        </h3>
        <p class="mb-3 text-gray-600">{{ bookData.description }}</p>
        <h4 class="text-end font-bold">{{ bookData.author }}</h4>
      </div>
    </div>
  </section>
  <Modal
    v-model="isShowModal"
    :data="bookData"
    :status="'edit'"
    @get-data="getData"
  />
</template>
<style></style>
