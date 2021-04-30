import firebase from 'firebase'

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
}

const app = firebase.initializeApp(firebaseConfig)

const auth = app.auth()
const firestore = app.firestore()
const storage = app.storage()

export { auth, storage, firestore }

export function getImageUrl(uid) {
  return storage.ref(`users/${uid}/profileImage.png`).getDownloadURL()
}
