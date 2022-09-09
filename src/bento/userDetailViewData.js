import { NODE_LEVEL_ACCESS } from './siteWideConfig';
import { nodeName } from './adminData';

export const columnInfo = [
  { name: 'arm', label: NODE_LEVEL_ACCESS ? nodeName : 'Data Commons' },
  { name: 'date', label: 'Request Date' },
  { name: 'date1', label: 'Approved Date' },
];

export const options = {
  selectableRows: false,
  responsive: 'stacked',
  search: false,
  filter: false,
  searchable: false,
  print: false,
  download: false,
  viewColumns: false,
};
