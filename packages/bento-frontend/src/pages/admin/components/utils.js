import custodianUtils from '../../../utils/custodianUtilFuncs';
/**
 * transform data with required formation
 * @param {obj} data
 * @param {metaData}
 * @returns obj */

const transformData = (data, metaData) => {
  // find field need to be transform.

  const { capitalizeFirstLetter } = custodianUtils;

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

export default transformData;
