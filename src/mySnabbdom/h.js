import vnode  from './vnode';
/**
 *
 * @param {*} sel 标签名
 * @param {*} data 标签的配置信息
 * @param {*} c 文本 || h函数 || 数组
 */
// 是一个弱化的h函数，里面没有做更多的函数重载，没有对参数做过多的校验，只为了知道h函数最核心的部分
// 适应情况
// h('div', {}, '文本')
// h('div', {}, h('p', {}, 357))
// h('div', {}, [
//   h('p', {}, '内容'),
//   h('p', {}, '内容')
// ])
export function h(sel, data, c) {
  // 对参数个数判断
  if (arguments.length !==3) {
    throw new Error('对不起，当前版本只支持三个参数')
  }
  // 对不确定参数c判断
  if (typeof c == 'string' || typeof c == 'number') {
    return vnode(sel, data, c)
  }else if (Array.isArray(c)) {
    // 收集所有子项
    let children = [];
    // 遍历数组判断每一个是不是h函数返回的对象
    for (let i = 0; i < c.length; i++) {
      const element = c[i];
      if (typeof element == 'object' && element.hasOwnProperty('sel')) {
        children.push(element)
      }else {
        throw new Error('对不起，数组中的项不是h函数')
      }
    }
    return vnode(sel, data, undefined, children)
  }else if (typeof c == 'object' && c.hasOwnProperty('sel')) {
    return vnode(sel, data, undefined, [c])
  }
}
