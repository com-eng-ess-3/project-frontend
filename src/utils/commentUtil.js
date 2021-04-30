import { firestore } from './firebaseUtil'
import { getCurrentTime } from './getTime'

function createCommentInPost(postId, content, uid, displayname) {
  const timeStamp = getCurrentTime()
  return firestore.collection(`posts/${postId}/comment`).add({
    timeStamp,
    content,
    uid,
    displayname,
  })
}

function getCommentInPost(postId, lastId) {
  if (typeof lastId !== 'number') {
    return firestore
      .collection(`posts/${postId}/comment`)
      .orderBy('timeStamp', 'desc')
      .limit(10)
      .get()
  }
  return firestore
    .collection(`posts/${postId}/comment`)
    .orderBy('timeStamp', 'desc')
    .startAfter('id', '==', lastId)
    .limit(10)
    .get()
}

function updateCommentInPost() {}

function deleteCommentInPost() {}

export {
  createCommentInPost,
  getCommentInPost,
  updateCommentInPost,
  deleteCommentInPost,
}
