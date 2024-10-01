import { formatBytes, formatColumnValues } from './Dataformat';
import { actionCellTypes, notIncludedCellStyle } from './Types';

export function createFileName(fileName, type) {
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

  if (type === 'csv') {
    return `${fileName} ${todaysDate} ${hours}-${minutes}-${seconds}${'.csv'}`;
  }
  return `${fileName} ${todaysDate} ${hours}-${minutes}-${seconds}${'.json'}`;
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
      } else if (keyName === 'age_at_diagnosis' || keyName === 'participant_age_at_collection') {
        if (entry[keyName] === -999) {
          line += 'Not Reported';
        } else {
          line += entry[keyName] !== null ? `"${entry[keyName]}"` : ' ';
        }
      } else if (keyName === 'last_known_survival_status') {
        if (entry[keyName] === '[]') {
          line += '';
        } else if (entry[keyName].toString().charAt(0) === '[' && entry[keyName].toString().charAt(entry[keyName].toString().length - 1) === ']') {
          line += entry[keyName].toString().substring(1, entry[keyName].length - 1);
        } else {
          line += entry[keyName];
        }
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

export function downloadCSV(tableData, table, downloadFileName) {
  const { columns = [] } = table;
  const filterColumns = columns.filter(({ cellType }) => !actionCellTypes.includes(cellType))
    .filter(({ cellStyle }) => !notIncludedCellStyle.includes(cellStyle));
  const formatDataVal = formatColumnValues(filterColumns, tableData);
  const jsonse = JSON.stringify(formatDataVal);
  const keysToInclude = filterColumns.filter(({ dataField }) => dataField)
    .map(({ dataField }) => dataField);
  const headers = filterColumns.filter(({ dataField }) => dataField)
    .map(({ header, downloadHeader }) => (downloadHeader || header));
  const csv = convertToCSV(jsonse, keysToInclude, headers);
  const exportData = new Blob([csv], { type: 'text/csv' });
  const JsonURL = window.URL.createObjectURL(exportData);
  let tempLink = '';
  tempLink = document.createElement('a');
  tempLink.setAttribute('href', JsonURL);
  tempLink.setAttribute('download', createFileName(downloadFileName || '', 'csv'));
  document.body.appendChild(tempLink);
  tempLink.click();
  document.body.removeChild(tempLink);
}

export function downloadJson(tableData, table, downloadFileName) {
  const { columns = [] } = table;
  const filterColumns = columns.filter(({ cellType }) => !actionCellTypes.includes(cellType));
  let formatDataVal = formatColumnValues(filterColumns, tableData);
  formatDataVal = formatDataVal.map((entry) => {
    const survivalStatus = entry.last_known_survival_status;
    if (survivalStatus === '[]') {
      return { ...entry, last_known_survival_status: '' };
    }
    if (survivalStatus.toString().charAt(0) === '[' && survivalStatus.toString().charAt(survivalStatus.toString().length - 1) === ']') {
      return {
        ...entry,
        last_known_survival_status:
          survivalStatus.toString().substring(1, survivalStatus.length - 1),
      };
    }
    return entry;
  });
  filterColumns.forEach((column) => {
    formatDataVal = JSON.parse(
      JSON.stringify(formatDataVal).split(`"${column.dataField}":`).join(`"${column.header}":`),
    );
  });
  const jsonse = JSON.stringify(formatDataVal);
  const exportData = new Blob([jsonse], { type: 'application/json' });
  const JsonURL = window.URL.createObjectURL(exportData);
  let tempLink = '';
  tempLink = document.createElement('a');
  tempLink.setAttribute('href', JsonURL);
  tempLink.setAttribute('download', createFileName(downloadFileName || '', 'json'));
  document.body.appendChild(tempLink);
  tempLink.click();
  document.body.removeChild(tempLink);
}
