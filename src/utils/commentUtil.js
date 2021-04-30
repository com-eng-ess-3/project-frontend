import { firestore, getImageUrl, increment } from './firebaseUtil'
import { getCurrentTime } from './getTime'

async function createCommentInPost(postId, content, uid, displayname) {
  const timeStamp = getCurrentTime()
  const docRef = firestore.collection(`posts`).doc(postId)

  const indexComment = (await docRef.get()).data().indexComment

  await firestore.collection(`posts/${postId}/comment`).add({
    timeStamp,
    content,
    uid,
    index: indexComment,
    displayname,
    like: 0,
  })

  await docRef.update({
    indexComment: increment,
    currentComment: increment,
  })
}

async function getCommentInPost(postId, lastId) {
  let queryResult
  if (typeof lastId !== 'number') {
    queryResult = (
      await firestore
        .collection(`posts/${postId}/comment`)
        .orderBy('timeStamp', 'desc')
        .limit(10)
        .get()
    ).docs
  } else {
    const cursor = (
      await firestore
        .collection(`posts/${postId}/comment`)
        .where('index', '==', lastId)
        .get()
    ).docs[0]
    queryResult = (
      await firestore
        .collection(`posts/${postId}/comment`)
        .orderBy('timeStamp', 'desc')
        .startAfter(cursor)
        .limit(10)
        .get()
    ).docs
  }
  const commentData = await Promise.all(
    queryResult.map(async (doc) => {
      const authorUid = doc.data().uid
      const url = await getImageUrl(authorUid)
      return {
        ...doc.data(),
        commentId: doc.id,
        urlProfile: url,
      }
    })
  )
  return commentData
}

async function updateCommentInPost(postId, commentId, content) {
  await firestore.collection(`posts/${postId}/comment`).doc(commentId).update({
    content,
  })
}

async function deleteCommentInPost(postId, commentId) {
  await firestore.collection(`posts/${postId}/comment`).doc(commentId).delete()
}

export {
  createCommentInPost,
  getCommentInPost,
  updateCommentInPost,
  deleteCommentInPost,
}
