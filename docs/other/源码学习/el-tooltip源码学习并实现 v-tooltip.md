# 源码入口文件
首先，我们从 node_modules 中找到 element-ui 依赖，然后找到它未经打包过的入口文件
`node_modules/element-ui/src/index.js`
![element-ui源码入口](../assets/elment-ui源码入口文件.png)

从源码中可以看出：
- 通过 install 方法，让 element-ui 支持 `Vue.use(Element)`的方式来注册所有方法和指令
- `v-loading` 指令 和 `this.$loading` 方法都是在 install 方法中注册到全局的

# loading 目录
根据 Loading 的引入路径，我们可以找到 Loading 所在目录

`import Loading from '../packages/loading/index.js';`

```js
import directive from './src/directive';
import service from './src/index';

export default {
  install(Vue) {
    Vue.use(directive);
    Vue.prototype.$loading = service;
  },
  directive,
  service
};
```
可以看到，loading 支持四种方式：
1. 通过插件install的方式注册，
2. 通过 directive 指令的方式
3. 通过 service 方法，且service被注入到vue原型上，就是平时常用的 `this.$loading`
4. 同时，loading 也支持通过 Loading.service 的方式来开启loading

# v-loading 实现
打开loading指定所在目录`node_modules/element-ui/packages/loading/src/directive.js`
以下为源码的简化代码
```js
import Vue from 'vue';
import Loading from './loading.vue';

// 将loading组件转为 vue 组件构造函数
const Mask = Vue.extend(Loading);

const loadingDirective = {};
loadingDirective.install = Vue => {
    const toggleLoading = (el, binding) => {
        // ...
    }
    // ...
    // 注册 v-loading 指令
    Vue.directive('loading', {
        // 指令绑定到元素时调用
        bind(el, binding) {
            // 从 loading目标获取对应 html 属性
            const textExr = el.getAttribute('element-loading-text');
            const spinnerExr = el.getAttribute('element-loading-spinner');
            const backgroundExr = el.getAttribute('element-loading-background');
            const customClassExr = el.getAttribute('element-loading-custom-class');
            // 获取需要显示 loading 的目标的 vue 实例
            const vm = vnode.context;
            // 创建一个 loading 组件的 vue 实例
            const mask = new Mask({
                el: document.createElement('div'),
                data: {
                // 获取 loading 的配置
                // 优先用传给 loading 组件的属性，如果没有，从 loading 的目标元素上获取对应 html 属性
                text: vm && vm[textExr] || textExr,
                spinner: vm && vm[spinnerExr] || spinnerExr,
                background: vm && vm[backgroundExr] || backgroundExr,
                customClass: vm && vm[customClassExr] || customClassExr,
                fullscreen: !!binding.modifiers.fullscreen
                }
            });
            // 将 loading 的实例挂载到 el 元素上，让 toogleLoading 可以通过该实例来修改 loading 组件的属性
            el.instance = mask;
            el.mask = mask.$el;
            el.maskStyle = {};

            // 操作 loading 的挂载与移除
            binding.value && toggleLoading(el, binding);
        },
        // 指令更新时调用
        update(el, binding) {
            // ...
        },
        // loading目标被销毁时调用
        unbind(el, binding) {
            // ...
        },
    }
}
```
可以看到，在指令方法中，我们通过 `vnode.context` 获取了 loading 目标的 vue 实例，然后通过 `new Mask()` 创建了一个 loading 的 vue 实例，并把 el 元素作为挂载元素，然后将loading实例挂载到 el 元素上。接下来，就是通过 toggleLoading 方法，将 loading 实例挂载到 loading 目标 el 上。
此处为 toggleLoading 简化后的代码
```js
const toggleLoading = (el, binding) => {
    if(binding.value) {
        Vue.nexTick(() => {
            // 通过 binding.modifiers 获取指令的修饰符 fullscreen，来判断是否需要全屏显示
            if(binding.modifiers.fullscreen) {
                // ...一些全屏loading样式设置
                // 将 loading 组件挂载到 body 元素上
                insertDom(document.body, el, binding)
            } else {
                // 非全屏 loading
                // ...一些非全屏loading样式设置，并移除全屏样式
                // 将 loading 组件挂载到 loading 目标元素上
                insertDom(el, el, binding)
            }
        })
    } else {
        // ...
        // 通过 loading 实例，修改 loading.vue 组件中的 visible 属性，来关闭 loading
        el.instance.visible = false
        // ...
    }
}

// 将 loading 组件挂载到目标元素
const insertDom = (parent, el, binding) => {
    // 通过 domVisible 来标识 loading 组件是否已挂载到目标元素
    if (!el.domVisible && getStyle(el, 'display') !== 'none' && getStyle(el, 'visibility') !== 'hidden') {
        // loading 还没挂载
        // ...
        // 将 domVisible 设为 true，并将 loading 组件挂载到目标元素
        el.domVisible = true;

        parent.appendChild(el.mask);
        Vue.nextTick(() => {
            if (el.instance.hiding) {
                // 隐藏loading
                el.instance.$emit('after-leave');
            } else {
                // 显示loading
                el.instance.visible = true;
            }
        });
        // 标识 loading 组件已挂载
        el.domInserted = true;
    } else if (el.domVisible && el.instance.hiding === true) {
        // loading 已经挂载
        // 显示 loading
        el.instance.visible = true;
        el.instance.hiding = false;
    }
};
```
通过以上代码可以看出：
初始化时，toogleLoding 方法会先判断 loading 组件是否已挂载到目标元素，如果没有，则将 loading 组件挂载到目标元素上；如果已挂载，就通过 el.instance.visible 来控制 loading 组件的显示与隐藏。

以上为全文内容，如有问题，请指正🙏。