import styled from '@emotion/styled';
import {
  Box,
  Checkbox,
  Divider,
  ListItem,
} from '@mui/material';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

export const StyledListItem = styled(ListItem)(
  ({ isChecked, matchedNodeCount }) => ({
    background: isChecked && (matchedNodeCount > 0)
      ? '#e3f4fd' : (isChecked && matchedNodeCount === 0) ? '#EAEAEA' : '#fff',
    color: '#165F83',
    padding: '5px 0px',
    '& :hover': {
      cursor: 'pointer',
      background: 'transparent',
    },
  }),
);

export const StyledMuiDivider = styled(Divider)(
  ({ checkboxItem }) => ({
    backgroundColor: checkboxItem.isChecked ? '#B1B1B1' : '#B1B1B1',
    margin: '0px',
  }),
);

export const StyledCheckBoxIcon = styled(CheckBoxIcon)({
  fontSize: 18,
});

export const StyledMuiCheckBox = styled(Checkbox)(
  ({ checkBoxBorderColor, matchedNodeCount }) => ({
    color: (matchedNodeCount === 0) ? '#EAEAEA'
      : (checkBoxBorderColor || '#137fbe'),
    '& svg': {
      fontSize: '18px',
      color: (matchedNodeCount === 0) ? '#EAEAEA'
        : (checkBoxBorderColor || '#137fbe'),
    },
  }),
);

export const StyledLabelDiv = styled('div')({
  color: '#323232',
  fontFamily: 'Nunito',
  fontSize: '14px',
  fontWeight: '200',
});

export const StyledLabelSpan = styled('span')({

});

export const StyledCountDiv = styled('div')({
  color: '#323232',
  fontFamily: 'Nunito',
  fontSize: '14px',
  marginRight: '0px',
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
