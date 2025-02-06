import styled from '@emotion/styled';
import { Box, Button, Checkbox, Divider, ListItem } from '@mui/material';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import MuiMenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Paper from '@mui/material/Paper';
import Grow from '@mui/material/Grow';

export const StyledListItem = styled(ListItem)({
  color: '#165F83',
  padding: '5px 0px'
});

export const StyledMuiDivider = styled(Divider)(
  ({ checkboxItem }) => ({
    backgroundColor: checkboxItem.isChecked ? "#FFFFFF" : "#B1B1B1",
    margin: "0px",
  })
);

export const StyledCheckBoxIcon = styled(CheckBoxIcon)({
  fontSize: 18,
});

export const StyledMuiCheckBox = styled(Checkbox)(
  ({ checkBoxBorderColor }) => ({
    color: checkBoxBorderColor || "#137fbe",
    '& svg':{
      fontSize: '18px',
    }
  })
);

export const StyledLabelDiv = styled('div')({
  color: "#323232",
  fontFamily: "Nunito",
  fontSize: "14px",
  fontWeight: "200",
});

export const StyledLabelSpan = styled('span')({

});

export const StyledCountDiv = styled('div')({
  color: "#323232",
  fontFamily: "Nunito",
  fontSize: "14px",
  marginRight: "0px",
});

export const StyledCountSpan = styled('span')({

});

export const StyledLabelAndCount = styled(Box)({
  width: '100%',
  padding: '8px 10px 8px 0px',
  display: 'flex',
  justifyContent: 'space-between',
  p: 1,
  m: 1,
  bgcolor: 'background.paper',
});
