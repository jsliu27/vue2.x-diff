export function someVnode(oldVnode, vnode) {
  return oldVnode.sel === vnode.sel && vnode.key === oldVnode.key
}
