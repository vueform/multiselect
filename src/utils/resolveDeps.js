export default function (props, context, features, deps = {}) {
  features.forEach((composable) => {
    deps = {
      ...deps,
      ...composable(props, context, deps)
    }
  })
  
  return deps
}