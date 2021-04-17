// 接收参数将参数拼成一个对象返回
export default function (sel, data, text, children, elm) {
  const key = data === undefined ? undefined : data.key;
  return {sel, data, text, children, elm, key}
}
