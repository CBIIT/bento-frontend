import React, { useContext } from 'react';
import { Button } from '@material-ui/core';
import { useApolloClient } from '@apollo/client';
import {
  downloadJson,
  CartContext,
} from '@bento-core/cart';
import ToolTipView from './TooltipView';

const DownloadManifestView = (props) => {
  const {
    tooltipCofig,
    clsName,
    title,
  } = props;
  /**
  * get cart state
  */
  const cartContext = useContext(CartContext);
  const { context } = cartContext;
  const {
    cart,
  } = context;

  const getQueryVeriables = (queryVariables) => {
    const variables = { ...queryVariables };
    variables.offset = 0;
    variables.first = 10000;
    return variables;
  };

  const appendStringsToRecord = (records, columnsToAppendString) => records.map((record) => {
    const updatedRecord = record;
    columnsToAppendString.forEach((columnConfigObject) => {
      updatedRecord[columnConfigObject.dataField] = columnConfigObject.appendString
        + updatedRecord[columnConfigObject.dataField];
    });
    return updatedRecord;
  });

  const client = useApolloClient();
  async function fetchData({ queryVariables, table }) {
    const fetchResult = await client
      .query({
        query: table.manifestAPI ? table.manifestAPI : table.api,
        variables: {
          ...getQueryVeriables(queryVariables),
        },
      })
      .then((result) => result.data.filesInList)
      .then((result) => {
        const { columns } = table;
        const columnsToAppendString = columns.filter((colum) => colum.appendString);
        if (Object.keys(columnsToAppendString).length > 0) {
          return appendStringsToRecord(result, columnsToAppendString);
        }

        return result;
      });
    return fetchResult;
  }

  async function DocumentDownload() {
    const { table, queryVariables } = cart;
    const tableData = await fetchData({ queryVariables, table });
    return downloadJson({ ...cart, tableData });
  }

  return (
    <>
      <Button
        className={clsName}
        disableRipple
        onClick={() => DocumentDownload()}
      >
        {title}
      </Button>
      {tooltipCofig && (<ToolTipView {...props} />)}
    </>
  );
};

export default DownloadManifestView;
