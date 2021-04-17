import { createElm } from './createElm';
import { updateChildren } from './updateChildren';
export function patchVnode(oldVnode, vnode) {
    if (oldVnode === vnode) return;
    vnode.elm = oldVnode.elm;
    // 判断新节点是不是文本
    if (vnode.text != undefined && (vnode.children == undefined || vnode.children.length == 0)) {
      vnode.elm.innerText = vnode.text;
    }else {
      // 判断旧节点是不是文本
      if (oldVnode.text != undefined && (oldVnode.children == undefined || oldVnode.children.length == 0)) {
        oldVnode.elm.innerText = '';
        const ch = vnode.children;
        for (let i = 0; i < ch.length; i++) {
          const element = ch[i];
          createElm(element)
          vnode.elm.appendChild(element.elm)
        }
      }else if (oldVnode.children != undefined && vnode.children.length > 0){ // 老节点和新节点都有子节点
        console.log('节点相同')
        // 更新子节点
        updateChildren(oldVnode, vnode)
      }
    }
}
