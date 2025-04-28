import styled from '@emotion/styled';
import { Button } from '@mui/material';

export const ActionLayer = styled('div')(
  ({ overlayNodeId }) => {
    const zIndex = (overlayNodeId) ? 0 : 1;
    return {
      position: 'absolute',
      left: '420px',
      zIndex,
    };
  },
);

export const ClearButton = styled(Button)({
  '&.MuiButtonBase-root': {
    marginLeft: '25px',
    marginTop: '15px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '600',
    height: '40px',
    padding: '1px 20px',
    textTransform: 'none',
    color: ' #fff',
    backgroundColor: '#B54717',
    '&:hover': {
      backgroundColor: '#B54717',
    },
  },
});
