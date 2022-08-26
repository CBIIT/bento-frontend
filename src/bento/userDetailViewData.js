import { EDIT } from './adminData';

export const getColumnInfo = (removeRenderer, approvedRenderer, accessType) => [
  { name: 'arm', label: 'Arms' },
  { name: 'date', label: 'Request Date' },
  { name: 'date1', label: 'Approved Date' },
  {
    name: 'date2',
    label: 'Approved By',
    options: {
      customBodyRender: approvedRenderer,
    },
  },
  {
    name: 'remove',
    label: 'Remove',
    options: {
      display: (accessType === EDIT),
      customBodyRender: removeRenderer,
    },
  },
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
