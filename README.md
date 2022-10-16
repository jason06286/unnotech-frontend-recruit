# unnotech-frontend-recruit

## [Demo](https://jason06286.github.io/unnotech-frontend-recruit/#/books)

## 開發

```
# install deps
npm install

# run dev server
npm run dev

# run build
npm run build

```

## 專案結構

```
src\
 |--api\            # API methods
 |--assets\
 |--components\     # Global component
 |--composables\    # Composition api
 |--methods\        # Utilizes
 |--pages\          # Page component
 |--router\         # Route
 |--App.vue
 |--auto-components.js
 |--auto-imports.js
 |--eslintrc-auto-imports
 |--index.css
 |--main.js

```

## 邏輯說明

- virtual-scroll-list
  - 計算可視區域顯示卡片數量。
  - https://github.com/jason06286/unnotech-frontend-recruit/blob/main/src/composables/useVirtualScroll.js

## 開發

- Vue3
- TailWind CSS

## Coding Style

- ESLint-Airbnb
- Vue 3 Script Setup
- Vue SFC (由上而下排列)
  - script: `<script setup>`
  - template: `<template>`
  - style: `<style scoped>`

## 使用套件

- VeeValidate
  - 用於表單相關驗證，必免用戶輸入不合規資料。
  - https://vee-validate.logaretm.com/v4/
- Vue Final Modal
  - 輕量化的 modal 元件，可以自行用 tailwind 客製化
  - https://vue-final-modal.org/zh-hant/
- vue3-virtual-scroll-list
  - 避免大量資料渲染，視可視化區域產生 dom
  - `<VirtualList></VirtualList>`
  - 需要給 overflow-y-auto 及 高度
  - data-key 、data-sources、data-component 必填
  - https://github.com/tangbc/vue-virtual-scroll-list/

## Vite 插件功能

- src/components
  - 此資料夾下的 Component 可以在任何 .vue 檔案中直接使用不需用 import。
  - https://github.com/antfu/vite-plugin-components
- import 自動導入
  - 系統會自動偵測 `.vue.js.ts` 檔，並引入 `vue、vue router`
  - https://github.com/antfu/unplugin-auto-import
- Icon 自動導入
  - 只要進入這個網站
  - https://icones.netlify.app/
  - 選擇你要的 icon 然後直接以 components 的方式使用，比如說：`<mdi:menu />`
  - Vite 就會自動導入對應的 svg
  - 調整顏色大小（配合 Tailwind）
  - 顏色：`text-white`
  - 大小：`text-xl`
  - https://github.com/antfu/vite-plugin-icons
