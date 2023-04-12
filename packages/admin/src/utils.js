const getNodeLevelLabel = (nodeLabel, nodeLevelAccess) => {
  const limit = 30;

  return nodeLevelAccess ? nodeLabel.substring(0, limit) : nodeLabel;
};

/**
 * Gets the display format for the authenticator.
 * @param {string} idpValue - The IDP used to login.
 * */
const getAuthenticatorName = (idpValue) => {
  const loginMap = {
    google: 'Google',
    nih: 'NIH',
    'login.gov': 'Login.gov',
  };

  if (Object.prototype.hasOwnProperty.call(loginMap, idpValue)) {
    return loginMap[idpValue];
  }

  return idpValue;
};

// Capitalize first letter of each word
const capitalizeFirstLetter = (str) => {
  if (str.toLowerCase() === 'non-member') {
    return 'Non-Member';
  }
  if (str.toLowerCase() === 'nih') {
    return 'NIH';
  }
  if (str.toLowerCase() === 'esi') {
    return 'ESI';
  }
  if (str.toLowerCase() === 'google') {
    return 'Google';
  }
  const words = str.split(' ');
  return words.map((word) => word.charAt(0).toUpperCase() + word.substring(1)).join(' ');
};

/**
 * transform data with required formation
 * @param {obj} data
 * @param {metaData}
 * @returns obj
 */
const transformData = (data, metaData) => {
  // find field need to be transform.
  const capitalizedField = metaData.filter((d) => d.isCapital && d.isCapital === true);

  const noEmptyField = metaData.filter((d) => d.noEmpty && d.noEmpty === true);

  const customizedDataArray = [];

  for (let i = 0; i < data.length; i += 1) {
    let expectedData = true;
    const customizedData = data[i];

    if (capitalizedField && capitalizedField.length > 0) {
      // capitalizedField
      for (let j = capitalizedField.length - 1; j >= 0; j -= 1) {
        const field = capitalizedField[j].dataField;
        customizedData[field] = capitalizeFirstLetter(customizedData[field]);
      }
    }

    if (noEmptyField && noEmptyField.length > 0) {
      // checkNoEmptyField
      for (let j = noEmptyField.length - 1; j >= 0; j -= 1) {
        const field = noEmptyField[j].dataField;
        if (customizedData[field] === 0) {
          expectedData = false;
          break;
        }
      }
    }

    if (expectedData) {
      customizedDataArray.push(customizedData);
    }
  }
  return customizedDataArray;
};

export default {
  capitalizeFirstLetter,
  getAuthenticatorName,
  getNodeLevelLabel,
  transformData,
};
