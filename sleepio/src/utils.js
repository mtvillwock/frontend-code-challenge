export const numberToTime = (num) => {
  let hours = Math.floor(num / 60)
  let minutes = Math.floor(num % 60)

  return `${hours}:${minutes}`
}

export const timeToNumber = (time) => {
  let [hours, minutes] = time.split(':').map(str => Number(str));
  let number = (hours * 60) + minutes
  return number
}

