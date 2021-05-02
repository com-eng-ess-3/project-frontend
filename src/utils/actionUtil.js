import { firestore, increment, decrement, auth } from './firebaseUtil'
import firebase from 'firebase'

async function handleWhenLike(postId, commentId) {
  const uid = auth.currentUser.uid
  if (!!postId) {
    if (!!commentId) {
      await firestore
        .collection(`posts/${postId}/comment`)
        .doc(commentId)
        .update({
          like: increment,
        })
      await firestore
        .collection(`users/${uid}/private`)
        .doc('like')
        .update({
          comment: firebase.firestore.FieldValue.arrayUnion(commentId),
        })
    } else {
      await firestore.collection(`posts`).doc(postId).update({
        like: increment,
      })
      await firestore
        .collection(`users/${uid}/private`)
        .doc('like')
        .update({
          post: firebase.firestore.FieldValue.arrayUnion(postId),
        })
    }
  }
}

async function handleWhenDislike(postId, commentId) {
  const uid = auth.currentUser.uid
  if (!!postId) {
    if (!!commentId) {
      await firestore
        .collection(`posts/${postId}/comment`)
        .doc(commentId)
        .update({
          like: decrement,
        })
      await firestore
        .collection(`users/${uid}/private`)
        .doc('like')
        .update({
          comment: firebase.firestore.FieldValue.arrayRemove(commentId),
        })
    } else {
      await firestore.collection(`posts`).doc(postId).update({
        like: decrement,
      })
      await firestore
        .collection(`users/${uid}/private`)
        .doc('like')
        .update({
          post: firebase.firestore.FieldValue.arrayRemove(postId),
        })
    }
  }
}

function followUser(uid) {
  const currentUid = auth.currentUser.uid
  if (!currentUid) {
    return
  }
  return firestore
    .collection('users')
    .doc(currentUid)
    .update({
      following: firebase.firestore.FieldValue.arrayUnion(uid),
    })
}

function unfollowUser(uid) {
  const currentUid = auth.currentUser.uid
  if (!currentUid) {
    return
  }
  return firestore
    .collection('users')
    .doc(currentUid)
    .update({
      following: firebase.firestore.FieldValue.arrayRemove(uid),
    })
}

function getLikePostAndCommentList(uid) {
  return firestore.collection(`users/${uid}/private`).doc('like').get()
}

export {
  handleWhenLike,
  handleWhenDislike,
  followUser,
  unfollowUser,
  getLikePostAndCommentList,
}
