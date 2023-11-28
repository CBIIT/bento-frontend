import React, { useContext, useState } from 'react';
import { Button, Tooltip } from '@material-ui/core';
import { useApolloClient } from '@apollo/client';
import {
  downloadJson,
  CartContext,
} from '@bento-core/cart';
import ToolTipView from './TooltipView';
import DownloadFileManifestDialog from './downloadFileManifestDialog';

const DownloadManifestView = (props) => {
  const {
    tooltipCofig,
    clsName,
    title,
    totalRowCount,
  } = props;

  const {
    icon,
    alt,
    arrow = false,
    clsName: toolTipClsName,
  } = tooltipCofig;
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

  const client = useApolloClient();
  async function fetchData({ queryVariables, table }) {
    const fetchResult = await client
      .query({
        query: table.api,
        variables: {
          ...getQueryVeriables(queryVariables),
        },
      })
      .then((result) => (table.objectKey ? result.data[table.objectKey] : result.data.filesInList));
    return fetchResult;
  }

  async function DocumentDownload(comment, header) {
    const { table, queryVariables } = cart;
    const tableData = await fetchData({ queryVariables, table });
    return downloadJson({
      ...cart,
      tableData,
      comment,
      header,
    });
  }

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        className={clsName}
        disableRipple
        onClick={() => { setIsOpen(true); }}
        disabled={totalRowCount === 0}
      >
        {title}
      </Button>
      <DownloadFileManifestDialog
        open={isOpen}
        onClose={() => { setIsOpen(false); }}
        downloadSCSVFile={(comment) => DocumentDownload(comment, 'User_Comment')}
      />
      {(tooltipCofig && !tooltipCofig.customToolTipComponent) && (<ToolTipView {...props} />)}
      {(tooltipCofig && tooltipCofig.customToolTipComponent) && (
        <Tooltip
          arrow={arrow}
          interactive
          title={(
            <>
              {tooltipCofig.customToolTipComponent}
            </>
          )}
          placement="bottom"
        >
          {icon && (<img src={icon} alt={alt} className={toolTipClsName} />)}
        </Tooltip>
      )}

    </>
  );
};

export default DownloadManifestView;
