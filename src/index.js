import {
  h
} from "snabbdom";
import { patch } from './mySnabbdom/patch_2';
// 使用 h函数生成 虚拟dom
// dom 替换 根据两种情况分析（text 和 children）新旧节点是同一个节点
  // oldVnode  文本   子元素
  // vnode     文本   子元素
  // 1. vnode 文本   替换   oldVnode  中的文本   oldVnode.innerText = vnode.text;
  // 2. vnode 文本   替换   oldVnode  中的子元素  oldVnode.innerText = vnode.text;
  // 3. vnode 子元素  替换  oldVnode  中的文本     oldVnode.innerText = '' oldVnode.appendChild(vnode中的children中的所有元素)
  // 4. vnode 子元素  替换  oldVnode  中的子元素   所有子元素都要进行上面对，最终对比到不同的文本替换
// 情况1
// const oldVnode = h('div', {}, '你好')
// const vnode = h('div', {}, '你好我好大家好，就要用大宝')
// 情况2
// const oldVnode = h('div', {}, [
//   h('p', {}, '你好'),
//   h('p', {}, '我好'),
//   h('p', {}, '大家好'),
// ])
// const vnode = h('div', {}, '你好我好大家好，就要用大宝')
// 情况3
// const oldVnode = h('div', {}, '你好我好大家好，就要用大宝')
// const vnode = h('div', {}, [
//   h('p', {}, '你好'),
//   h('p', {}, '我好'),
//   h('p', {}, '大家好'),
// ])
// 情况4 - 1 移动节点
// const oldVnode = h('ul', {}, [
//   h('li', {key: 'A'}, 'A'),
//   h('li', {key: 'B'}, 'BBBB'),
//   h('li', {key: 'C'}, 'C'),
// ])
// const vnode = h('ul', {}, [
//   h('li', {key: 'C'}, 'C'),
//   h('li', {key: 'B'}, 'B'),
//   h('li', {key: 'A'}, 'AAAAA'),
// ])
// 情况4 - 2 新增节点
// const oldVnode = h('ul', {}, [
//   h('li', {key: 'A'}, 'A'),
//   h('li', {key: 'B'}, 'B'),
//   h('li', {key: 'C'}, 'C'),
// ])
// const vnode = h('ul', {}, [
//   h('li', {key: 'A'}, 'A'),
//   h('li', {key: 'B'}, 'B'),
//   h('li', {key: 'C'}, 'C'),
//   h('li', {key: 'D'}, 'D'),
//   h('li', {key: 'E'}, 'E'),
// ])
// 情况4 - 3 删除节点
// const oldVnode = h('ul', {}, [
//   h('li', {key: 'A'}, 'A'),
//   h('li', {key: 'B'}, 'B'),
//   h('li', {key: 'C'}, 'C'),
//   h('li', {key: 'D'}, 'D'),
//   h('li', {key: 'E'}, 'E'),
// ])
// const vnode = h('ul', {}, [
//   h('li', {key: 'A'}, 'A'),
//   h('li', {key: 'B'}, 'B'),
//   h('li', {key: 'C'}, 'C'),
// ])
// 情况4 - 4 更新节点
const oldVnode = h('ul', {}, [
  h('li', {key: 'A'}, 'A'),
  h('li', {key: 'B'}, 'B'),
  h('li', {key: 'C'}, 'C'),
  h('li', {key: 'D'}, 'D'),
  h('li', {key: 'E'}, 'E'),
])
const vnode = h('ul', {}, [
  h('li', {key: 'F'}, 'F'),
  h('li', {key: 'A'}, 'A'),
  h('li', {key: 'B'}, 'B'),
  h('li', {key: 'C'}, 'C'),
  h('li', {key: 'H'}, 'H'),
  h('li', {key: 'D'}, 'D'),
  h('li', {key: 'E'}, 'E'),
  h('li', {key: 'G'}, 'G'),
])
// 获取真实的dom树，我们预留的坑位
const container = document.getElementById('container');
// 获取按钮绑定点击事件
const btn = document.getElementById('btn');
btn.onclick = function() {
  patch(oldVnode, vnode)
}
// 将虚拟node上树
patch(container, oldVnode)
