/* eslint-disable import/prefer-default-export */
export function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes';
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${parseFloat((bytes / (1024 ** i)).toFixed(dm))} ${sizes[i]}`;
}

/**
* convert zero (0) value to custom val
* @param {*} columns
* @param {*} data
* @returns
*/
export const formatColumnValues = (columns, data) => {
  const formatColumns = columns.filter(({ columnDefaultValues }) => columnDefaultValues);
  if (formatColumns.length > 0) {
    const formatCoumnData = [...data].reduce((acc, item) => {
      const updateRow = { ...item };
      formatColumns.forEach((col) => {
        const { columnDefaultValues, dataField } = col;
        if (columnDefaultValues[item[dataField]]) {
          updateRow[dataField] = columnDefaultValues[item[dataField]];
        }
      });
      acc.push(updateRow);
      return acc;
    }, []);
    return formatCoumnData;
  }
  return data;
};
