<script setup>
import VirtualList from 'vue3-virtual-scroll-list';

import { apiGetBooks } from '@/api';
import useModal from '@/composables/useModal';
import useVirtualScroll from '@/composables/useVirtualScroll';
import Card from '@/components/global/Card.vue';

const booksData = ref([]);
const displayData = ref([]);

const { isShowModal, showModal } = useModal();
const { isLoading, actualHeight, calcDisplay, onScrollToBottom } =
  useVirtualScroll(booksData, displayData);

const list = ref(null);

const getData = async () => {
  try {
    const { data } = await apiGetBooks();
    booksData.value = data.sort((a, b) => b.id - a.id);
    calcDisplay();
    list.value.scrollToIndex(0);
  } catch (error) {
    console.error(error.message);
  }
};

onMounted(async () => {
  await getData();
});
</script>
<template>
  <Navbar @show-modal="showModal" />
  <section>
    <div class="container m-auto">
      <VirtualList
        ref="list"
        class="list overflow-y-auto pt-20"
        :style="actualHeight"
        :data-key="'id'"
        :data-sources="displayData"
        :keeps="booksData.length + 1"
        :data-component="Card"
        :estimate-size="booksData.length + 1"
        @tobottom="onScrollToBottom"
      >
        <template #footer>
          <div
            v-show="isLoading"
            class="mb-4 flex justify-center text-xl text-white"
          >
            載入中
            <mdi:loading class="ml-2 animate-spin" />
          </div>
        </template>
      </VirtualList>
    </div>
  </section>
  <Modal v-model="isShowModal" @get-data="getData" />
</template>
<style>
.list::-webkit-scrollbar {
  display: none;
}
.wrap {
  padding-bottom: 0 !important;
  @apply m-5 grid grid-cols-1 md:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:ml-8 xl:grid-cols-4 xl:gap-5 2xl:grid-cols-5 2xl:gap-8;
}
</style>
