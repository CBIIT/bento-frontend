import React from 'react';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';

const theme = {
  overrides: {
    Mui: {
      '&$expanded': {
        margin: '0px 0px',
      },
      checked: {
        color: 'red',
      },
    },
    MuiAccordionDetails: {
      root: {
        padding: '0px 1px 0px',
      },
    },
    MuiAccordion: {
      root: {
        '&$expanded': {
          margin: 'auto',
        },
      },
    },
    MuiAccordionSummary: {
      content: {
        margin: '0',
      },
    },
    MuiList: {
      padding: {
        paddingTop: '0',
        paddingBottom: '0',
      },
    },
    MuiCheckbox: {
      colorSecondary: {
        '&:first-child': {
          color: '#000000',
        },
      },
    },
    MuiListItem: {
      root: {
        '&.casesCheckedEven': {
          backgroundColor: '#e8f7dc',
        },
        '&.casesCheckedOdd': {
          backgroundColor: '#f5FDEE',
        },
        '&.samplesCheckedEven': {
          backgroundColor: '#C9EBF7',
        },
        '&.samplesCheckedOdd': {
          backgroundColor: '#E8F8FE',
        },
        '&.filesCheckedEven': {
          backgroundColor: '#FBE3FB',
        },
        '&.filesCheckedOdd': {
          backgroundColor: '#FFF2FF',
        },
      },
    },
    MuiSvgIcon: {
      root: {
        '&.casesCheckedIcon': {
          color: '#10a075',
        },
        '&.samplesCheckedIcon': {
          color: '#10beff',
        },
        '&.filesCheckedIcon': {
          color: '#e636e4',
        },
      },
    },
    MuiTypography: {
      root: {
        '&.casesSubjects': {
          color: '#10a075',
          fontSize: '12px',
          fontFamily: 'Nunito',
          marginRight: '0px',
        },
        '&.samplesSubjects': {
          color: '#10beff',
          fontSize: '12px',
          fontFamily: 'Nunito',
          marginRight: '0px',
        },
        '&.filesSubjects': {
          color: '#e636e4',
          fontSize: '12px',
          fontFamily: 'Nunito',
          marginRight: '0px',
        },
      },
    },
    MuiDivider: {
      middle: {
        marginLeft: '0px',
        marginRight: '0px',
      },
      root: {
        height: '5px',
        '&.divider0': {
          backgroundColor: '#0d8461',
        },
        '&.divider1': {
          backgroundColor: '#10beff',
        },
        '&.divider2': {
          backgroundColor: '#e636e4',
        },
      },
    },
    checkboxRoot: {
      color: 'inherit',
      '&$checked': {
        color: '#8DCAFF',
      },
    },
  },
};

export default ({
  children,
}) => {
  const computedTheme = createTheme(theme);
  return (
    <ThemeProvider theme={computedTheme}>
      {children}
    </ThemeProvider>
  );
};
