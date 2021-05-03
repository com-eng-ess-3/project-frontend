import { firestore, getImageUrl, increment } from './firebaseUtil'
import { getCurrentTime } from './getTime'

async function createCommentInPost(postId, content, uid, displayname) {
  try {
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
  } catch (e) {
    throw new Error(e)
  }
}

async function getCommentInPost(postId, lastId) {
  try {
    let queryResult
    if (typeof lastId !== 'number') {
      queryResult = (
        await firestore
          .collection(`posts/${postId}/comment`)
          .orderBy('timeStamp', 'asc')
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
          .orderBy('timeStamp', 'asc')
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
  } catch (e) {
    throw new Error(e)
  }
}

async function updateCommentInPost(postId, commentId, content) {
  try {
    await firestore
      .collection(`posts/${postId}/comment`)
      .doc(commentId)
      .update({
        content,
      })
  } catch (e) {
    throw new Error(e)
  }
}

async function deleteCommentInPost(postId, commentId) {
  try {
    await firestore
      .collection(`posts/${postId}/comment`)
      .doc(commentId)
      .delete()
  } catch (e) {
    throw new Error(e)
  }
}

export {
  createCommentInPost,
  getCommentInPost,
  updateCommentInPost,
  deleteCommentInPost,
}
