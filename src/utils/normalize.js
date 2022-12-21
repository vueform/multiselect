export default function normalize (str, strict = true) {
  return strict
    ? String(str).toLowerCase().trim()
    : String(str).toLowerCase()
                 .normalize('NFD')
                 .trim()
                 .replace(new RegExp(/æ/g), 'ae')
                 .replace(new RegExp(/œ/g), 'oe')
                 .replace(new RegExp(/ø/g), 'o')
                 .replace(/\p{Diacritic}/gu, '')
}