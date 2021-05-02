import firebase from 'firebase'

const limitNewPost = 60 * 60
const limitNotification = 60 * 60 * 24

export function epochToDate(seconds) {
  const d = new Date(0)
  d.setUTCSeconds(seconds)

  const hours = d
    .getHours()
    .toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })
  const minutes = d
    .getMinutes()
    .toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })

  return `${d.getDate()}/${
    d.getMonth() + 1
  }/${d.getFullYear()} ${hours}:${minutes}`
}

export function isNewNotification(timeStamp) {
  return getCurrentTime().seconds - timeStamp.seconds <= limitNewPost
}

export function isInNotification(timeStamp) {
  return getCurrentTime().seconds - timeStamp.seconds <= limitNotification
}

export function getCurrentTime() {
  return firebase.firestore.Timestamp.now()
}
