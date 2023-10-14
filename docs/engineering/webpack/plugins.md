# 常见 plugin 钩子
1. **`entryOption`**：
   - 用途：在Webpack配置处理入口点（entry）之前触发。
   - 使用场景：你可以使用这个钩子来动态添加或修改Webpack配置中的入口点，例如基于环境变量来确定入口。
      ```javascript
      class MyPlugin {
        apply(compiler) {
          compiler.hooks.entryOption.tap('MyPlugin', (context, entry) => {
            // 添加新的入口文件
            entry['app'] = './src/main.js';
          });
        }
      }
      ```

2. **`afterPlugins`**：
   - 用途：在Webpack内部插件加载完成后触发。
   - 使用场景：用于在Webpack加载所有内置插件之后，添加自定义插件，以确保你的插件在Webpack构建中生效。
      ```javascript
      class MyPlugin {
        apply(compiler) {
          compiler.hooks.afterPlugins.tap('MyPlugin', (compiler) => {
            // 添加自定义插件
            compiler.options.plugins.push(new MyCustomPlugin());
          });
        }
      }
      ```

3. 🌟 **`compilation`**：
   - 用途：在新的Compilation创建时触发，Compilation表示一次新的编译过程。
   - 使用场景：通常用于修改Webpack编译过程中的内部数据或添加自定义编译步骤。
      ```javascript
      class MyPlugin {
        apply(compiler) {
          compiler.hooks.compilation.tap('MyPlugin', (compilation) => {
            compilation.hooks.optimize.tap('MyPlugin', () => {
              // 在优化阶段执行自定义逻辑
            });
          });
        }
      }
      ```

4. **`emit`**：
   - 用途：在Webpack即将输出文件时触发，允许你操作输出的文件。
   - 使用场景：用于在文件输出之前执行一些自定义处理，例如压缩、加密、版本控制等。
      ```javascript
      class MyPlugin {
        apply(compiler) {
          compiler.hooks.emit.tapAsync('MyPlugin', (compilation, callback) => {
            // 在输出文件前执行自定义逻辑
            // 修改或处理compilation.assets
            callback();
          });
        }
      }
      ```

5. **`done`**：
   - 用途：在Webpack构建完成后触发。
   - 使用场景：通常用于执行一些构建完成后的任务，例如生成构建报告、通知等。
      ```javascript
      class MyPlugin {
        apply(compiler) {
          compiler.hooks.done.tap('MyPlugin', (stats) => {
            // 在构建完成后执行自定义任务
            console.log('Build is done!');
          });
        }
      }
      ```

6. **`beforeRun`和`run`**：
   - 用途：在Webpack启动构建之前和构建开始时触发。
   - 使用场景：用于在构建前执行一些准备工作，例如清理输出目录、检查依赖等。

7. **`normalModuleFactory`**：
   - 用途：允许你修改NormalModuleFactory的行为，NormalModuleFactory用于创建模块实例。
   - 使用场景：通常用于修改模块加载过程，例如自定义解析规则、添加模块加载器等。

8. **`optimize`**：
   - 用途：在优化过程中触发，允许你修改和扩展Webpack的优化策略。
   - 使用场景：用于调整Webpack的性能优化，例如修改压缩策略、分割策略等。

9. **`make`**：
   - 用途：在构建编译任务时触发，允许你添加自定义任务。
   - 使用场景：用于添加自定义编译任务，例如处理额外的文件、生成资源清单等。

10.  **`afterEmit`**：
    - 用途：在Webpack输出文件后触发。
    - 使用场景：通常用于执行与文件输出相关的任务，例如上传文件到CDN、通知文件已准备好等。

# 自定义plugin
### 修改输出文件的内容
- 修改 compilation.assets[filename]
```js
// 删除所有注释
class RemoveCommentsPlugin {
  apply(compiler) {
    compiler.hooks.emit.tapAsync('RemoveCommentsPlugin', (compilation, callback) => {
      // 遍历所有构建出的资源
      compilation.assets = Object.keys(compilation.assets).reduce(
        (assets, filename) => {
          if (filename.endsWith('.js')) {
            const asset = compilation.assets[filename]
            const source = asset.source() // 获取源代码

            // 使用正则表达式匹配和移除单行注释
            const withoutSingleLineComments = source.replace(
              /\/\/.*?(\r\n|\n|$)/g,
              ''
            )

            // 使用正则表达式匹配和移除多行注释
            const withoutComments = withoutSingleLineComments.replace(
              /\/\*[\s\S]*?\*\//g,
              ''
            )

            // const withoutComments = source

            // 用处理后的内容替换原始资源
            assets[filename] = {
              source: () => withoutComments,
              size: () => withoutComments.length,
            }
          } else {
            // 其他类型的资源保持不变
            assets[filename] = compilation.assets[filename]
          }

          return assets
        },
        {}
      )

      callback()
    })
  }
}

module.exports = RemoveCommentsPlugin
```

### 输出特定文件
