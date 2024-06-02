export default function arraysEqual (array1, array2) {
  if (array1.length !== array2.length) {
    return false;
  }
  
  const array2Sorted = array2.slice().sort()

  return array1.slice().sort().every(function(value, index) {
      return value === array2Sorted[index];
  })
}