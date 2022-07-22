import { readonly as defineReadonly } from 'vue'
import type { InjectionKey, UnwrapRef } from 'vue'

export interface ContextOptions {
  readonly?: boolean
  createProvider?: boolean
  native?: boolean
}

type ShallowUnwrap<T> = {
  [P in keyof T]: UnwrapRef<T[P]>;
}

/**
 *
 * @param context
 * @param key
 * @param options
 */
export function createContext<T>(context: any, key: InjectionKey<T>, options: ContextOptions = {}) {
  const { readonly = true, createProvider = false, native = false } = options

  const state = reactive(context)
  const provideData = readonly ? defineReadonly(state) : state
  !createProvider && provide(key, native ? context : provideData)

  return {
    state,
  }
}

/**
 *
 * @param key
 * @param defaultValue
 * @returns {*}
 */
export function useContext<T>(
  key: InjectionKey<T> = Symbol(''),
  defaultValue?: any,
): ShallowUnwrap<T> {
  return inject(key, defaultValue || {})
}
