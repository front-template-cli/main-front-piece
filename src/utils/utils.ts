export function $(seletor: string) {
  return seletor && document.querySelector(seletor)
}
export function deepCopy(target: any) {
  if (typeof target == 'object') {
    let result: any = Array.isArray(target) ? [] : {}
    for (const key in target) {
      if (typeof target[key] == 'object') {
        result[key] = deepCopy(target[key])
      } else {
        result[key] = target[key]
      }
    }

    return result
  }

  return target
}

let id = 0
// 主要用于 Vue 的 diff 算法，为每个元素创建一个独一无二的 ID
export function generateID() {
  return id++
}
