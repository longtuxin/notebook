<!--
 * @Author: longTuxin
 * @Date: 2023-09-16 16:51:36
 * @LastEditors: longTuxin
 * @LastEditTime: 2023-09-18 09:13:22
 * @FilePath: /notes/调试/ Chrome调试.md
 * @Description: 头部注释
-->
# Chrome 调试
1. Source 面板，找到 src/index.js 打断点并刷新页面
2. 代码停在断电出，右侧显示右边会显⽰：local作⽤域的变量、global作⽤域的变量，还有调⽤栈 call stack
3. 断点操作按钮：恢复执行、单步执行、进入函数调用、跳出函数调用、让断点失效、在异常处断住

# 开启 source-map
Chrome DevTools 快捷键command + shift + p，搜索 sourcemap
