export default function useVirtualScroll(booksData, displayData) {
  const isLoading = ref(false);

  const cardHeight = computed(() => {
    const width = window.innerWidth;
    if (width >= 1280) {
      return 350;
    }
    return 420;
  });

  const displayColumn = computed(() => {
    const width = window.innerWidth;
    if (width >= 1536) {
      return 5;
    }
    if (width < 1536 && width >= 1280) {
      return 4;
    }
    if (width < 1280 && width >= 1024) {
      return 3;
    }
    if (width < 1024 && width >= 768) {
      return 2;
    }
    return 1;
  });

  const actualHeight = computed(() => {
    const displayDataLen = displayData.value.length;
    const booksDataLen = booksData.value.length;
    if (displayDataLen === booksDataLen) {
      const height =
        Math.ceil(displayDataLen / displayColumn.value) * cardHeight.value;
      return `height:${height}px`;
    }
    return ` height: 100vh;`;
  });

  const calcDisplay = () => {
    const displayDataLen = displayData.value.length;
    const booksDataLen = booksData.value.length;
    const height = window.innerHeight - 80;
    // one page can display how many rows
    const rows = Math.ceil(height / cardHeight.value);
    let total = displayDataLen + rows * displayColumn.value;
    if (displayDataLen === booksDataLen) {
      return;
    }
    isLoading.value = true;
    if (total >= booksDataLen) {
      total = booksDataLen;
    }
    setTimeout(() => {
      isLoading.value = false;
      displayData.value = booksData.value.slice(0, total);
    }, 1500);
  };

  const onScrollToBottom = () => {
    calcDisplay();
  };

  return {
    isLoading,
    displayColumn,
    actualHeight,
    calcDisplay,
    onScrollToBottom,
  };
}
