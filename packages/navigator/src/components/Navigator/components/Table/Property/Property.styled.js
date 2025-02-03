import styled from '@emotion/styled';
import { Table, TableHead } from '@mui/material';
import TableRow from '@mui/material/TableRow';

export const TableHeader = styled(TableHead)({
    color: '#606060',
    fontSize: '13px',
    background: '#eef5f7',
    borderTop: '3px solid #adbec4',
    borderBottom: '3px solid #adbec4',
    '& th': {
      fontWeight: '900',
    },
});

export const MuiTable = styled(Table)({
    borderBottom: '1px solid #adbec4',
    padding: '10px 18px 18px 23px',
    backgroundColor: '#fff',
    position: 'relative',
    margin: '0',
    borderCollapse: 'revert',
});

export const MuiTableRow = styled(TableRow)(
  ({ index }) => ({
    backgroundColor: (index % 2 === 0) ? '#f4f5f5' : '#fff',
  })
);
