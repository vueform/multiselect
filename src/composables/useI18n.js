import { toRefs } from 'vue'

export default function useI18n (props, context, dep)
{
  const {
    locale, fallbackLocale,
  } = toRefs(props)

  // =============== METHODS ==============

  const localize = (target) => {
    return target && typeof target === 'object'
      ? target?.[locale.value] || target?.[locale.value?.toUpperCase()] || target?.[fallbackLocale.value] || target?.[fallbackLocale.value?.toUpperCase()] || target?.[Object.keys(target)[0]]
      : target
  }

  return {
    localize,
  }
}