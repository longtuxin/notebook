<!--
 * @Author: xxx
 * @Date: 2023-09-13 22:54:32
 * @LastEditors: xxx
 * @LastEditTime: 2023-09-13 23:43:10
 * @FilePath: /源码学习/vue3源码.md
 * @Description: 头部注释
-->
# 下载源码
`https://github.com/vuejs/core`
下载方式：
1. 下载 download zip
2. clone
3. fork

# 打包并运行源码
1. 安装 pnpm `npm i -g pnpm`。[官网](https://www.pnpm.cn/)
2. pnpm i 安装源码依赖
3. npm run build 打包生成 dist（git 报错，试试clone代码的方式）
4. 打包生成的代码在  `packages/vue/dist`

# 创建测试代码
1. 在 `packages/vue/examples` 目录下创建测试代码`reactive.html`
2. 引入打包后的 `dist/vue.global.js`
3. 编写测试代码
   ```html
   <script src="../dist/vue.global.js"></script>
   <body>
       <div id="app"></div>
   </body>
   <script>
      const { reactive, effect } = Vue
      const state = reactive({
          name: 'xiaoming',
          age: 18,
          sex: '男'
      })
      effect(() => {
          document.querySelector('#app').innerHTML = state.name
      })
      console.log(state)
      setTimeout(() => {
          state.name = 'xiaohong'
          console.log(state)
      }, 2000)
   </script>
   ```
4. 用 LiveServer 启动 `examples/reactive.html`