import { formatBytes, formatColumnValues } from './Dataformat';
import { actionCellTypes } from './Types';

export function createFileName(fileName) {
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

  return `${fileName} ${todaysDate} ${hours}-${minutes}-${seconds}${'.csv'}`;
}

export function convertToCSV(jsonse, keysToInclude, header) {
  const objArray = jsonse;
  // To Do empty object just print headers
  const array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
  let str = header.join(',');
  array.map((entry, index) => {
    let line = '';
    keysToInclude.map((keyName) => {
      if (line !== '') line += ',';
      if (keyName === 'file_size') {
        line += entry[keyName] !== null ? `"${formatBytes(entry[keyName])}"` : ' ';
      } else {
        line += entry[keyName] !== null ? `"${entry[keyName]}"` : ' ';
      }
      return line;
    });
    if (index === 0) {
      // str = header.join(',');
      str += `\r\n${line}\r\n`;
    } else {
      str += `${line}\r\n`;
    }
    return str;
  });
  return str;
}

export function downloadJson(tableData, table, downloadFileName) {
  const { columns = [] } = table;
  const filterColumns = columns.filter(({ cellType }) => !actionCellTypes.includes(cellType));
  const formatDataVal = formatColumnValues(filterColumns, tableData);
  const jsonse = JSON.stringify(formatDataVal);
  const keysToInclude = columns.filter(({ dataField }) => dataField)
    .map(({ dataField }) => dataField);
  const headers = columns.filter(({ dataField }) => dataField).map(({ header }) => header);
  const csv = convertToCSV(jsonse, keysToInclude, headers);
  const exportData = new Blob([csv], { type: 'text/csv' });
  const JsonURL = window.URL.createObjectURL(exportData);
  let tempLink = '';
  tempLink = document.createElement('a');
  tempLink.setAttribute('href', JsonURL);
  tempLink.setAttribute('download', createFileName(downloadFileName || ''));
  document.body.appendChild(tempLink);
  tempLink.click();
  document.body.removeChild(tempLink);
}
