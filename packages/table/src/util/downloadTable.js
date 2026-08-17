import { formatBytes, formatColumnValues } from './Dataformat';
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
      } else if (keyName === 'last_known_survival_status' || keyName === 'sample_id' || keyName === 'data_category' || keyName === 'participant_id' || keyName === 'anatomic_site' || keyName === 'sample_description' || keyName === 'percent_tumor' || keyName === 'percent_necrosis' || keyName === 'consent_codes') {
        if (!entry[keyName] || entry[keyName] === '[]') {
          line += '';
        } else if (entry[keyName].toString().charAt(0) === '[' && entry[keyName].toString().charAt(entry[keyName].toString().length - 1) === ']') {
          line += `"${entry[keyName].toString().substring(1, entry[keyName].length - 1)}"`;
        } else {
          line += `"${entry[keyName]}"`;
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
    let survivalStatus = entry.last_known_survival_status;
    let sampleId = entry.sample_id;
    let dataCategory = entry.data_category;
    let participantId = entry.participant_id;
    let anatomicSite = entry.anatomic_site;
    let sampleDescription = entry.sample_description;
    let percentTumor = entry.percent_tumor;
    let percentNecrosis = entry.percent_necrosis;
    let consentCodes = entry.consent_codes;
    const toReturn = { ...entry };

    AGE_FIELDS.forEach((field) => {
      if (Object.prototype.hasOwnProperty.call(entry, field) && entry[field] != null) {
        toReturn[field] = formatAgeForDownload(entry[field]);
      }
    });

    if (survivalStatus && survivalStatus.toString().charAt(0) === '[' && survivalStatus.toString().charAt(survivalStatus.toString().length - 1) === ']') {
      survivalStatus = survivalStatus.toString().substring(1, survivalStatus.length - 1);
      toReturn['Last Known Survival Status'] = survivalStatus;
    }
    if (sampleId && sampleId.toString().charAt(0) === '[' && sampleId.toString().charAt(sampleId.toString().length - 1) === ']') {
      sampleId = sampleId.toString().substring(1, sampleId.length - 1);
      toReturn['Sample Id'] = sampleId;
    }
    if (dataCategory && dataCategory.toString().charAt(0) === '[' && dataCategory.toString().charAt(dataCategory.toString().length - 1) === ']') {
      dataCategory = dataCategory.toString().substring(1, dataCategory.length - 1);
      toReturn['Data Category'] = dataCategory;
    }
    if (participantId && participantId.toString().charAt(0) === '[' && participantId.toString().charAt(participantId.toString().length - 1) === ']') {
      participantId = participantId.toString().substring(1, participantId.length - 1);
      toReturn['Participant ID'] = participantId;
    }
    if (anatomicSite && anatomicSite.toString().charAt(0) === '[' && anatomicSite.toString().charAt(anatomicSite.toString().length - 1) === ']') {
      anatomicSite = anatomicSite.toString().substring(1, anatomicSite.length - 1);
      toReturn['Anatomic Site'] = anatomicSite;
    }
    if (sampleDescription && sampleDescription.toString().charAt(0) === '[' && sampleDescription.toString().charAt(sampleDescription.toString().length - 1) === ']') {
      sampleDescription = sampleDescription.toString().substring(1, sampleDescription.length - 1);
      toReturn['Sample Description'] = sampleDescription;
    }
    if (percentTumor && percentTumor.toString().charAt(0) === '[' && percentTumor.toString().charAt(percentTumor.toString().length - 1) === ']') {
      percentTumor = percentTumor.toString().substring(1, percentTumor.length - 1);
      toReturn['Percent Tumor'] = percentTumor;
    }
    if (percentNecrosis && percentNecrosis.toString().charAt(0) === '[' && percentNecrosis.toString().charAt(percentNecrosis.toString().length - 1) === ']') {
      percentNecrosis = percentNecrosis.toString().substring(1, percentNecrosis.length - 1);
      toReturn['Percent Necrosis'] = percentNecrosis;
    }
    if (consentCodes && consentCodes.toString().charAt(0) === '[' && consentCodes.toString().charAt(consentCodes.toString().length - 1) === ']') {
      consentCodes = consentCodes.toString().substring(1, consentCodes.length - 1);
      toReturn['Consent Codes'] = consentCodes;
    }

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
