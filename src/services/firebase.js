import { firebase, FieldValue } from "../lib/firebase";

export async function doesUsernameExist(username) {
  const result = await firebase
    .firestore()
    .collection("users")
    .where("username", "==", username)
    .get();

  return result.docs.map((user) => user.data().length > 0);
}

export async function getUserByUserId(userId) {
  const result = await firebase
    .firestore()
    .collection("users")
    .where("userId", "==", userId)
    .get();

  const user = result.docs.map((item) => ({
    ...item.data(),
    docId: item.id,
  }));

  return user;
}

export async function getSuggestedProfiles(userId, following) {
  const result = await firebase.firestore().collection("users").limit(10).get();
  return result.docs
    .map((user) => ({ ...user.data(), docId: user.id }))
    .filter(
      (profile) =>
        profile.userId !== userId && !following.includes(profile.userId)
    );
}

export async function updateLoggedInUserFollowing(
  loggedInUserDocId,
  profileId,
  isFollowingProfile
) {
  return firebase
    .firestore()
    .collection("users")
    .doc(loggedInUserDocId)
    .update({
      following: isFollowingProfile
        ? FieldValue.arrayRemove(profileId)
        : FieldValue.arrayUnion(profileId),
    });
}
export async function updateFollowedUserFollowers(
  profileDocId,
  loggedInUserDocId,
  isFollowingProfile
) {
  return firebase
    .firestore()
    .collection("users")
    .doc(profileDocId)
    .update({
      followers: isFollowingProfile
        ? FieldValue.arrayRemove(loggedInUserDocId)
        : FieldValue.arrayUnion(loggedInUserDocId),
    });
}

export async function addSnippet() {
  // const sampleCode = `const generateId = () => {
  //   return '_' + Math.random().toString(36).substr(2, 9);
  // }`;
  // return firebase
  //   .firestore()
  //   .collection("snippets")
  //   .add({
  //     comments: [
  //       { comment: "niceeee", displayName: "ivannn" },
  //       { comment: "im stealin this", displayName: "Learth" },
  //     ],
  //     dateCreated: Date.now(),
  //     description: "quick id generator",
  //     language: "javascript",
  //     likes: [],
  //     snippet: sampleCode,
  //     snippetId: 10,
  //     title: "random id generator",
  //     userId: "2",
  //     username: "SleepyTeas",
  //   });
  // const updateCode = `console.log("hello world");`;
  // return firebase
  //   .firestore()
  //   .collection("snippets")
  //   .doc("VUDgCG47qNMEQFfjZgfL")
  //   .update({ userId: "2", username: "Magikarpet" });
}

export async function getSnippets(userId, following) {
  const result = await firebase
    .firestore()
    .collection("snippets")
    .where("userId", "in", following)
    .get();

  console.log("userId", userId);
  console.log("following", following);

  const userFollowedSnippets = result.docs.map((snippet) => ({
    ...snippet.data(),
    docId: snippet.id,
  }));

  const snippetsWithUserDetails = await Promise.all(
    userFollowedSnippets.map(async (snippet) => {
      let userLikedSnippet = false;
      if (snippet.likes.includes(userId)) {
        userLikedSnippet = true;
      }
      const user = await getUserByUserId(snippet.userId);
      const { username } = user[0];
      return { username, ...snippet, userLikedSnippet };
    })
  );

  return snippetsWithUserDetails;
}
