function getDateInFormat(dateString) {
  const date = new Date(dateString);
  const yyyy = date.getFullYear();
  const dd = date.getDate();
  const mm = (date.getMonth() + 1);

  const todaysDate = `${yyyy}-${mm}-${dd}`;

  return todaysDate;
}

export default getDateInFormat;
