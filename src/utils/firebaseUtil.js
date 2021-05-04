import firebase from 'firebase/app'
import 'firebase/storage'
import 'firebase/auth'
import 'firebase/firestore'

const increment = firebase.firestore.FieldValue.increment(1)
const decrement = firebase.firestore.FieldValue.increment(-1)

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
}

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app()

const auth = app.auth()
const firestore = app.firestore()
const storage = app.storage()

export { auth, storage, firestore, increment, decrement, firebase }

export async function getImageUrl(uid) {
  let url = ''
  try {
    url = await storage.ref(`users/${uid}/profileImage.png`).getDownloadURL()
  } catch {}
  return url
}
