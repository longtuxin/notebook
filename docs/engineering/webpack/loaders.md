## 自定义loader

## loader 案例
1. 将文件的所有大写转小写
```js
// webpack.config.js
module.exports = {
  // ...其他配置...
  module: {
    rules: [
      {
        test: /\.js$/, // 匹配以.js结尾的文件
        use: [
          {
            loader: 'custom-uppercase-loader', // 使用自定义的loader
          },
        ],
      },
    ],
  },
};

// custom-uppercase-loader.js
// 导出一个函数，该函数将处理输入内容
module.exports = function(source) {
  // 使用正则表达式替换大写字母为小写字母
  const transformedSource = source.replace(/[A-Z]/g, (match) => match.toLowerCase());

  // 返回处理后的内容
  return transformedSource;
};
```
2. 将 md 转 html
```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.md$/,
        use: [
          {
            loader: 'html-loader', // 将Markdown转换为HTML
          },
          {
            loader: 'markdown-loader', // 自定义的Markdown Loader
          },
        ],
      },
    ],
  },
};
```
3. 处理 json 或 txt 等格式文件
```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.custom\.json$/,
        use: [
          {
            loader: 'custom-json-filter-loader', // 自定义的JSON Loader
          },
        ],
      },
    ],
  },
};

// custom-json-filter-loader.js
module.exports = function(source) {
  // 解析 JSON 数据
  const jsonData = JSON.parse(source);

  // 在此处进行特殊处理，例如根据条件过滤数据
  // 这里仅作示例，你可以根据你的需求自定义处理逻辑
  const filteredData = jsonData.filter(item => item.someCondition);

  // 将处理后的数据转换为字符串
  const filteredJsonString = JSON.stringify(filteredData);

  // 返回处理后的 JSON 字符串
  return filteredJsonString;
};

