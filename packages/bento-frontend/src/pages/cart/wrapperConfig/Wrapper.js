import { types, btnTypes } from '@bento-core/paginated-table';
import { myFilesPageData, tooltipContent } from '../../../bento/fileCentricCartWorkflowData';

export const wrapperConfig = [
  {
    container: 'outer_layout',
    size: 'xl',
    clsName: 'container_outer_layout',
    items: [
      {
        clsName: 'cart_icon',
        type: types.ICON,
        src: myFilesPageData.headerIconSrc,
        alt: myFilesPageData.headerIconAlt,
      },
      {
        clsName: 'cart_header_text',
        text: 'Cart >',
        type: types.TEXT,
      },
      {
        clsName: 'cart_sel_files_text',
        text: 'Selected Files',
        type: types.TEXT,
      },
    ],
  },
  {
  container: 'buttons',
  size: 'xl',
  clsName: 'container_header',
  items: [
    {
      title: 'DOWNLOAD MANIFEST',
      clsName: 'download_manifest',
      type: types.BUTTON,
      role: btnTypes.DOWNLOAD_MANIFEST,
      btnType: btnTypes.DOWNLOAD_MANIFEST,
      tooltipCofig: tooltipContent,
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
      clsName: 'manifest_comments',
      type: types.TEXT_INPUT,
      placeholder: myFilesPageData.textareaPlaceholder,
    }],
}];
