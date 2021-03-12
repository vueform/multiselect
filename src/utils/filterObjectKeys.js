export default function filterObjectKeys (obj, keys) {
  let result = {}, key

  for (key in obj) {
      if (obj.hasOwnProperty(key) && keys.indexOf(key) !== -1) {
          result[key] = obj[key]
      }
  }

  return result
}