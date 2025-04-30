import React from 'react';
import { field, label } from '../../Navigator/components/Table/Property/tableConfig';
import TableView from '../../Navigator/components/Table/TableView';
/**
 * override table view
 * @param {*} param0
 * @returns
 */
const TablePanelView = ({
  dictionary,
}) => {
  const columns = [
    { field: field.PROPERTY_NAME, name: label.PROPERTY },
    { field: field.TYPE, name: label.TYPE },
    { field: field.INCLUSION, name: label.INCLUSION },
    { field: field.DESC, name: label.DESC },
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
  );
};

export default TablePanelView;
