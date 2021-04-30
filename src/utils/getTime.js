import firebase from 'firebase'

export function epochToDate(seconds) {
  const d = new Date(0)
  d.setUTCSeconds(seconds)

  const hours = d
    .getHours()
    .toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })
  const minutes = d
    .getMinutes()
    .toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })

  return `${d.getDay()}/${d.getMonth()}/${d.getFullYear()} ${hours}:${minutes}`
}

export function getCurrentTime() {
  return firebase.firestore.Timestamp.now()
}
