import { firestore, getImageUrl } from './firebaseUtil'

async function getUserProfile(userId, isAuthor) {
  try {
    const thisProfile = (
      await firestore.collection('users').doc(userId).get()
    ).data()

    return {
      displayName: thisProfile.displayName,
      interested: thisProfile.interested,
      status: thisProfile.status,
      profileUrl: await getImageUrl(userId),
      follower: thisProfile.follower,
      following: !!isAuthor ? thisProfile.following : [],
    }
  } catch (e) {
    throw new Error(e)
  }
}

function updateProfileDetail(uid, type, updateTo) {
  return firestore
    .collection('users')
    .doc(uid)
    .update({
      [type]: updateTo,
    })
}

export { getUserProfile, updateProfileDetail }
