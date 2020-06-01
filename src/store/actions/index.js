
export const Actions = {
  DATA_VALUE: 'DATA_VALUE',
  USER_DATA: 'USER_DATA',
  LOADING_VALUE: 'LOADING_VALUE',
  LEVEL_NUMBER: 'LEVEL_NUMBER',
  LANGUAGE: 'LANGUAGE',
  KEYBOARD: 'KEYBOARD',
};


export const setDataValue = value => ({
  type: Actions.DATA_VALUE,
  value
});

export const setUserData = value => ({
  type: Actions.USER_DATA,
  value
});

export const setLoading = value => ({
  type: Actions.LOADING_VALUE,
  value
});

export const setLevelNumber = value => ({
  type: Actions.LEVEL_NUMBER,
  value
});

export const setLanguage = value => ({
  type: Actions.LANGUAGE,
  value
});

export const setKeyboard = value => ({
  type: Actions.KEYBOARD,
  value
});
