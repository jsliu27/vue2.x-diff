import {
  init,
  classModule,
  propsModule,
  styleModule,
  eventListenersModule,
  h
} from "snabbdom";
// 获取patch函数，--此函数用来将虚拟dom添加到dom树上的
const patch = init([classModule, propsModule, styleModule, eventListenersModule])
// 使用 h函数生成 虚拟dom
// const vnode1 = h('a', {props:{href: 'http://www.baidu.com'}}, '百度一下')
// h函数嵌套
const vnode2 = h('ul', [
  h('li', '德玛西亚'),
  h('li', '艾欧尼亚'),
  h('li', '比尔吉沃特'),
  h('li', [
    h('div', {props: {style: 'color: red;'}} ,h('p', '我是p标签'), '我是div标签') // 文本内容和子元素不能同时存在？
  ]),
  h('li', h('ul', [
    h('li', '二级1'),
    h('li', '二级2')
  ])),
  h('li', '巨龙之巢'),
])
// 获取真实的dom树，我们预留的坑位
const container = document.getElementById('container');
// 将虚拟node上树
patch(container, vnode2)
