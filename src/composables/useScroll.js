import { toRefs, watch, nextTick, onMounted, ref, shallowRef, computed } from 'vue'
import toRef from '../utils/toRef'

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
  const eo = dep.eo

  // ================ DATA ================

  // no export
  const observer = ref(null)

  const infiniteLoader = shallowRef(null)

  // ============== COMPUTED ==============

  const hasMore = toRef(() => {
    return offset.value < pfo.value.length
  })

  // =============== METHODS ==============

  // no export
  /* istanbul ignore next */
  const handleIntersectionObserver = (entries) => {
    const { isIntersecting, target } = entries[0]

    if (isIntersecting) {
      const parent = target.offsetParent
      const scrollTop = parent.scrollTop

      offset.value += limit.value == -1 ? 10 : limit.value

      nextTick(() => {
        parent.scrollTop = scrollTop
      })
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

  watch(eo, () => {
    if (!infinite.value) {
      return
    }

    observe()
  }, { immediate: false, flush: 'post' })

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