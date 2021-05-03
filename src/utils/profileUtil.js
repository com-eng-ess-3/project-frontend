import { firestore, getImageUrl } from './firebaseUtil'

function getFollowUserData(arr) {
  return arr.map(async (uid) => {
    const displayname = (
      await firestore.collection('users').doc(uid).get()
    ).data().displayName
    return {
      displayname,
      uid,
      profileUrl: await getImageUrl(uid),
    }
  })
}

async function getUserProfile(userId, isAuthor) {
  try {
    const thisProfile = (
      await firestore.collection('users').doc(userId).get()
    ).data()

    const followerData = await Promise.all(
      getFollowUserData(thisProfile.follower)
    )

    let followingData = []

    if (isAuthor) {
      followingData = await Promise.all(
        getFollowUserData(thisProfile.following)
      )
    }

    return {
      displayName: thisProfile.displayName,
      interested: thisProfile.interested,
      status: thisProfile.status,
      profileUrl: await getImageUrl(userId),
      follower: followerData,
      following: followingData,
    }
  } catch (e) {
    throw new Error(e)
  }
}

async function updateProfileDetail(uid, type, updateTo) {
  try {
    await firestore
      .collection('users')
      .doc(uid)
      .update({
        [type]: updateTo,
      })
  } catch (e) {
    throw new Error(e)
  }
}

export { getUserProfile, updateProfileDetail }
