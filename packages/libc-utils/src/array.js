/**
 * 数组转对象
 * @param {arr} 需转换数组
 */
export function array2Object(arr) {
  if (!arr) return {}
  if (!Array.isArray(arr)) return arr
  const result = {}
  arr.forEach(item => {
    result[item.key] = item.value
  })
  return result
}
