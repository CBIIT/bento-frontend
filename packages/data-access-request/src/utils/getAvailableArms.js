const getAvailableArms = (currentACL, listOfArms) => {
  const unavailableArmsStatus = ['approved', 'pending'];
  const unavailableArms = Object.keys(currentACL).reduce((previousArms, key) => {
    const armObject = currentACL[key];
    const resultArray = previousArms;
    if (unavailableArmsStatus.includes(
      armObject.accessStatus.toLowerCase(),
    )) resultArray.push(armObject.armID);
    return resultArray;
  }, []);
  const availableArms = listOfArms.filter((arm) => !unavailableArms.includes(arm.id));
  return availableArms;
};

export default getAvailableArms;
