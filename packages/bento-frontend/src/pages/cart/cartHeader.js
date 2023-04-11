import React, { useContext, useEffect } from 'react';
import { CartContext, setCartConfig } from '@bento-core/cart';
import { Wrapper } from '@bento-core/paginated-table';
import { customTheme } from './wrapperConfig/Theme';
import { headerConfig, outerLayoutConfig } from './wrapperConfig/Wrapper';
import {
  myFilesPageData, table, manifestData,
} from '../../bento/fileCentricCartWorkflowData';

const Header = ({
  queryVariables,
  classes,
}) => {
  const cartContext = useContext(CartContext);
  const {
    dispatch,
  } = cartContext.context;
  /**
  * provide files id to cart context for download manifest
  */
  useEffect(() => {
    const config = {
      queryVariables,
      table,
      manifestData,
      manifestFileName: myFilesPageData.manifestFileName,
    };
    dispatch(setCartConfig(config));
  }, [queryVariables]);

  return (
    <>
      <Wrapper
        wrapConfig={outerLayoutConfig}
        customTheme={customTheme}
        classes={classes}
      />
      <Wrapper
        wrapConfig={headerConfig}
        customTheme={customTheme}
        classes={classes}
        section="myFiles"
      />
    </>
  );
};

export default Header;
