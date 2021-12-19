/* eslint-disable no-plusplus */
export function seedDatabase(firebase) {
  const users = [
    {
      userId: "Rek5saJNA5Rt2bxGhVXrw6Cluhm1",
      username: "ivan",
      fullName: "ivan tang",
      emailAddress: "ivan@ivan.com",
      dateCreated: Date.now(),
    },
    {
      userId: "2",
      username: "raphael",
      fullName: "Raffaello Sanzio da Urbino",
      emailAddress: "raphael@sanzio.com",
      dateCreated: Date.now(),
    },
    {
      userId: "3",
      username: "dali",
      fullName: "Salvador Dalí",
      emailAddress: "salvador@dali.com",
      dateCreated: Date.now(),
    },
    {
      userId: "4",
      username: "orwell",
      fullName: "George Orwell",
      emailAddress: "george@orwell.com",
      dateCreated: Date.now(),
    },
  ];

  // eslint-disable-next-line prefer-const
  for (let k = 0; k < users.length; k++) {
    firebase.firestore().collection("users").add(users[k]);
  }

  // eslint-disable-next-line prefer-const
  for (let i = 1; i <= 5; ++i) {
    firebase
      .firestore()
      .collection("snippets")
      .add({
        snippetId: i,
        userId: "Rek5saJNA5Rt2bxGhVXrw6Cluhm1",
        snippets: [
          {
            title: "dali",
            snippet: "Love this place, looks like my animal farm!",
            language: "javascript",
          },
          {
            title: "orwell",
            snippet: "Would you mind if I used this picture?",
            language: "css",
          },
        ],
        dateCreated: Date.now(),
      });
  }
}
