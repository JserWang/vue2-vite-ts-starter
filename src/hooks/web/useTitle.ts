import { useTitle as usePageTitle } from '@vueuse/core'
import { useRoute } from '@/hooks/core/useRouter'

export function useTitle() {
  const title = import.meta.env.VITE_GLOBAL_TITLE
  const currentRoute = useRoute()
  const pageTitle = usePageTitle()

  watch(
    () => currentRoute.path,
    () => {
      const metaTitle = currentRoute.meta?.title
      pageTitle.value = metaTitle ? ` ${metaTitle} - ${title} ` : `${title}`
    },
    { immediate: true },
  )
}
