<script setup>
import { apiGetBook } from '@/api';

const route = useRoute();
const router = useRouter();

const {
  params: { id },
} = route;

const bookData = ref([]);

onMounted(async () => {
  try {
    const { data } = await apiGetBook(id);
    bookData.value = data;
  } catch (error) {
    router.push(`/books`);
  }
});
</script>
<template>
  <Navbar />
  <div class="mt-20 text-white">
    <div class="container m-auto">
      {{ bookData }}
      {{ id }}
    </div>
  </div>
</template>
<style></style>
