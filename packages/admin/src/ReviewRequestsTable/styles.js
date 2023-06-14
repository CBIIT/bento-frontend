/**
 * Review Requests Table styles
 */
export default () => ({
  customDataTable: {
    '& .MuiTableFooter-root': {
      borderBottom: '3px solid #42779A',
    },
    '& .MuiTableCell-head:first-child, .MuiTableCell-body:first-child': {
      paddingLeft: '37px',
    },
    '& .MuiTableCell-head:last-child': {
      paddingRight: '37px',
      textAlign: 'center',
    },
    '& .MuiTableCell-body:last-child': {
      paddingRight: '37px',
    },
    '& .MuiTableRow-root': {
      height: '54px',
    },
  },
});
