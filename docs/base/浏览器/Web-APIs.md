# 监听当前窗口是否激活
```js
let vEvent = 'visibilityChange';
if (document.webkitHidden !== 'undefined') {
  vEvent = 'webkitvisibilitychange';
}

function visibilityChanged() {
  if (document.hidden || document.webkitHidden) {
    // 当前窗口处于非激活状态
  } else {
    // 当前窗口处于激活状态
  }
}

document.addEventListener(vEvent, visibilityChanged, false);
```

# 监听网络状态
```js
let connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
let type = connection.effectiveType; // 当前网络状态
function updateConnectionStatus() {
  if (connection.effectiveType === 'none') {
    // 当前没有网络连接
  } else if (connection.effectiveType === 'wifi') {
    // 当前处于WIFI网络
  } else if (connection.effectiveType === '4g') {
    // 当前处于4G网络
  } else if (connection.effectiveType === '3g') {
    // 当前处于3G网络
  } else if (connection.effectiveType === '2g') {
    // 当前处于2G网络
  } else if (connection.effectiveType === 'ethernet') {
    // 当前处于有线网络
  }
}
connection.addEventListener('change', updateConnectionStatus);
```