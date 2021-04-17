import { someVnode } from './someVnode';
import { patchVnode } from './patchVnode';
import { createElm } from './createElm';
export function updateChildren(oldVnode, vnode) {
  const oldCh = oldVnode.children;
  const newCh = vnode.children;
  const parentElm = oldVnode.elm;
  let idxInOld ; // 用来保存 老节点map中查到的索引
  let elmToMove ; // 要移动的节点
  // 旧前
  let oldStartIdx = 0;
  let oldStartVnode = oldCh[0];
  // 旧后
  let oldEndIdx = oldCh.length - 1;
  let oldEndVnode = oldCh[oldCh.length - 1];
  // 新前
  let newStartIdx = 0;
  let newStartVnode = newCh[0];
  // 新后
  let newEndIdx = newCh.length - 1;
  let newEndVnode = newCh[newCh.length - 1];
  // while循环实现四个命中
  while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) { // 旧前小于等于旧后并且新前小于新后
    // 如果是控制直接滤过
    if (oldStartVnode == null) {
      oldStartVnode = oldCh[++oldStartIdx]
    }else if (oldEndVnode == null) {
      oldEndVnode = oldCh[--oldEndIdx]
    }else if (newStartVnode == null) {
      newStartVnode = newCh[++newStartIdx]
    }else if (newEndVnode == null) {
      newEndVnode = newCh[--newEndIdx]
    }
    else if (someVnode(oldStartVnode, newStartVnode)) { // 新前与旧前
      console.log('新前与旧前')
      patchVnode(oldStartVnode, newStartVnode) // 不添加这行代码对应文本修改页面内容不会修改
      oldStartVnode = oldCh[++oldStartIdx];
      newStartVnode = newCh[++newStartIdx];
    }else if (someVnode(oldEndVnode, newEndVnode)) { // 新后与旧后
      console.log('新后与旧后')
      patchVnode(oldEndVnode, newEndVnode)
      oldEndVnode = oldCh[--oldEndIdx];
      newEndVnode = newCh[--newEndIdx];
    }else if (someVnode(oldStartVnode, newEndVnode)) { // 新后与旧前
      console.log('新后与旧前')
      // 需要将匹配到的值插入到旧的最后一个节点下一个节点的前面
      patchVnode(oldStartVnode, newEndVnode)
      parentElm.insertBefore(oldStartVnode.elm, oldEndVnode.elm.nextSibling)
      oldStartVnode = oldCh[++oldStartIdx];
      newEndVnode = newCh[--newEndIdx];
    }else if (someVnode(oldEndVnode, newStartVnode)) { // 新前与旧后
      console.log('新前与旧后')
      patchVnode(oldEndVnode, newStartVnode)
      parentElm.insertBefore(oldEndIdx.elm, oldStartVnode.elm)
      oldEndVnode = oldCh[--oldEndIdx];
      newStartVnode = newCh[++newStartIdx];
    }else { // 都没有命中
      // 需要遍历旧的节点，生成一个 key: index ,对应的map对象，方便新节点的key查找
      let map = {};
      for (let i = oldStartIdx; i < oldEndIdx; i++) {
        map[oldCh[i].key] = i;
      }
      // 判断map中是否有于新节点对应的key
      idxInOld = map[newStartVnode.key]
      if (idxInOld === undefined) {
        // 没有 ，就是新增，增加到旧节点第一个的前面
        parentElm.insertBefore(createElm(newStartVnode), oldStartVnode.elm)
      }else {
        // 有相同的key
        // 获取到要移动的旧的节点
        elmToMove = oldCh[idxInOld]
        // 判断选择器是否相同
        if(elmToMove.sel !== newStartVnode.sel){ // 选择器不同
          parentElm.insertBefore(createElm(newStartVnode), oldStartVnode.elm)
        }else { // 选择器相同
          // 对比修改项
          patchVnode(oldCh[idxInOld], newStartVnode)
          oldCh[idxInOld] = undefined
          parentElm.insertBefore(newStartVnode.elm, oldStartVnode.elm)
        }
      }
      // 新节点对应不上就要进行下一个匹配
      newStartVnode = newCh[++newStartIdx];
    }
  }
  // 循环走完有剩余情况 旧数据剩余 -> 删除， 新数据剩余 ->新增
  if (oldStartIdx <= oldEndIdx || newStartIdx <= newEndIdx ) {
    if (oldStartIdx > oldEndIdx) { // 新增
      for (let i = newStartIdx; i <= newEndIdx; i++) {
        const element = newCh[i];
        // 找到标杆，要插入到谁的前面 -> 最后一个的下一个的前面，谁是最后一个 oldEndIdx
        const befor = oldCh[oldEndIdx + 1] == null ? null : oldCh[oldEndIdx + 1].elm;
        parentElm.insertBefore(createElm(element), befor)
      }
    }else { // 删除
      for (let i = oldStartIdx; i <= oldEndIdx; i++) {
        const element = oldCh[i];
        parentElm.removeChild(element.elm)
      }
    }
  }
}
