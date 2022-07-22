import { getCurrentInstance } from '@vue/composition-api'

/**
 * 渲染指定插槽
 *
 * 默认渲染 default
 * @param key
 * @returns {*|null}
 */
export function renderSlots(key = 'default') {
  const instance = getCurrentInstance()
  return instance?.slots[key] ?? null
}
