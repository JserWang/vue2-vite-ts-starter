import type { UnwrapRef } from 'vue'
import type VueRouter from 'vue-router'
import type { NavigationGuard, Route } from 'vue-router'

/**
 * 获取路由
 * 仿照 vue-router 4.x+ 提供的 composition api 的实现
 */
export function useRouter(): VueRouter {
  const instance = getCurrentInstance()

  if (instance) {
    // https://github.com/vuejs/composition-api/issues/806
    return instance.proxy.$router
  }

  throw new Error('[useRouter] 只能在 setup的顶层函数或生命周期钩子中调用')
}

let currentRoute: UnwrapRef<Route>
/**
 * 获取当前页面
 * 仿照 vue-router 4.x+ 提供的 composition api 的实现
 */
export function useRoute(): UnwrapRef<Route> {
  const router = useRouter()

  if (!currentRoute) {
    const instance = getCurrentInstance()

    if (!instance)
      throw new Error('[useRoute] 只能在 setup 或生命周期钩子中调用')

    // https://github.com/vuejs/composition-api/issues/806
    currentRoute = reactive({ ...instance.proxy.$route })
    router.afterEach(to => Object.assign(currentRoute, to))
  }
  return currentRoute
}

/**
 * 在当前位置即将更新时触发
 * 仿照 vue-router 4.x+ 提供的 composition api 的实现
 * https://router.vuejs.org/zh/api/#onbeforerouteupdate
 * @param updateGuard
 */
export function onBeforeRouteUpdate(updateGuard: NavigationGuard) {
  const instance = getCurrentInstance()
  if (!instance)
    throw new Error('[onBeforeRouteUpdate] 只能在 setup 或生命周期钩子中调用')

  const { options } = instance.proxy.constructor as any
  const hooks: any = options.beforeRouteUpdate || []
  hooks.push(updateGuard)
  options.beforeRouteUpdate = hooks
}

/**
 * 在当前位置的组件将要离开时触发
 * 仿照 vue-router 4.x+ 提供的 composition api 的实现
 * https://router.vuejs.org/zh/api/#onbeforerouteleave
 * @param leaveGuard
 */
export function onBeforeRouteLeave(leaveGuard: NavigationGuard) {
  const instance = getCurrentInstance()
  if (!instance)
    throw new Error('[onBeforeRouteLeave] 只能在 setup 或生命周期钩子中调用')

  const { options } = instance.proxy.constructor as any
  const hooks: any = options.beforeRouteLeave || []
  hooks.push(leaveGuard)
  options.beforeRouteLeave = hooks
}
