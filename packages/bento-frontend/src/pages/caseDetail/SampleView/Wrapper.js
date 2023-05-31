/* eslint-disable import/prefer-default-export */
import { btnTypes, types } from '@bento-core/paginated-table';
import { GET_ALL_FILEIDS_SAMPLESTAB_FOR_SELECT_ALL } from '../../../bento/dashboardTabData';
import {
  sampleTable,
  table1,
  tooltipContent,
} from '../../../bento/caseDetailData';

export const footerConfig = [{
  container: 'buttons',
  size: 'xl',
  clsName: 'container_footer',
  section: sampleTable.section,
  items: [
    {
      title: table1.buttonText,
      clsName: 'add_selected_button',
      type: types.BUTTON,
      role: btnTypes.ADD_SELECTED_FILES,
      btnType: btnTypes.ADD_SELECTED_FILES,
      tooltipCofig: tooltipContent,
      conditional: true,
      addFileQuery: GET_ALL_FILEIDS_SAMPLESTAB_FOR_SELECT_ALL,
      dataKey: sampleTable.addFilesRequestVariableKey,
      responseKeys: sampleTable.addFilesResponseKeys,
    }],
}];
