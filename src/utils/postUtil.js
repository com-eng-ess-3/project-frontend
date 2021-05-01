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
    index,
    like: 0,
    indexComment: 0,
    currentComment: 0,
    timeStamp,
    authorid,
    displayname,
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
  return {
    ...postData,
    urlProfile: urlImage,
  }
}

async function getNewestPost(lastIndex) {
  let docRef
  if (typeof lastIndex !== 'number') {
    docRef = firestore
      .collection('posts')
      .orderBy('timeStamp', 'desc')
      .limit(10)
  } else {
    const cursor = (
      await firestore.collection('posts').where('index', '==', lastIndex).get()
    ).docs[0]
    docRef = firestore
      .collection('posts')
      .orderBy('timeStamp', 'desc')
      .startAfter(cursor)
      .limit(10)
  }

  const collectionQuery = (await docRef.get()).docs
  if (collectionQuery.length === 0) {
    return []
  }
  const postData = await Promise.all(
    collectionQuery.map(async (doc) => {
      const authorUid = doc.data().authorid
      const url = await getImageUrl(authorUid)
      return {
        ...doc.data(),
        postId: doc.id,
        urlProfile: url,
      }
    })
  )
  return postData
}

async function getPopularPost(lastIndex) {
  let docRef
  if (typeof lastIndex !== 'number') {
    docRef = firestore.collection('posts').orderBy('like', 'desc').limit(10)
  } else {
    const cursor = (
      await firestore.collection('posts').where('index', '==', lastIndex).get()
    ).docs[0]
    docRef = firestore
      .collection('posts')
      .orderBy('like', 'desc')
      .startAfter(cursor)
      .limit(10)
  }

  const collectionQuery = (await docRef.get()).docs

  if (collectionQuery.length === 0) {
    return []
  }
  const postData = await Promise.all(
    collectionQuery.map(async (doc) => {
      const authorUid = doc.data().authorid
      const url = await getImageUrl(authorUid)
      return {
        ...doc.data(),
        postId: doc.id,
        urlProfile: url,
      }
    })
  )

  return postData
}

function getFollowerPost(lastIndex) {
  if (typeof lastIndex !== 'number') {
  }
}

export {
  editPostById,
  createPost,
  deletePost,
  getPostById,
  getNewestPost,
  getPopularPost,
  getFollowerPost,
}
