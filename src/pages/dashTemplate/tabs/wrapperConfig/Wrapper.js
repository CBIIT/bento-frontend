import { types } from '../../../../bento-core/PaginationTable/Wrapper';
import { tooltipContent } from '../../../../bento/dashboardTabData';

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
