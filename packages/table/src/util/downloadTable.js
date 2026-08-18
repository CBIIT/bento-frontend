import { formatBytes, formatColumnValues, stripSurroundingBrackets } from './Dataformat';
import { actionCellTypes, notIncludedCellStyle } from './Types';

const AGE_FIELDS = new Set([
  'age_at_diagnosis',
  'participant_age_at_collection',
  'age_at_treatment_start',
  'age_at_treatment_end',
  'age_at_response',
  'age_at_last_known_survival_status',
  'age_at_event_free_survival_status',
]);

/**
 * Sentinel OpenSearch age values (-999) become "Not Reported" for CSV/JSON download.
 * Supports scalars, arrays (files table), and bracketed strings.
 */
export function formatAgeForDownload(value) {
  if (Array.isArray(value)) {
    if (value.length === 0) {
      return 'Not Reported';
    }
    return value.map((item) => formatAgeForDownload(item)).join('; ');
  }
  if (value === -999 || value === '-999' || value == null || value === '') {
    return 'Not Reported';
  }
  if (typeof value === 'string' && value.startsWith('[') && value.endsWith(']')) {
    const inner = value.slice(1, -1).trim();
    if (!inner) {
      return 'Not Reported';
    }
    return inner.split(',').map((item) => formatAgeForDownload(item.trim())).join('; ');
  }
  return String(value);
}

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
      } else if (AGE_FIELDS.has(keyName)) {
        if (entry[keyName] == null) {
          line += ' ';
        } else {
          line += `"${formatAgeForDownload(entry[keyName])}"`;
        }
      } else {
        const raw = entry[keyName];
        if (raw == null) {
          line += ' ';
        } else {
          const stripped = stripSurroundingBrackets(raw);
          if (stripped === '' || stripped === '[]') {
            line += '';
          } else {
            const display = Array.isArray(stripped) ? stripped.join(', ') : stripped;
            line += `"${display}"`;
          }
        }
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
    .filter(({ cellStyle }) => !notIncludedCellStyle.includes(cellStyle))
    .filter(({ display }) => display);
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
  const toDelete = columns.filter((e) => !e.display);
  const filterColumns = columns.filter(({ cellType }) => !actionCellTypes.includes(cellType))
    .filter(({ display }) => display);
  let formatDataVal = formatColumnValues(filterColumns, tableData);
  formatDataVal = formatDataVal.map((entry) => {
    const toReturn = { ...entry };

    AGE_FIELDS.forEach((field) => {
      if (Object.prototype.hasOwnProperty.call(entry, field) && entry[field] != null) {
        toReturn[field] = formatAgeForDownload(entry[field]);
      }
    });

    Object.keys(toReturn).forEach((key) => {
      if (AGE_FIELDS.has(key)) {
        return;
      }
      toReturn[key] = stripSurroundingBrackets(toReturn[key]);
    });

    toDelete.forEach((column) => delete toReturn[column.dataField]);
    return toReturn;
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
