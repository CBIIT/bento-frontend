/*  To check if this row is selectable or not.
    I want the system to visually communicate ("flag") which of
    the file being displayed have already added to the cart.

    @param  data  row of data from sample tab
    @param  cartData, list of fileIDs
    @output  boolean true-> selectable
*/
export function FileDisableRowSelection(data, cartData) {
  if (cartData && cartData.length > 0) {
    if (cartData.includes(data.file_id)) {
      return false;
    }
    return true;
  }
  return true;
}

/* on row select event
    @param  data  data for initial the table
    @param  allRowsSelected : selected rows
    @output [f.uuid]
*/

export function FileOnRowsSelect(data, allRowsSelected) {
  return allRowsSelected.map((row) => data[row.dataIndex].file_id);
}
