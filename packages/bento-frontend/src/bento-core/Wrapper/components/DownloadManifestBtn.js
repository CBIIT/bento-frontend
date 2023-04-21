import React, { useContext } from 'react';
import { Button } from '@material-ui/core';
import {
  downloadJson,
  CartContext,
} from '@bento-core/cart';
import ToolTipView from './TooltipView';
import client from '../../../utils/graphqlClient';

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
  const {
    cart,
  } = cartContext.context;

  const getQueryVeriables = (queryVariables) => {
    const variables = { ...queryVariables };
    variables.offset = 0;
    variables.first = 10000;
    return variables;
  };

  async function fetchData({ queryVariables, table }) {
    const fetchResult = await client
      .query({
        query: table.api,
        variables: {
          ...getQueryVeriables(queryVariables),
        },
      })
      .then((result) => result.data.filesInList);
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
