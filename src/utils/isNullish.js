export default function isNullish (val) {
  return [null, undefined].indexOf(val) !== -1
}