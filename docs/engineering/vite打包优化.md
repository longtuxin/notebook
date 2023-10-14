<!--
 * @Author: longTuxin
 * @Date: 2023-10-07 14:01:57
 * @LastEditors: longTuxin
 * @LastEditTime: 2023-10-07 15:07:05
 * @FilePath: /notes/工程化/vite打包优化.md
 * @Description: 头部注释
-->
# vite
## 代码压缩
默认用Esbuild压缩代码，它比 terser 快 20-40 倍，压缩率只差 1%-2%。但不支持去掉console等
```js
export default {
  // ...
  esbuild: {
    drop: ['console', 'debugger']
  }
}
```
如果要使用terser，需要安装 terser 并[配置对应选项](https://cn.vitejs.dev/config/build-options.html#build-minify)。
```js
export default {
  build: {
    // ...
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    }
  },
}
```
## 拆包
```js
export default {
  build: {
    // ...
    rollupOptions: {
      output: {
        // 拆包
        manualChunks: {
          vendor: ['vue', 'vue-router', 'vue-i18n', 'lodash'],
          element: ['element-plus'],
        },
      },
    }
  },
}
```