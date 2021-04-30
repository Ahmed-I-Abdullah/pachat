/* eslint-disable */
export const getUser = /* GraphQL */ `
query GetUser($id: ID!) {
    getUser(id: $id) {
    id
    fullName
    imageUrl
    status
    chatRooms {
      items {
        id
        userID
        chatRoomID
        createdAt
        updatedAt
        chatRoom {
          id
          updatedAt
          users {
            items {
              user {
                id
                fullName
                imageUrl
                status
              }
            }
          }
          messages {
            items {
              updatedAt
              content
            }
          }
        }
      }
      nextToken
    }
    createdAt
    updatedAt
  }
}
`;

/*{
  "data": {
    "getUser": {
      "id": "c45e50aa-69a1-4f1f-a153-eeb119c757bc",
      "fullName": "Ahmed",
      "imageUrl": "https://scontent-hbe1-1.xx.fbcdn.net/v/t1.30497-1/cp0/c15.0.50.50a/p50x50/84628273_176159830277856_972693363922829312_n.jpg?_nc_cat=1&ccb=1-3&_nc_sid=12b3be&_nc_ohc=ShshImdEV0cAX9oxBnD&_nc_ht=scontent-hbe1-1.xx&tp=27&oh=2f020e7365f33da4f2078c61a05c7e65&oe=60A1F0B8",
      "status": "Available",
      "chatRooms": {
        "items": [
          {
            "id": "d6aacf75-4235-45ba-bccf-135471265275",
            "userID": "c45e50aa-69a1-4f1f-a153-eeb119c757bc",
            "chatRoomID": "6c1b6788-3d07-4e0e-811e-0ae513358a56",
            "createdAt": "2021-04-21T10:24:32.987Z",
            "updatedAt": "2021-04-21T10:24:32.987Z",
            "chatRoom": {
              "id": "6c1b6788-3d07-4e0e-811e-0ae513358a56",
              "users": {
                "items": [
                  {
                    "user": {
                      "id": "72f358af-d166-4066-8871-96224db32159",
                      "fullName": "Lucas",
                      "imageUrl": "https://scontent-hbe1-1.xx.fbcdn.net/v/t1.30497-1/cp0/c15.0.50.50a/p50x50/84628273_176159830277856_972693363922829312_n.jpg?_nc_cat=1&ccb=1-3&_nc_sid=12b3be&_nc_ohc=ShshImdEV0cAX9oxBnD&_nc_ht=scontent-hbe1-1.xx&tp=27&oh=2f020e7365f33da4f2078c61a05c7e65&oe=60A1F0B8",
                      "status": "Available"
                    }
                  },
                  {
                    "user": {
                      "id": "c45e50aa-69a1-4f1f-a153-eeb119c757bc",
                      "fullName": "Ahmed",
                      "imageUrl": "https://scontent-hbe1-1.xx.fbcdn.net/v/t1.30497-1/cp0/c15.0.50.50a/p50x50/84628273_176159830277856_972693363922829312_n.jpg?_nc_cat=1&ccb=1-3&_nc_sid=12b3be&_nc_ohc=ShshImdEV0cAX9oxBnD&_nc_ht=scontent-hbe1-1.xx&tp=27&oh=2f020e7365f33da4f2078c61a05c7e65&oe=60A1F0B8",
                      "status": "Available"
                    }
                  }
                ]
              }
            }
          }
        ],
        "nextToken": null
      },
      "createdAt": "2021-04-19T07:43:18.145Z",
      "updatedAt": "2021-04-19T07:43:18.145Z"
    }
  }
}*/
