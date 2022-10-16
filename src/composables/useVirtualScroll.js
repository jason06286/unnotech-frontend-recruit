export default function useVirtualScroll(booksData, displayData) {
  const isLoading = ref(false);
  // 計算卡片高度 xl:h-[350px] h-[420px]
  const cardHeight = computed(() => {
    const width = window.innerWidth;
    if (width >= 1280) {
      return 350;
    }
    return 420;
  });
  // 計算可顯示一行有幾欄，2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1
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
  // 計算實際高度，如果滾動到底給予正確高度，正確高度= rows*card height
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
  // 計算能顯示區域
  const calcDisplay = () => {
    const displayDataLen = displayData.value.length;
    const booksDataLen = booksData.value.length;
    // 80px=navbar height + padding-top
    const height = window.innerHeight - 80;
    // 計算目前頁面可以一次顯示幾行
    const rows = Math.ceil(height / cardHeight.value);
    // 顯示的卡片數量
    let total = displayDataLen + rows * displayColumn.value;
    // 可視化資料與撈回資料相等代表滾動到底，如果小於就繼續將撈回資料增加到可視化資料中
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
