import getDefaultACL from "./getDefaultACL";

const setDefaultValues = (formFields,getMyUser,availableArms) => formFields.reduce((values, field) => {
    const {
      id, type, multiple, display,
    } = field;

    if (!values[id]) {
      // eslint-disable-next-line no-param-reassign
      values[id] = (['dropdown', 'aclDropdown'].includes(type) && !display) ? getDefaultACL(availableArms) : multiple ? [] : getMyUser[id] || '';
    }

    return values;
  }, {});

  export default setDefaultValues;