import { firestore, getImageUrl, increment } from './firebaseUtil'
import { getCurrentTime } from 'utils/getTime'

async function createPost(topic, content, tag, authorid, displayname) {
  const timeStamp = getCurrentTime()
  const index = (await firestore.collection('config').doc('id').get()).data()
    .post
  const result = await firestore.collection('posts').add({
    topic,
    content,
    tag,
    timeStamp,
    authorid,
    displayname,
    index,
  })

  await firestore.collection(`posts/${result.id}/stat`).doc('counting').set({
    like: 0,
    indexComment: 0,
    currentComment: 0,
  })

  await firestore.collection('config').doc('id').update({
    post: increment,
  })

  return result.id
}

function editPostById(topic, content, tag, id) {
  return firestore.collection('posts').doc(id).update({
    topic,
    content,
    tag,
  })
}

async function deletePost(id) {
  await firestore.collection('posts').doc(id).delete()
}

async function getPostById(id) {
  const postData = (await firestore.collection('posts').doc(id).get()).data()
  if (!postData) {
    return null
  }
  const urlImage = await getImageUrl(postData.authorid)
  const postStat = await getPostStat(id)
  return {
    ...postData,
    urlProfile: urlImage,
    commentCount: postStat.data().currentComment,
    likeCount: postStat.data().like,
  }
}

function getPostInRange(lastIndex) {}

function getPostStat(id) {
  return firestore.collection(`posts/${id}/stat`).doc('counting').get()
}

export {
  editPostById,
  createPost,
  deletePost,
  getPostById,
  getPostInRange,
  getPostStat,
}
