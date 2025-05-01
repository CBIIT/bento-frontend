import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
} from 'react';
import { useApolloClient } from '@apollo/client';
import {
  IconButton,
  Tooltip,
  makeStyles,
} from '@material-ui/core';
import KeyboardArrowDownOutlinedIcon from '@material-ui/icons/KeyboardArrowDownOutlined';
import { CloudDownload } from '@material-ui/icons';
import { downloadCSV, downloadJson } from '../util/downloadTable';

// const downloadButtonStyle = {
//   color: '#d1d2d3',
//   marginTop: '7px',
// };

const DownloadButton = ({
  count,
  queryVariables,
  table,
}) => {
  const [listDisplay, setListDisplay] = useState('none');
  const dropdownSelection = useRef(null);
  const useOutsideAlerter = (ref) => {
    useEffect(() => {
      function handleClickOutside(event) {
        if (!(event.target.getAttribute('id') && event.target.getAttribute('id').includes('dropdownListItem'))) {
          setListDisplay('none');
        }
      }
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [ref]);
  };
  useOutsideAlerter(dropdownSelection);

  if (table.paginationAPIField === 'filesInList') {
    return <></>;
  }
  // if (count === 0) {
  //   return <CloudDownload className="disableButton" style={downloadButtonStyle} />;
  // }

  const client = useApolloClient();

  async function downloadSCSVFile() {
    const {
      query,
      paginationAPIField,
    } = table;

    const result = await client.query({
      query,
      variables: {
        ...queryVariables,
        page: 0,
        first: 200000,
        order_by: table.sortBy,
        sort_direction: table.sortOrder,
      },
    })
      .then((response) => {
        if (paginationAPIField && response && response.data) {
          return response.data[paginationAPIField];
        }
        return response.data;
      });
    downloadCSV(result, table, table.downloadFileName);
  }

  async function downloadJsonFile() {
    const {
      query,
      paginationAPIField,
    } = table;

    const result = await client.query({
      query,
      variables: {
        ...queryVariables,
        page: 0,
        first: 200000,
        order_by: table.sortBy,
        sort_direction: table.sortOrder,
      },
    })
      .then((response) => {
        if (paginationAPIField && response && response.data) {
          return response.data[paginationAPIField];
        }
        return response.data;
      });
    downloadJson(result, table, table.downloadFileName);
  }

  const downloadTableCSV = useCallback(() => {
    downloadSCSVFile();
    setListDisplay('none');
  }, [queryVariables, table]);

  const downloadTableJson = useCallback(() => {
    downloadJsonFile();
    setListDisplay('none');
  }, [queryVariables, table]);

  const handleClickButton = () => {
    if (listDisplay === 'none') {
      setListDisplay('block');
    } else {
      setListDisplay('none');
    }
  };

  const useStyles = makeStyles({
    dropdown: {
      width: '48px',
      height: '36px',
      paddingLeft: '5px',
      border: ` ${listDisplay === 'none' ? '0.75px solid #606060' : '1.5px solid #5666BD'}`,
      borderRadius: '5px',
      display: 'inline-block',
      position: 'relative',
      marginTop: '2px',
    },
    dropdownList: {
      display: 'block',
      position: 'absolute',
      width: '60px',
      top: '38px',
      right: '0.5px',
      overflow: 'auto',
      zIndex: '5',
      border: '1.5px solid #5666BD',
      borderRadius: '5px',
      background: '#ffffff',
    },
    dropdownListItem: {
      padding: '2px 4px',
      font: 'Poppins',
      fontSize: '14px',
      fontWeight: 400,
      lineHeight: '21px',
      '&:hover': {
        background: '#C9CFF4',
        cursor: 'pointer',
      },
    },
    arrowdownIcon: {
      fill: '#606060',
      marginTop: '2px',
    },
    arrowdownIconDisabled: {
      marginLeft: '5px',
      fill: '#00000042',
    },
    tooltip: {
      marginTop: '5px',
    },
  });

  const classes = useStyles();

  return (
    <div className={classes.dropdown}>
      <Tooltip title="Download filtered results" className={classes.tooltip}>
        {
          count !== 0
            ? (
              <IconButton onClick={handleClickButton} style={{ backgroundColor: 'transparent' }}>
                <CloudDownload />
                <KeyboardArrowDownOutlinedIcon className={classes.arrowdownIcon} />
              </IconButton>
            )
            : (
              <IconButton disabled style={{ backgroundColor: 'transparent' }}>
                <CloudDownload />
                <KeyboardArrowDownOutlinedIcon className={classes.arrowdownIconDisabled} />
              </IconButton>
            )
        }
      </Tooltip>
      <div className={classes.dropdownList} style={{ display: listDisplay }}>
        <div id="dropdownListItemCSV" className={classes.dropdownListItem} onClick={downloadTableCSV}>CSV</div>
        <div id="dropdownListItemJSON" className={classes.dropdownListItem} onClick={downloadTableJson}>JSON</div>
      </div>
    </div>
  );
};

export default DownloadButton;
