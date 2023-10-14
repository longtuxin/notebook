# 全局使用 svg 图标
### 公共svg图标组件 SvgIcon.vue
```vue
<template>
  <svg aria-hidden="true">
    <use :xlink:href="symbolId" :fill="color" :fillClass="fillClass" />
  </svg>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  // 图标名称
  name: {
    type: String,
    required: true
  },
  // 颜色
  color: {
    type: String
  },
  // 类名
  fillClass: {
    type: String
  }
})

// 生成图标唯一id #icon-xxx
const symbolId = computed(() => `#icon-${props.name}`)
</script>
```

### 全局注册 SvgIcon 组件
```js
import SvgIcon from "./SvgIcon.vue"

export default {
  install(app) {
    app.component("SvgIcon", SvgIcon)
  }
}
```

### 打包注册所有svg图标
main.js
```js
import "virtual:svg-icons-register"
```
vite.config.js
```js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import {join} from "path"
import {createSvgIconsPlugin} from "vite-plugin-svg-icons"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹
      iconDirs: [join(__dirname, "/src/assets/icons")],
      // 指定symbolId格式，就是svg.use使用的href
      symbolId: "icon-[name]"
    })
  ],
})
```
