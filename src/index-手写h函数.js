import {
  init,
  classModule,
  propsModule,
  styleModule,
  eventListenersModule,
} from "snabbdom";
import { h } from './mySnabbdom/h';
// 获取patch函数，--此函数用来将虚拟dom添加到dom树上的
const patch = init([classModule, propsModule, styleModule, eventListenersModule])
// 使用 自己写的h函数生成 虚拟dom
const vnode3 = h('ul', {}, [
  h('li', {}, 123),
  h('li', {}, h('a', {props: {href: '/hfun.html'}}, '手写h函数')),
])
// 获取真实的dom树，我们预留的坑位
const container = document.getElementById('container');
// 将虚拟node上树
patch(container, vnode3)
