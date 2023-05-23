import React, { useContext, useEffect } from 'react';
import { CartContext, setCartConfig } from '@bento-core/cart';
import { Wrapper } from '@bento-core/paginated-table';
import { customTheme } from './wrapperConfig/Theme';
import {
  myFilesPageData, table, manifestData,
} from '../../bento/fileCentricCartWorkflowData';

const Header = ({
  children,
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
        wrapConfig={myFilesPageData.layout}
        customTheme={customTheme}
        classes={classes}
        section="myFiles"
      >
        {children}
      </Wrapper>
    </>
  );
};

export default Header;
