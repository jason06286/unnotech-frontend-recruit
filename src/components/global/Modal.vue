<script setup>
import { useToast } from 'vue-toastification';

import { apiEditBook, apiPostBook } from '@/api';

import { VueFinalModal, $vfm } from 'vue-final-modal';
import { useForm, useField } from 'vee-validate';
import { bookSchema } from '@/methods/validate';

const props = defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
  status: {
    type: String,
    default: 'add',
  },
});
const emit = defineEmits(['getData']);

const toast = useToast();

const { errors, handleSubmit, resetForm } = useForm({
  validationSchema: bookSchema,
});

const isShowCancelModal = ref(false);

const { value: title } = useField('title');
const { value: author } = useField('author');
const description = ref('');

const reForm = () => {
  if (!Object.keys(props.data).length) {
    title.value = undefined;
    author.value = undefined;
    description.value = '';
  } else {
    title.value = props.data.title;
    author.value = props.data.author;
    description.value = props.data.description;
  }
};

const closeModal = () => {
  reForm();
  if (!Object.keys(props.data).length) {
    resetForm();
  }
  $vfm.hideAll();
};

const isChangeForm = computed(() => {
  if (
    title.value === props.data.title &&
    author.value === props.data.author &&
    description.value === props.data.description
  ) {
    return false;
  }
  return true;
});

const onSubmit = handleSubmit(async () => {
  const submitObj = {
    title: title.value,
    author: author.value,
    description: description.value,
  };
  try {
    if (props.status === 'add') {
      await apiPostBook(submitObj);
      toast.success('新增書籍成功!');
    } else {
      await apiEditBook(props.data.id, submitObj);
      toast.success('編輯書籍成功!');
    }
    closeModal();
    emit('getData');
  } catch (error) {
    console.error(error.message);
  }
});

watchEffect(() => {
  reForm();
});
</script>
<template>
  <vue-final-modal
    :click-to-close="false"
    v-bind="$attrs"
    classes="flex justify-center items-center"
    content-class="relative flex flex-col max-h-full mx-4 p-4 border border-gray-800 rounded  bg-black text-white"
    :overlay-style="['background-color: rgba(91, 112, 131, 0.4)']"
  >
    <button
      class="absolute top-0 right-0 mt-2 mr-2"
      @click="isShowCancelModal = true"
    >
      <mdi-close class="text-gray-400"></mdi-close>
    </button>
    <div class="w-[280px] p-1 sm:w-[500px]">
      <span class="mr-8 text-2xl font-bold">
        <h2>{{ status === 'add' ? '新增' : '編輯' }}書籍</h2>
      </span>

      <form
        class="flex-grow overflow-y-auto px-3 text-gray-400"
        @submit="onSubmit"
      >
        <div class="mb-2">
          <label
            for="title"
            class="mb-2 block"
            :class="errors.title ? 'text-red-700' : 'text-gray-400'"
            >名稱</label
          >
          <input
            id="title"
            v-model.trim="title"
            type="text"
            class="w-full rounded-md border-2 bg-transparent p-2 outline-none focus:border-blue-400"
            :class="errors.title ? 'border-red-700 ' : 'border-gray-400 '"
          />
          <p class="mt-2 text-sm text-red-800">{{ errors.title }}</p>
        </div>
        <div class="mb-2">
          <label
            for="author"
            class="mb-2 block"
            :class="errors.author ? 'text-red-700' : 'text-gray-400'"
            >作者</label
          >
          <input
            id="author"
            v-model.trim="author"
            type="text"
            class="w-full rounded-md border-2 bg-transparent p-2 outline-none focus:border-blue-400"
            :class="errors.author ? 'border-red-700 ' : 'border-gray-400 '"
          />
          <p class="mt-2 text-sm text-red-800">{{ errors.author }}</p>
        </div>
        <div>
          <label for="description" class="mb-2 block">備註</label>
          <textarea
            id="description"
            v-model="description"
            class="h-24 w-full rounded-md border-2 bg-transparent p-2 outline-none focus:border-blue-400 sm:h-48"
          ></textarea>
        </div>
        <div class="flex flex-shrink-0 items-center justify-end pt-4">
          <button type="button" class="cancel-btn mr-3 bg-red-900/50">
            取消
          </button>
          <button
            type="submit"
            class="confirm-btn bg-blue-900/50"
            :disabled="!isChangeForm"
          >
            確認
          </button>
        </div>
      </form>
    </div>
  </vue-final-modal>
  <vue-final-modal
    v-model="isShowCancelModal"
    :esc-to-close="true"
    classes="flex justify-center items-center text-gray-300"
    content-class="relative flex flex-col max-h-full mx-4 p-4 border border-gray-800 rounded bg-black"
    :overlay-style="['background-color: rgba(91, 112, 131, 0.4)']"
  >
    <span class="mr-8 text-center text-xl font-bold">
      捨棄/取消 {{ status === 'add' ? '新增' : '編輯' }}書籍
    </span>
    <div
      class="flex w-[300px] flex-grow flex-col items-center justify-center overflow-y-auto border-b border-gray-600 py-5 text-gray-400"
    >
      <p>確定要捨棄/取消 {{ status === 'add' ? '新增' : '編輯' }}書籍嗎?</p>
      <p class="text-sm">系統將不會儲存你的內容</p>
    </div>
    <div class="flex flex-shrink-0 items-center justify-end gap-x-5 pt-4">
      <button
        class="flex cursor-pointer items-center justify-center rounded-md border border-gray-400 bg-slate-200/50 px-1 py-1 text-sm font-bold text-gray-300 shadow-md shadow-slate-200 transition-all duration-200 hover:bg-slate-200/60 hover:shadow-black sm:px-3 sm:py-2 sm:text-base"
        @click="isShowCancelModal = false"
      >
        取消
      </button>
      <button class="cancel-btn" @click="closeModal">確定取消</button>
    </div>

    <button
      class="absolute top-0 right-0 mt-2 mr-2"
      @click="isShowCancelModal = false"
    >
      <mdi-close class="text-gray-400"></mdi-close>
    </button>
  </vue-final-modal>
</template>
<style>
.confirm-btn {
  @apply flex cursor-pointer items-center justify-center rounded-md border border-gray-400 bg-blue-900/50 px-1 py-1 text-sm font-bold text-gray-300 shadow-md shadow-blue-900 transition-all duration-200 hover:bg-blue-400/50 hover:shadow-black disabled:bg-gray-500 sm:px-3 sm:py-2 sm:text-base;
}
.cancel-btn {
  @apply flex cursor-pointer items-center justify-center rounded-md border border-gray-400 bg-red-900/50 px-1 py-1 text-sm font-bold text-gray-300 shadow-md shadow-red-900 transition-all duration-200 hover:bg-red-400/50 hover:shadow-black sm:px-3 sm:py-2 sm:text-base;
}
</style>
