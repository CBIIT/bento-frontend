const getFormattedDate = (strDate) => {
  const date = new Date(strDate);

  const year = date.getFullYear();

  let month = (1 + date.getMonth()).toString();
  month = month.length > 1 ? month : '0'.concat(month);

  let day = date.getDate().toString();
  day = day.length > 1 ? day : '0'.concat(day);

  return `${month}/${day}/${year}`;
};

export default getFormattedDate;
