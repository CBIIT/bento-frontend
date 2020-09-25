/* eslint-disable */
/*  To check if this row is selectable or not.
    I want the system to visually communicate ("flag") which of
    the file being displayed have already added to the cart.

    @param  data  row of data from sample tab
    @param  cartData, list of fileIDs
    @output  boolean true-> selectable
*/
export function FileDisableRowSelection(data, cartData) {
  // if (cartData.length > 0) {
  //   if (cartData.includes(data.uuid)) {
  //     return false;
  //   }
  //   return true;
  // }
  return true;
}

/* on row select event
    @param  data  data for initial the table
    @param  allRowsSelected : selected rows
    @output [f.uuid]
*/

export function FileOnRowsSelect(data, allRowsSelected) {
  return allRowsSelected.map((row) => data[row.dataIndex].subject_id);
}



export function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes';

  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(1024));

  return `${parseFloat((bytes / (1024 ** i)).toFixed(dm))} ${sizes[i]}`;
}