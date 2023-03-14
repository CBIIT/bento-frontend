/**
 * Provides timestamp in simple format.
 * @param {string} dateString - date string to be reformatted.
 * @param {string} [strSeparator] - separator for date fields, replaces ( - ).
 * @returns string */
function getDateInFormat(dateString, strSeparator) {
  const date = new Date(dateString);
  const yyyy = date.getFullYear();
  const dd = date.getDate();
  const mm = (date.getMonth() + 1);

  if (!dateString || !dateString.length) {
    return '';
  }

  if (strSeparator && strSeparator.length) {
    return `${mm}${strSeparator}${dd}${strSeparator}${yyyy}`;
  }

  return `${yyyy}/${mm}/${dd}`;
}

export default getDateInFormat;
