import { firestore, increment, decrement } from './firebaseUtil'

async function handleWhenLike(postId, commentId) {
  if (!postId) {
    if (!commentId) {
      await firestore
        .collection(`posts/${postId}/comment`)
        .doc(commentId)
        .update({
          like: increment,
        })
    } else {
      await firestore.collection(`posts`).doc(postId).update({
        like: increment,
      })
    }
  }
}

async function handleWhenDislike(postId, commentId) {
  if (!postId) {
    if (!commentId) {
      await firestore
        .collection(`posts/${postId}/comment`)
        .doc(commentId)
        .update({
          like: decrement,
        })
    } else {
      await firestore.collection(`posts`).doc(postId).update({
        like: decrement,
      })
    }
  }
}

function followUser() {}

function unfollowUser() {}

export { handleWhenLike, handleWhenDislike, followUser, unfollowUser }
