import {
  btnTypes,
  types,
} from '@bento-core/paginated-table';
import {
  tooltipContent,
} from '../../../../bento/dashboardTabData';
import { alertMessage } from '../../../../bento/fileCentricCartWorkflowData';

export const layoutConfig = [{
  container: 'buttons',
  size: 'xl',
  clsName: 'container_header',
  items: [
  ],
}];

/**
* Configuration display component based on index
* CAUTION: provide position of table component
*/
export const wrapperConfig = [{
  container: 'buttons',
  size: 'xl',
  clsName: 'container_header',
  items: [
    {
      title: 'ADD ALL FILES',
      clsName: 'add_all_button',
      type: types.BUTTON,
      role: btnTypes.ADD_ALL_FILES,
      btnType: btnTypes.ADD_ALL_FILES,
      conditional: false,
      alertMessage,
    },
    {
      title: 'ADD SELECTED FILES',
      clsName: 'add_selected_button',
      type: types.BUTTON,
      role: btnTypes.ADD_SELECTED_FILES,
      btnType: btnTypes.ADD_SELECTED_FILES,
      tooltipCofig: tooltipContent,
      conditional: true,
    }],
},
{
  container: 'paginatedTable',
  paginatedTable: true,
},
{
  container: 'buttons',
  size: 'xl',
  clsName: 'container_footer',
  items: [
    {
      title: 'ADD SELECTED FILES',
      clsName: 'add_selected_button',
      type: types.BUTTON,
      role: btnTypes.ADD_SELECTED_FILES,
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
},
];


/**
* 1. addFileQuery - query to addAll files or add selected files on cart
* 2. responseKeys - provided respose key for addFileQuery
*/
export const configWrapper = (tab, configs) => {
  const wrpConfig = configs.map((container) => ({
    ...container,
    items: (!container.paginatedTable) ? container.items.map((item) => ({
      ...item,
      addFileQuery: (item.role === btnTypes.ADD_ALL_FILES)
        ? tab.addAllFileQuery : tab.addSelectedFilesQuery,
      dataKey: tab.addFilesRequestVariableKey,
      responseKeys: (item.role === btnTypes.ADD_ALL_FILES)
        ? tab.addAllFilesResponseKeys : tab.addFilesResponseKeys,
    })) : [],
  }));
  return wrpConfig;
};
