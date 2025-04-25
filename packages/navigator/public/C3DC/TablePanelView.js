import React from 'react';
import { TableView } from '../../dist';

const TablePanelView = ({
  dictionary,
}) => {
  return (
    <>
      <TableView dictionary={dictionary} />
    </>
  )
};

export default TablePanelView;
