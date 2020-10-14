/* eslint-disable no-param-reassign */

export function manipulateLinks(tableData) {
  tableData.forEach((column, index) => {
    if ((column.link !== undefined && column.link !== null)) {
      const linkKey = column.link.substring(
        column.link.lastIndexOf('{') + 1,
        column.link.lastIndexOf('}'),
      );
      const linktext = column.link.split('{')[0];
      if (linktext.startsWith('/')) {
        tableData[index].internalLink = true;
      } else {
        tableData[index].externalLink = true;
      }
      const arrayIndex = tableData.findIndex((p) => p.dataField === linkKey);
      tableData[index].actualLink = linktext;
      tableData[index].actualLinkId = arrayIndex;
    }
  });
  return tableData;
}

export function dateTimeStamp() {
  const date = new Date();
  const yyyy = date.getFullYear();
  let dd = date.getDate();
  let mm = (date.getMonth() + 1);

  if (dd < 10) { dd = `0${dd}`; }

  if (mm < 10) { mm = `0${mm}`; }

  const todaysDate = `${yyyy}-${mm}-${dd}`;

  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();

  if (hours < 10) { hours = `0${hours}`; }

  if (minutes < 10) { minutes = `0${minutes}`; }

  if (seconds < 10) { seconds = `0${seconds}`; }

  return `_${todaysDate}_${hours}-${minutes}-${seconds}${'.csv'}`;
}
