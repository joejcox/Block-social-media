const utilities = () => {
  const formatDate = (seconds) => {
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

  return { formatDate }
}

export default utilities
