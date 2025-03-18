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
import { downloadData } from '../util/downloadTable';

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

  const client = useApolloClient();

  function cleanData(result) {
    function hasHTMLTags(str) {
      const htmlTagPattern = /<\/?[a-z][\s\S]*>/i; // Regex to match HTML tags
      return htmlTagPattern.test(str);
    }
    const cleanedResult = result.map((res) => {
      const newObj = {};
      Object.keys(res).forEach((key) => {
        if (hasHTMLTags(res[key])) {
          const div = document.createElement('div');
          div.innerHTML = res[key];
          newObj[key] = div.textContent || div.innerText || res[key];
        } else {
          newObj[key] = res[key];
        }
      });
      return newObj;
    });
    return cleanedResult;
  }

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
        first: 10000,
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

    downloadData(cleanData(result), table, table.downloadFileName, 'csv');
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
        first: 10000,
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
    downloadData(cleanData(result), table, table.downloadFileName, 'json');
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
      width: '60px',
      height: '25px',
      marginTop: '8px',
      paddingLeft: '5px',
      border: '0.75px solid #606060',
      borderRadius: '5px',
      display: 'inline-block',
      position: 'relative',
      alignSelf: 'center',
    },
    dropdownList: {
      display: 'block',
      position: 'absolute',
      width: '60px',
      marginTop: '3px',
      marginLeft: '-5px',
      overflow: 'auto',
      zIndex: '20',
      border: '1.5px solid #41545E',
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
        background: '#D7D7D7',
        cursor: 'pointer',
      },
    },
    arrowdownIcon: {
      marginLeft: '5px',
      fill: '#606060',
    },
    arrowdownIconDisabled: {
      marginLeft: '5px',
      fill: '#00000042',
    },
  });

  const classes = useStyles();

  return (
    <div className={classes.dropdown}>

      <Tooltip title={table.downloadButtonTooltipText || 'Download filtered results'}>
        {
          count !== 0
            ? (
              <IconButton onClick={handleClickButton} style={{ padding: '0' }}>
                <CloudDownload />
                <KeyboardArrowDownOutlinedIcon className={classes.arrowdownIcon} />
              </IconButton>
            )
            : (
              <IconButton disabled>
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
