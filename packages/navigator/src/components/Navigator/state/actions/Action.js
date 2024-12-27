export const actionTypes = {
    UPDATE_DICTIONARY: 'UPDATE_DICTIONARY',
    ON_TOGGLE_CHECKBOX: 'ON_TOGGLE_CHECKBOX'
};

export const updateDictionary = (payload) => {
  return {
    type: actionTypes.UPDATE_DICTIONARY,
    payload: payload,
  };
};

export const onToggleCheckBox = (payload) => {
  console.log('onToggleCheckBox');
  console.log(payload);
  return {
    type: actionTypes.ON_TOGGLE_CHECKBOX,
    payload: payload,
  }
};
