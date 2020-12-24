import _ from 'lodash';

/*  To check if this row is selectable or not.
    I want the system to visually communicate ("flag") which of
    the samples being displayed have already had all of their files added to the cart.

    @param  data  row of data from sample tab
    @param  cartData, list of fileIDs
    @output  boolean true-> selectable
*/
export function SampleDisableRowSelection(data, cartData) {
  if (cartData.length > 0) {
    if (data.files && data.files.length > 0) {
      // check each files of cases
      const isAllfileBeSelected = _.cloneDeep(data.files).map((f) => {
        if (cartData.includes(f.file_id)) {
          return true;
        }
        return false;
      });

      // if one/more file(s) is not included in the cart, this row is selectable
      if (isAllfileBeSelected.includes(false)) {
        return true;
      }
      return false;
    }
    return false;
  }
  return true;
}
/* on row select event
    @param  data  data for initial the table  sample -> [files]
    @param  allRowsSelected : selected rows
    @output [f.file_id]
*/
export function SampleOnRowsSelect(data, allRowsSelected) {
  // use reduce to combine all the files' id into single array
  return allRowsSelected.reduce((accumulator, currentValue) => {
    const { files } = data[currentValue.dataIndex];
    // check if file
    if (files && files.length > 0) {
      return accumulator.concat(files.map((f) => f.file_id));
    }
    return accumulator;
  }, []);
}
