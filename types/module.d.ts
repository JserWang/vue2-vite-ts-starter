declare module '*.vue' {
  import type { defineComponent } from '@vue/composition-api'
  const Component: defineComponent<{}, {}, any>
  export default Component
}
