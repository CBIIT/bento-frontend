import gql from 'graphql-tag';
import { cellTypes, dataFormatTypes } from '@bento-core/table';
import { customMyFilesTabDownloadCSV } from './tableDownloadCSV';

export const navBarCartData = {
  cartLabel: 'Cart',
  cartLink: '/fileCentricCart',
  cartIcon: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/bento/images/icons/svgs/Icon-Cart-Navbar.svg',
  cartIconAlt: 'cart_logo',
};

// --------------- Files limit configuration --------------
export const alertMessage = 'The cart is limited to 1000 files. Please narrow the search criteria or remove some files from the cart to add more.';
export const maximumNumberOfFilesAllowedInTheCart = 1000;

// --------------- Tooltip configuration --------------
export const tooltipContent = {
  icon: 'https://raw.githubusercontent.com/google/material-design-icons/master/src/action/help/materialicons/24px.svg',
  alt: 'tooltipIcon',
  clsName: 'tooltip_icon',
  myFiles: 'To access and analyze files: select and remove unwanted files,  click the “Download Manifest” button, and upload the resulting Manifest file to your Seven Bridges Genomics account.',
  arrow: true,
  styles: {
    border: '#03A383 1px solid',
  },
};

export const myFilesPageData = {
  mainTitle: 'Cart >',
  subTitle: 'Selected Files',
  downButtonText: 'DOWNLOAD MANIFEST',
  headerIconSrc: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/bento/images/icons/svgs/Icon-Cart-Workflow.svg',
  headerIconAlt: 'Bento MyFiles header logo',
  manifestFileName: 'BENTO File Manifest',
  tooltipIcon: 'https://raw.githubusercontent.com/google/material-design-icons/master/src/action/help/materialicons/24px.svg',
  tooltipAlt: 'tooltip icon',
  tooltipMessage: 'To access and analyze files: select and remove unwanted files,  click the “Download Manifest” button, and upload the resulting Manifest file to your Seven Bridges Genomics account.',
  textareaPlaceholder: 'Please add a description for the CSV file you are about to download.',
  errorMessage: 'An error has occurred in loading CART',
  popUpWindow: {
    showNumberOfFileBeRemoved: true,
    messagePart1: 'Remove ',
    messagePart2: 'All files (',
    messagePart3: ') ',
    messagePart4: 'From Cart',
    okButtonText: 'Ok',
    cancelButtonText: 'Cancel',
  },
};

export const manifestData = {
  keysToInclude: ['study_code', 'subject_id', 'file_name', 'file_id', 'md5sum'],
  header: ['Study Code', 'Case ID', 'File Name', 'File ID', 'Md5sum', 'User Comments'],
};

// --------------- GraphQL query - Retrieve selected cases info --------------
export const GET_MY_CART_DATA_QUERY = gql`
query filesInList($file_ids: [String], $offset: Int = 0, $first: Int = 10, $order_by:String ="file_name", $sort_direction:String="asc") {
    filesInList(file_ids: $file_ids, offset: $offset,first: $first, order_by: $order_by, sort_direction: $sort_direction) {
        study_code
        subject_id
        file_name
        file_type
        association
        file_description
        file_format
        file_size
        file_id
        md5sum
    }
}`;

// --------------- File table configuration --------------

export const table = {
  dataField: 'filesInList',
  // Value must be one of the 'dataField's in "columns"
  defaultSortField: 'file_name',
  // 'asc' or 'desc'
  api: GET_MY_CART_DATA_QUERY,
  defaultSortDirection: 'asc',
  paginationAPIField: 'filesInList',
  tableDownloadCSV: customMyFilesTabDownloadCSV,
  columns: [
    {
      dataField: 'file_name',
      header: 'File Name',
      display: true,
    },
    {
      dataField: 'file_type',
      header: 'File Type',
      display: true,
    },
    {
      dataField: 'association',
      header: 'Association',
      display: true,
    },
    {
      dataField: 'file_description',
      header: 'Description',
      display: true,
    },
    {
      dataField: 'file_format',
      header: 'Format',
    },
    {
      dataField: 'file_size',
      header: 'Size',
      // set formatBytes to true to display file size (in bytes) in a more human readable format
      formatBytes: true,
      display: true,
    },
    {
      dataField: 'subject_id',
      header: 'Case ID',
      display: true,
    },
    {
      dataField: 'study_code',
      header: 'Study Code',
      display: true,
      tooltipText: 'sort',
    },
    {
      dataField: 'file_id',
      header: 'UUID',
      display: false,
      tooltipText: 'sort',
    },
    {
      dataField: 'md5sum',
      header: 'Md5Sum',
      display: false,
      tooltipText: 'sort',
    },
  ],
  tableMsg: {
    noMatch: 'No Matching Records Found',
  },
};

// --------------- File table configuration --------------

export const tableConfig = {
  dataField: 'filesInList',
  // Value must be one of the 'dataField's in "columns"
  defaultSortField: 'file_name',
  // 'asc' or 'desc'
  api: GET_MY_CART_DATA_QUERY,
  defaultSortDirection: 'asc',
  paginationAPIField: 'filesInList',
  tableDownloadCSV: customMyFilesTabDownloadCSV,
  columns: [
    {
      dataField: 'file_name',
      header: 'File Name',
      display: true,
      tooltipText: 'sort',
    },
    {
      dataField: 'file_type',
      header: 'File Type',
      display: true,
      tooltipText: 'sort',
    },
    {
      dataField: 'association',
      header: 'Association',
      display: true,
      tooltipText: 'sort',
    },
    {
      dataField: 'file_description',
      header: 'Description',
      display: true,
      tooltipText: 'sort',
    },
    {
      dataField: 'file_format',
      header: 'Format',
      display: true,
      tooltipText: 'sort',
    },
    {
      dataField: 'file_size',
      header: 'Size',
      // set formatBytes to true to display file size (in bytes) in a more human readable format
      formatBytes: true,
      display: true,
      dataFormatType: dataFormatTypes.FORMAT_BYTES,
      cellType: cellTypes.FORMAT_DATA,
      tooltipText: 'sort',
    },
    {
      dataField: 'subject_id',
      header: 'Case ID',
      display: true,
      tooltipText: 'sort',
    },
    {
      dataField: 'study_code',
      header: 'Study Code',
      display: true,
      tooltipText: 'sort',
    },
    {
      dataField: 'file_id',
      header: 'UUID',
      display: false,
      tooltipText: 'sort',
    },
    {
      dataField: 'md5sum',
      header: 'Md5Sum',
      display: false,
      tooltipText: 'sort',
    },
    {
      cellType: cellTypes.DELETE,
      headerType: cellTypes.DELETE,
      display: true,
    },
  ],
  tableMsg: {
    noMatch: 'No Matching Records Found',
  },
};
