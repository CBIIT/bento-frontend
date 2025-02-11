import styled from '@emotion/styled';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

export const SearchTextInput = styled(TextField)({
  background: '#ffffff',
  borderRadius: '20px',
  marginBottom: '0px',
  '& div.MuiInputBase-root': {
    paddingRight: '0px',
  },
  '& input': {
    borderRadius: '20px',
    background: '#ffffff',
    padding: '0px 5px',
    marginLeft: '5px',
  },
  '& input:-internal-autofill-selected': {
    background: '#ffffff',
  }
});

export const MuiClearIcon = styled(ClearIcon)({
  "&:hover": {
    backgroundColor: "#ffffff",
  },
});

export const ClearButton = styled(IconButton)({
  padding: '15px 15px 15px 0px'
});

export const ClearInputAdornment = styled(InputAdornment)({
  width: '50px',
});

export const Divider = styled('i')({
  width: '2px',
  color: '#0D71A3',
  borderLeft: '1px solid ',
  margin: '0px 2px 0px 2px',
  height: '25px'
});

export const SearchButton = styled(IconButton)({
  padding: '5px',
  "&:hover": {
    backgroundColor: "#f1f1f1",
  },
});
