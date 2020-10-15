export function createFileName() {
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

  return `${'Bento File Manifest'} ${todaysDate} ${hours}-${minutes}-${seconds}${'.csv'}`;
}

export function convertToCSV(jsonse, comments, keysToInclude = ['subject_id', 'file_name', 'file_id', 'md5sum'], header = ['Case ID', 'File Name', 'File ID', 'Md5sum', 'User Comments']) {
  const objArray = jsonse;
  const array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
  let str = '';
  array.map((entry, index) => {
    let line = '';
    keysToInclude.map((keyName) => {
      if (line !== '') line += ',';
      line += entry[keyName] !== null ? entry[keyName] : ' ';
      return line;
    });
    if (index === 0) {
      str = header.join(',');
      str += `\r\n${line},${comments}\r\n`;
    } else {
      str += `${line}\r\n`;
    }
    return str;
  });
  return str;
}

export function downloadJson(tableData, comments) {
  const jsonse = JSON.stringify(tableData);
  const csv = convertToCSV(jsonse, comments);
  const exportData = new Blob([csv], { type: 'text/csv' });
  const JsonURL = window.URL.createObjectURL(exportData);
  let tempLink = '';
  tempLink = document.createElement('a');
  tempLink.setAttribute('href', JsonURL);
  tempLink.setAttribute('download', createFileName());
  document.body.appendChild(tempLink);
  tempLink.click();
  document.body.removeChild(tempLink);
}
