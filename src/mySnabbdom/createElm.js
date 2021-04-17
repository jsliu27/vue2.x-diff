// 创建虚拟节点的elm
export function createElm(vnode) {
  // 创建标签
  const elm = document.createElement(vnode.sel);
  // 文本节点存在
  if (vnode.text || (vnode.children == undefined ||vnode.children.length == 0)) {
    elm.innerText = vnode.text;
  }else if (Array.isArray(vnode.children)) {
    const children = vnode.children;

    for (let i = 0; i < children.length; i++) {
      const element = children[i];
      if (element != null) {
        elm.appendChild(createElm(element));
      }
    }
  }
  vnode.elm = elm;
  return vnode.elm;
}
