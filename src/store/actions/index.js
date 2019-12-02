
export const Actions = {
  SET_DATA_VALUE: 'SET_DATA_VALUE',
  SET_DATA_USER: 'SET_DATA_USER',
  SET_LOADING_VALUE: 'SET_LOADING_VALUE',
  SET_USER_TOKEN: 'SET_USER_TOKEN',
  SET_LEVEL_NUMBER: 'SET_LEVEL_NUMBER',
};


export const setDataValue = value => ({
  type: Actions.SET_DATA_VALUE,
  value
});

export const setDataUser = value => ({
  type: Actions.SET_DATA_USER,
  value
});

export const setLoading = value => ({
  type: Actions.SET_LOADING_VALUE,
  value
});

export const setUserToken = value => ({
  type: Actions.SET_USER_TOKEN,
  value
});

export const setLevelNumber = value => ({
  type: Actions.SET_LEVEL_NUMBER,
  value
});
