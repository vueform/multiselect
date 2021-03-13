const BreakException = {}

export default function arrayObjectsEqual (array1, array2) {
  let equal = array1.length === array2.length

  if (!equal) {
    return equal
  }

  try {
    array1.every(function(value, index) {
      if (JSON.stringify(value) !== JSON.stringify(array2[index])) {
        throw BreakException
      }
    })
  } catch (e) {
    /* istanbul ignore else */
    if (e === BreakException) {
      equal = false
    } else {
      throw e
    }
  }

  return equal
}