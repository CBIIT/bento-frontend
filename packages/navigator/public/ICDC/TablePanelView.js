import React from 'react';
import { tableField, tableHeaderLabel, TableView } from '../../dist';
/**
 * override table view
 * @param {*} param0
 * @returns
 */
const TablePanelView = ({
  dictionary,
}) => {
  const columns = [
    { field: tableField.PROPERTY_NAME, name: tableHeaderLabel.PROPERTY },
    { field: tableField.TYPE, name: tableHeaderLabel.TYPE },
    { field: tableField.INCLUSION, name: tableHeaderLabel.INCLUSION },
    { field: tableField.DESC, name: tableHeaderLabel.DESC },
  ];

  const tableViewConfig = {
    isTemplateAndDocsDownlaod: false,
    columns,
  };

  return (
    <>
      <TableView
        dictionary={dictionary}
        tableViewConfig={tableViewConfig}
      />
    </>
  )
};

export default TablePanelView;
