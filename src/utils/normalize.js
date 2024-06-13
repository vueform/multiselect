export default function normalize (str, strict = true) {
  return strict
    ? String(str).toLowerCase().trim()
    : String(str).toLowerCase()
                 .normalize('NFD')
                 .trim()
                 .replace(/æ/g, 'ae')
                 .replace(/œ/g, 'oe')
                 .replace(/ø/g, 'o')
                 .replace(/\p{Diacritic}/gu, '')
}