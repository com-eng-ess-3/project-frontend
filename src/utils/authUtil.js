import { auth } from './firebaseUtil'

function signinAccount(email, password) {
  return auth.signInWithEmailAndPassword(email, password)
}

function logout() {
  return auth.signOut()
}

function registerAccount(email, password) {
  return auth.createUserWithEmailAndPassword(email, password)
}

export { signinAccount, logout, registerAccount }
