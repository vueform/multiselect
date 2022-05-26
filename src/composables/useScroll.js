import { toRefs, watch, nextTick, onMounted, ref, computed } from 'composition-api'

export default function useScroll (props, context, dep)
{
  const {
    limit, infinite,
  } = toRefs(props)

  // ============ DEPENDENCIES ============

  const isOpen = dep.isOpen
  const offset = dep.offset
  const search = dep.search
  const pfo = dep.pfo

  // ================ DATA ================

  // no export
  const observer = ref(null)

  const infiniteLoader = ref(null)

  // ============== COMPUTED ==============

  const hasMore = computed(() => {
    return offset.value < pfo.value.length
  })

  // =============== METHODS ==============

  // no export
  /* istanbul ignore next */
  const handleIntersectionObserver = async (entries) => {
    const { isIntersecting, target } = entries[0]

    if (isIntersecting) {
      const parent = target.offsetParent
      const scrollTop = parent.scrollTop

      offset.value += limit.value == -1 ? 10 : limit.value

      await nextTick()

      parent.scrollTop = scrollTop
    }
  }

  const observe = () => {
    /* istanbul ignore else */
    if (isOpen.value && offset.value < pfo.value.length) {
      observer.value.observe(infiniteLoader.value)
    } else if (!isOpen.value && observer.value) {
      observer.value.disconnect()
    }
  }

  // ============== WATCHERS ==============

  watch(isOpen, () => {
    if (!infinite.value) {
      return
    }

    observe()
  })

  watch(search, () => {
    if (!infinite.value) {
      return
    }

    offset.value = limit.value

    observe()
  }, { flush: 'post' })

  // ================ HOOKS ===============

  onMounted(() => {
    /* istanbul ignore else */
    if (window && window.IntersectionObserver) {
      observer.value = new IntersectionObserver(handleIntersectionObserver)
    }
  })

  return {
    hasMore,
    infiniteLoader,
  }
}