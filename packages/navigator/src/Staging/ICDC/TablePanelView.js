import React from 'react';
import TableView from '../../Navigator/components/Table/TableView';
/**
 * override table view
 * @param {*} param0
 * @returns
 */
const TablePanelView = ({
  dictionary,
}) => (
  <>
    <TableView
      dictionary={dictionary}
    />
  </>
);

export default TablePanelView;
