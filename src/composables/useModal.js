export default function useModal() {
  const isShowModal = ref(false);

  const showModal = () => {
    isShowModal.value = true;
  };

  return {
    isShowModal,
    showModal,
  };
}
