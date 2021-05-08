import { API, graphqlOperation } from 'aws-amplify';
import { userLoggedIn } from '../actions/userActions/userActionCreators';
import { getUser } from '../graphql/queries';
import { createUser } from '../graphql/mutations';

const signInAndUpdateUser = (user) => async (dispatch) => {
  dispatch(userLoggedIn(user));

  const fetchedData = await API.graphql(
    graphqlOperation(
      getUser, { id: user.attributes.sub },
    ),
  )
    .catch((err) => console.log('user middleware, fetchData error: ', err));

  if (user && !fetchedData.data.getUser) {
    const newUser = {
      id: user.attributes.sub,
      fullName: user.attributes.name,
      imageUrl: 'https://scontent-hbe1-1.xx.fbcdn.net/v/t1.30497-1/cp0/c15.0.50.50a/p50x50/84628273_176159830277856_972693363922829312_n.jpg?_nc_cat=1&ccb=1-3&_nc_sid=12b3be&_nc_ohc=ShshImdEV0cAX9oxBnD&_nc_ht=scontent-hbe1-1.xx&tp=27&oh=2f020e7365f33da4f2078c61a05c7e65&oe=60A1F0B8',
      status: 'Available',
    };
    await API.graphql(
      graphqlOperation(
        createUser, { input: newUser },
      ),
    )
      .catch((err) => console.log('user middleware, createUser error: ', err));
  }
};

export default signInAndUpdateUser;
