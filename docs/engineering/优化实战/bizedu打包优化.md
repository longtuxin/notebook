<!--
 * @Author: longTuxin
 * @Date: 2023-10-02 18:03:41
 * @LastEditors: longTuxin
 * @LastEditTime: 2023-10-02 19:33:02
 * @FilePath: /notes/工程化/bizedu打包优化.md
 * @Description: 头部注释
-->
如果webpack版本不支持`import()`，可以使用`require.ensure`代替
或者安装 npm install @babel/plugin-syntax-dynamic-import --save-dev

babel配置
```js
{
  "plugins": ["@babel/plugin-syntax-dynamic-import"]
}
```

线上打包的statics/bizedu文件很多重复文件，需要删除