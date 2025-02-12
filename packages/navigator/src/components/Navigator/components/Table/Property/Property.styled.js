/* eslint-disable guard-for-in */
/* eslint-disable no-var */
/* eslint-disable vars-on-top */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-param-reassign */
/* eslint-disable space-infix-ops */
/* eslint-disable prefer-template */
/* eslint-disable import/no-unresolved */
/* eslint-disable quotes */
/* eslint-disable no-undef */
/* eslint-disable no-shadow */
/* eslint-disable semi */
/* eslint-disable object-curly-spacing */
/* eslint-disable import/no-cycle */
/* eslint-disable no-multiple-empty-lines */
/* eslint-disable indent */
/* eslint-disable object-shorthand */
/* eslint-disable comma-dangle */
/* eslint-disable import/order */
/* eslint-disable no-trailing-spaces */
/* eslint-disable react/jsx-indent */
/* eslint-disable object-curly-newline */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable arrow-spacing */
/* eslint-disable keyword-spacing */
/* eslint-disable object-curly-newline */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-case-declarations */
/* eslint-disable space-before-blocks */
/* eslint-disable arrow-parens */
/* eslint-disable function-paren-newline */
/* eslint-disable prefer-const */
/* eslint-disable max-len */
/* eslint-disable eqeqeq */
/* eslint-disable spaced-comment */
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
