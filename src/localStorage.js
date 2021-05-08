export const loadUser = () => {
  try {
    const serializedUsers = localStorage.getItem('users');
    if (!serializedUsers) {
      return undefined;
    }

    return serializedUsers;
  } catch (err) {
    return undefined;
  }
};

export const saveUser = (user) => {
  try {
    const serializedUsers = JSON.stringify({
      currentUser: user,
      isAuthed: true,
    });
    localStorage.setItem('users', serializedUsers);
  } catch (err) {
    console.log('Saving user in local storage error: ', err);
  }
};

export const resetUser = () => {
  try {
    const serializedUsers = JSON.stringify({
      currentUser: null,
      isAuthed: false,
    });
    localStorage.setItem('users', serializedUsers);
  } catch (err) {
    console.log('Resetting user in local storage error: ', err);
  }
};
