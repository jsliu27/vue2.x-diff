import creatVnode from './vnode';
import {createElm} from './createElm';
import { patchVnode } from './patchVnode';
import { someVnode } from './someVnode';
// 完成剩下的  diff处理新旧节点是同一个节点
export function patch(oldVnode, vnode) {
  // 判断老虚拟节点是不是虚拟节点
  if (oldVnode.sel == undefined) {
    // 老节点不是虚拟节点包装成虚拟节点
    oldVnode = creatVnode(oldVnode.tagName.toLowerCase(), [], undefined, [], oldVnode)
  }
  // 判断两个节点是否为同一个节点 选择器相同并且key相同 以为我们手写的createVnode中没给key这里就不判断了，源码中是有判断的
  if (someVnode(oldVnode, vnode)) {
    patchVnode(oldVnode, vnode)
  }else if (oldVnode.children != undefined && vnode.children != undefined){ // 不同节点
    // 在老的dom节点前插入新的dom节点，然后在干掉老的dom节点
    // 找到老节点的父元素
    const parent = oldVnode.elm.parentNode;
    // 新节点添加elm
    createElm(vnode)
    // 在老节点前插入新节点
    parent.insertBefore(vnode.elm, oldVnode.elm)
    // 干掉老节点
    parent.removeChild(oldVnode.elm)
  }
}
