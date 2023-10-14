<!--
 * @Author: longTuxin
 * @Date: 2023-09-16 16:44:16
 * @LastEditors: longTuxin
 * @LastEditTime: 2023-09-16 17:28:33
 * @FilePath: /notes/调试/ vscode调试.md
 * @Description: 头部注释
-->
# vscode 调试
1. 创建 vscode/launch.json 文件
2. 点击右下⾓的 Add Configuration... 按钮，选择 Chrome: Launch
3. 把访问的 url 改为开发服务器启动的地址
4. 进入 vscode 调试面板，点击启动
5. 在代码左侧点击，给代码中打上红色断点
6. 代码会执⾏到断点处断住，本地和全局作⽤域的变量，调⽤栈等都会展⽰在左边
7. 断点操作与chrome断点操作一致，唯一的不同是 ，vscode的异常断点操作在左侧面板的断点栏中
8. 如果想访问 this 的某个属性，可以在下方 Debug Console 调试控制台面板⾥输入 this 看下它的值
9. .vscode/launch.json文件不用自己创建，可以在调试面板中点击快速生产按钮

10. 关闭sourcemap，在.vscode/launch.json文件中将configuration.sourceMaps改为false