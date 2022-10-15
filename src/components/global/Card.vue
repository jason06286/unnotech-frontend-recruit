<script setup>
defineProps({
  data: {
    type: Object,
    default: () => ({}),
    required: true,
  },
  index: {
    type: Number,
    default: 0,
    required: true,
  },
});
</script>
<template>
  <router-link
    :to="`/books/${data.id}`"
    class="card mb-6"
    :style="
      index % 2 === 0
        ? `background-image: url('https://i.imgur.com/VyUABB6.jpg')`
        : `background-image: url('https://i.imgur.com/42rz0C1.jpg')`
    "
  >
    <div
      class="flex h-full items-end border-8 border-transparent"
      :class="index % 2 === 0 ? `border-odd` : `border-even`"
    >
      <h2 class="z-10 p-5 text-2xl font-bold text-white">
        {{ data.title }}
      </h2>
    </div>
  </router-link>
</template>
<style scoped>
.card {
  @apply relative   h-[420px] w-full cursor-pointer rounded-lg bg-cover bg-center p-5 transition-all duration-200 after:absolute after:inset-0 after:rounded-lg after:bg-gradient-to-br after:from-red-400 after:via-orange-400 after:to-orange-200 
   after:opacity-40 after:transition-all after:duration-300
  even:after:from-blue-400 even:after:via-teal-500 even:after:to-teal-300 hover:bg-left-bottom hover:after:opacity-60 xl:h-[350px];
}

.border-odd {
  border-image: linear-gradient(45deg, #ffc271, #ff5f6d);
  border-image-slice: 1;
}
.border-even {
  border-image: linear-gradient(45deg, #2cc1ad, #00b1e2);
  border-image-slice: 1;
}
</style>
