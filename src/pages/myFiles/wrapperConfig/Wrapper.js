import { btnTypes } from '../../../bento-core/Wrapper/components/AddFiles';
import { types } from '../../../bento-core/Wrapper/Wrapper';
import { myFilesPageData, tooltipContent } from '../../../bento/fileCentricCartWorkflowData';
/**
* configure outer layout
*/
export const outerLayoutConfig = [{
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
}];

export const headerConfig = [{
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
}];

export const footerConfig = [{
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
}];
