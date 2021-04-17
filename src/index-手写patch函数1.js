import {
  h
} from "snabbdom";
import { patch } from './mySnabbdom/patch_1';
// 使用 h函数生成 虚拟dom
const vnode1 = h('ul', {}, [
  h('li', {}, '德玛西亚'),
  h('li', {}, '艾欧尼亚'),
  h('li', {}, '比尔吉沃特'),
  h('li', {}, [
    h('div', {} ,'我是div标签') // 文本内容和子元素不能同时存在？
  ]),
])
// 获取真实的dom树，我们预留的坑位
const container = document.getElementById('container');
// 将虚拟node上树
patch(container, vnode1)
