export const stringToSlug = (str: string) => {
  return str
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '')
}

export const lowerString = (str: string) => {
  return str.trim().toLowerCase()
}