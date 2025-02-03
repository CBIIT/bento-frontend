import styled from '@emotion/styled';
import { TableCell } from '@mui/material';

export const PropertyKeyIcon = styled('img')({
  width: "25px",
  marginLeft: "8px",
  paddingTop: "5px",
});

export const EnumCellContainer = styled('div')({
  display: "flex",
  flexDirection: "column" 
});

export const InclusionCellView = styled(TableCell)(
  ({ inclusion }) => {
    if (inclusion === 'required') {
      return {
        color: "#ff5a20",
        fontSize: "13px",
        fontWeight: "900",
        borderBottom: 'none',
      }
    }
    return {
      borderBottom: 'none',
    };
  }
);

export const PropertyName = styled(TableCell)(
  ({ isKey }) => ({
  color: isKey && '#0d71a3',
  display: 'inline-block',
  minWidth: '220px',
  fontWeight: isKey ? '700' : '400',
  borderBottom: 'none',
}));

export const ListCell = styled(TableCell)({
  borderBottom: 'none',
});

export const TypeCell = styled(TableCell)({
  borderBottom: 'none',
});

export const MuiCellView =  styled(TableCell)({
  borderBottom: 'none',
});