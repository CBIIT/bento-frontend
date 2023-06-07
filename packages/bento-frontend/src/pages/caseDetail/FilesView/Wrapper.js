/* eslint-disable import/prefer-default-export */
import { types, btnTypes } from '@bento-core/paginated-table';
import { GET_ALL_FILEIDS_FILESTAB_FOR_SELECT_ALL } from '../../../bento/dashboardTabData';
import {
  filesTable,
  tooltipContent,
} from '../../../bento/caseDetailData';

export const footerConfig = [{
  container: 'buttons',
  size: 'xl',
  clsName: 'container_footer',
  section: filesTable.name,
  items: [
    {
      title: filesTable.buttonText,
      clsName: 'add_selected_button',
      type: types.BUTTON,
      role: btnTypes.ADD_SELECTED_FILES,
      btnType: btnTypes.ADD_SELECTED_FILES,
      tooltipCofig: tooltipContent,
      conditional: true,
      addFileQuery: GET_ALL_FILEIDS_FILESTAB_FOR_SELECT_ALL,
      dataKey: filesTable.addFilesRequestVariableKey,
      responseKeys: filesTable.addFilesResponseKeys,
    }],
}];
