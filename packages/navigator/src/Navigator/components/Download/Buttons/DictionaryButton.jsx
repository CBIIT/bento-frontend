import React from 'react';
import { saveAs } from 'file-saver';
import {
  Button,
  withStyles,
  createTheme,
  MuiThemeProvider,
  Menu,
  MenuItem,
  ListItemText,
  List,
} from '@material-ui/core';
import { pdf } from '@react-pdf/renderer';
import { cloneDeep } from 'lodash';
import LandscapePDFDoc from '../../PDF/landscape/Pdf';
import GenericDownloadIcon from '../icons/icon_download.svg';
import { generateNodeJSON, generateNodeTSV, getDictionaryFilename } from '../../../utils/Utils';

const theme = createTheme({
  overrides: {
    MuiButton: {
      root: {
        minWidth: '35px',
        paddingRight: '10px',
        '&:hover': {
          backgroundColor: 'none',
        },
      },
    },
  },
});

const StyledButton = withStyles({
  root: {
    marginLeft: "8px",
    background: "#0A4A6D !important",
    padding: "8px",
    color: "#fff",
    fontFamily: "Nunito",
    fontSize: "13px",
    fontWeight: 500,
    borderRadius: "6px",
    textTransform: "none",
  },
})(Button);

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #0A4A6D',
    borderRadius: "6px",
    width: "192px",
  },
  list: {
    paddingTop: "0 !important",
    paddingBottom: "0 !important",
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles({
  root: {
    display: 'flex',
    padding: "4px 10px",
    margin: "0",
  },
})(MenuItem);

const StyledListItemText = withStyles({
  root: {
    padding: "10px",
    paddingLeft: "6px",
    display: 'flex',
    alignItems: 'center',
    gap: "6px",
  },
  primary: {
    fontFamily: "Nunito",
    fontSize: "13px",
    fontWeight: 500,
    color: "#0A4A6D",
    lineHeight: 0,
  },
  secondary: {
    fontFamily: "Nunito",
    color: "#0A4A6D",
    fontSize: "11px",
    fontWeight: 400,
    lineHeight: 0,
  },
})(ListItemText);

const DictionaryButton = ({
  classes,
  config,
  documentData,
  modelVersion,
  pdfDownloadConfig,
}) => {
  // const modelVersion = useSelector(state => state.versionInfo && state.versionInfo.modelVersion);
  // const pdfDownloadConfig = useSelector(state => state.ddgraph && state.ddgraph.pdfDownloadConfig);
  
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const generatePdfDocument = async (object, onlyRequired, fileName) => {
    const node = cloneDeep(object);
    for (let key in object.properties) {
      if (onlyRequired && !object?.required?.includes(key)) {
        delete node.properties[key];
      }
    }

    const blob = await pdf((<LandscapePDFDoc nodes={[node]} icon={config.catagoryIcon}
      pdfDownloadConfig={pdfDownloadConfig} />
    )).toBlob();
    saveAs(blob, `${fileName}.pdf`)
  };

  const download = (type, onlyRequired) => {
    const fileName = getDictionaryFilename(pdfDownloadConfig.prefix, documentData.title, onlyRequired, modelVersion);
    if (type === 'pdf') {
      generatePdfDocument(documentData, onlyRequired, fileName);
    } else if (type === "tsv") {
      const tsv = generateNodeTSV(documentData, true, onlyRequired);
      const exportData = new Blob([tsv], { type: 'data:text/tab-separated-values' });
      saveAs(exportData, `${fileName}.tsv`);
    } else if (type === "json") {
      const json = generateNodeJSON(documentData, onlyRequired);
      const exportData = new Blob([JSON.stringify(json, null, 2)], { type: 'data:application/json' });
      saveAs(exportData, `${fileName}.json`);
    }
    handleClose();
  };

  return (
    <MuiThemeProvider theme={theme}>
      <StyledButton
        type="button"
        aria-controls="dictionary-options-menu"
        aria-haspopup="true"
        variant="contained"
        color="primary"
        endIcon={<img className={classes.icon} src={GenericDownloadIcon} alt="Download" />}
        onClick={handleClick}
        disableElevation
      >
        Data Dictionary
      </StyledButton>
      <StyledMenu
        id="dictionary-options-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <List component="div" disablePadding>
          <StyledMenuItem onClick={() => download('pdf', false)}>
            <StyledListItemText primary="All Properties" secondary="(PDF)" />
          </StyledMenuItem>
          <StyledMenuItem onClick={() => download('json', false)}>
            <StyledListItemText primary="All Properties" secondary="(JSON)" />
          </StyledMenuItem>
          <StyledMenuItem onClick={() => download('tsv', false)}>
            <StyledListItemText primary="All Properties" secondary="(TSV)" />
          </StyledMenuItem>
          <StyledMenuItem onClick={() => download('pdf', true)}>
            <StyledListItemText primary="Required Properties" secondary="(PDF)" />
          </StyledMenuItem>
          <StyledMenuItem onClick={() => download('json', true)}>
            <StyledListItemText primary="Required Properties" secondary="(JSON)" />
          </StyledMenuItem>
          <StyledMenuItem onClick={() => download('tsv', true)}>
            <StyledListItemText primary="Required Properties" secondary="(TSV)" />
          </StyledMenuItem>
        </List>
      </StyledMenu>
    </MuiThemeProvider>
  );
};

const styles = () => ({
  icon: {
    width: "24px",
    paddingRight: "7px",
  },
});

export default withStyles(styles)(DictionaryButton);
