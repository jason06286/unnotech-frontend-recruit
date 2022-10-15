<script setup>
defineEmits(['showModal']);

const route = useRoute();
const {
  params: { id },
} = route;
</script>
<template>
  <nav
    class="fixed left-0 right-0 top-0 z-10 flex items-center justify-between bg-white px-3 py-2 shadow-sm shadow-slate-300"
  >
    <router-link to="/" class="text-xl font-bold">
      <h1>Unnotech Book List</h1>
    </router-link>
    <button
      v-if="id"
      type="button"
      class="flex items-center px-3 font-bold text-blue-600 hover:text-blue-400"
      @click="$emit('showModal')"
    >
      編輯書籍
      <ic:baseline-edit />
    </button>
    <button
      v-else
      type="button"
      class="flex items-center px-3 font-bold text-blue-600 hover:text-blue-400"
      @click="$emit('showModal')"
    >
      新增書籍
      <ic:baseline-add />
    </button>
  </nav>
</template>
<style></style>
