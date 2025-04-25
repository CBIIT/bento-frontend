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
  return `${fileName} ${todaysDate} ${hours}-${minutes}-${seconds}`;
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
      } else if (keyName === 'participant') {
        line += entry[keyName].participant_id;
      } else {
        const newLine = entry[keyName] !== null ? String(entry[keyName]).replace(/"/g, '""') : '';
        line += `"${newLine}"`;
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

export function downloadData(tableData, table, downloadFileName, format = 'csv') {
  const { columns = [] } = table;
  const filterColumns = columns.filter(({ cellType, doNotDownload }) => (
    !actionCellTypes.includes(cellType) && !doNotDownload));
  let formatDataVal = formatColumnValues(filterColumns, tableData);

  formatDataVal = formatDataVal.map((item) => {
    const updatedItem = {};
    filterColumns.forEach(({ dataField }) => {
      updatedItem[dataField] = item[dataField];
    });
    return updatedItem;
  });

  let fileContent;
  let fileType;

  if (format === 'json') {
    filterColumns.forEach((column) => {
      const mapData = (data) => {
        const dataObject = data;
        if (dataObject?.[column.dataField]?.participant_id) {
          dataObject[column.dataField] = dataObject?.[column.dataField]?.participant_id;
        }
        return dataObject;
      };
      formatDataVal = formatDataVal.map(mapData);
      formatDataVal = JSON.parse(
        JSON.stringify(formatDataVal).split(`"${column.dataField}":`).join(`"${column.header}":`),
      );
    });
    fileContent = JSON.stringify(formatDataVal);
    fileType = 'application/json';
  } else {
    const jsonse = JSON.stringify(formatDataVal);
    const keysToInclude = filterColumns.filter(({ dataField }) => dataField)
      .map(({ dataField }) => dataField);
    const headers = filterColumns.filter(({ dataField }) => dataField)
      .map(({ header, downloadHeader }) => (downloadHeader || header));
    fileContent = convertToCSV(jsonse, keysToInclude, headers);
    fileType = 'text/csv';
  }

  const exportData = new Blob([fileContent], { type: fileType });
  const fileURL = window.URL.createObjectURL(exportData);
  const tempLink = document.createElement('a');
  tempLink.setAttribute('href', fileURL);
  tempLink.setAttribute('download', createFileName(downloadFileName || ''));
  document.body.appendChild(tempLink);
  tempLink.click();
  document.body.removeChild(tempLink);
}
