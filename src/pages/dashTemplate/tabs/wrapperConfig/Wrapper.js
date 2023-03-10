import { withStyles } from '@material-ui/core';
import React from 'react';
import CustomWrapper, { types } from '../../../../bento-core/PaginationTable/Wrapper';
import { tooltipContent } from '../../../../bento/dashboardTabData';
import { customTheme } from './Theme';

export const headerConfig = [{
  container: 'buttons',
  size: 'xl',
  clsName: 'container_header',
  items: [
    {
      title: 'ADD ALL FILES',
      eventHandler: () => console.log('add all files'),
      clsName: 'add_all_button',
      type: types.BUTTON,
      conditional: false,
    },
    {
      title: 'ADD SELECTED FILES',
      eventHandler: () => console.log('add selected files'),
      clsName: 'add_selected_button',
      type: types.BUTTON,
      tooltipCofig: tooltipContent,
      conditional: true,
    }],
}];

export const footerConfig = [{
  container: 'buttons',
  size: 'xl',
  clsName: 'container_footer',
  items: [
    {
      title: 'ADD SELECTED FILES',
      eventHandler: () => console.log('add selected files'),
      clsName: 'add_selected_button',
      type: types.BUTTON,
      tooltipCofig: tooltipContent,
      conditional: true,
    }],
},
{
  container: 'buttons',
  size: 'xl',
  clsName: 'container_footer_link',
  items: [
    {
      title: 'Go to Cart >',
      eventHandler: () => console.log('go to my cart'),
      clsName: 'go_to_cart',
      url: '#/fileCentricCart',
      type: types.LINK,
    }],
}];

const Wrapper = (props) => {
  const { children } = props;
  return (
    <CustomWrapper
      {...props}
      headerConfig={headerConfig}
      footerConfig={footerConfig}
      customTheme={customTheme}
    >
      {children}
    </CustomWrapper>
  );
};

const styles = () => ({
  customTooltip: {
    border: '#03A383 1px solid',
  },
  customArrow: {
    '&::before': {
      border: '#03A383 1px solid',
    },
  },
});

export default withStyles(styles)(Wrapper);
