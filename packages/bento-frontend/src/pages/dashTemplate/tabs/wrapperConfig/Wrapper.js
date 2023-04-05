import { btnTypes, types } from '../../../../bento-core/PaginationTable/Wrapper';
import {
  tooltipContent,
} from '../../../../bento/dashboardTabData';
import { alertMessage } from '../../../../bento/fileCentricCartWorkflowData';

export const headerConfig = [{
  container: 'buttons',
  size: 'xl',
  clsName: 'container_header',
  items: [
    {
      title: 'ADD ALL FILES',
      clsName: 'add_all_button',
      type: types.BUTTON,
      btnType: btnTypes.ADD_ALL_FILES,
      conditional: false,
      alertMessage,
    },
    {
      title: 'ADD SELECTED FILES',
      clsName: 'add_selected_button',
      type: types.BUTTON,
      btnType: btnTypes.ADD_SELECTED_FILES,
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
      clsName: 'add_selected_button',
      type: types.BUTTON,
      btnType: btnTypes.ADD_SELECTED_FILES,
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
      clsName: 'go_to_cart',
      url: '#/fileCentricCart',
      type: types.LINK,
    }],
}];

/**
* holder function to add files on cart
* console log will be remove when myCart page is integrated
* with bento core paginated table
*/
// eslint-disable-next-line no-unused-vars
const addFilesHandler = (query, variables) => {
  // console.log(query);
  // console.log(variables);
};

export const configWrapper = (tab, configs) => {
  const wrpConfig = configs.map((container) => ({
    ...container,
    items: container.items.map((item) => ({
      ...item,
      addFileAPI: tab.addAddFileAPI,
      addSelectedIdAPI: tab.addSelectedIdAPI,
      dataKey: tab.dataKey,
      eventHandler: addFilesHandler,
    })),
  }));
  return wrpConfig;
};
