export const formatDate = (seconds) => {
  const date = new Date(seconds * 1000)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()
  const minutes =
    date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()
  const fullDate = `${day}/${month}/${year}`
  const postTime = `${hours}:${minutes}`

  return {
    date: fullDate,
    time: postTime,
  }
}

export const convertToSlug = (slug) => {
  return slug
    .toLowerCase()
    .replace(/[^\w ]+/g, "")
    .replace(/ +/g, "-")
}

export const replaceEmoji = (str) => {
  return str.replace(
    /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g,
    "moji"
  )
}

export const cleanUpTitle = (title) => {
  const trimmedTitle = title.trim()
  const cleanedTitle = replaceEmoji(trimmedTitle)
  const formattedSlug = convertToSlug(cleanedTitle)

  return { cleanedTitle, formattedSlug }
}
