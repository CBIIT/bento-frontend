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
  buttonConfig,
}) => {
  const [listDisplay, setListDisplay] = useState('none');
  const [isDownloading, setIsDownloading] = useState(false);
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
  const downloadLimit = buttonConfig?.downloadLimit || 5000;

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

  // --- retry helper (recursive ESLINT no await-in-loop — we want this to be sequential) ---
  async function retry(fn, retries = 3, attempt = 1) {
    try {
      return await fn();
    } catch (err) {
      if (attempt >= retries) throw err;
      return retry(fn, retries, attempt + 1);
    }
  }

  async function fetchCountWithRetry() {
    const { statsQuery, statsQueryName, statsField } = table;
    return retry(() => client.query({
      query: statsQuery,
      variables: queryVariables,
    }).then(({ data }) => {
      const queryResponse = data[statsQueryName];
      return {
        totalCount: queryResponse[statsField],
        pageSize: downloadLimit || queryResponse.pageSize,
      };
    }));
  }

  async function fetchDownloadWithRetry(variables) {
    const { query, paginationAPIField } = table;
    return retry(() => client.query({
      query,
      variables,
    }).then((response) => {
      if (paginationAPIField && response && response.data) {
        return response.data[paginationAPIField];
      }
      return response.data;
    }));
  }

  async function downloadFile(type) {
    setIsDownloading(true);
    try {
      const { totalCount, pageSize } = await fetchCountWithRetry();

      let completedEntries = 0;
      let allData = [];
      while (completedEntries < totalCount) {
        const variables = {
          ...queryVariables,
          offset: Math.floor(completedEntries / pageSize) * pageSize,
          first: Math.min(pageSize, totalCount - completedEntries),
          order_by: table.sortBy,
          sort_direction: table.sortOrder,
        };
        // eslint-disable-next-line no-await-in-loop
        const data = await fetchDownloadWithRetry(variables);
        allData = allData.concat(data);
        completedEntries += data.length;
      }
      downloadData(cleanData(allData), table, table.downloadFileName, type);
    } catch (error) {
      console.error('Error fetching count:', error);
    } finally {
      setIsDownloading(false);
    }
  }

  async function downloadFileParallel(type, concurrency = 5) {
    setIsDownloading(true);
    try {
      const { totalCount, pageSize } = await fetchCountWithRetry();
      const totalChunks = Math.ceil(totalCount / pageSize);
      const results = new Array(totalChunks);

      for (let i = 0; i < totalChunks; i += concurrency) {
        const batch = [];

        for (let j = i; j < Math.min(i + concurrency, totalChunks); j += 1) {
          const offset = j * pageSize;
          const first = Math.min(pageSize, totalCount - offset);

          const variables = {
            ...queryVariables,
            offset,
            first,
            order_by: table.sortBy,
            sort_direction: table.sortOrder,
          };

          batch.push(
            fetchDownloadWithRetry(variables).then((data) => ({ index: j, data })),
          );
        }

        // eslint-disable-next-line no-await-in-loop
        const batchResults = await Promise.all(batch);
        batchResults.forEach(({ index, data }) => {
          results[index] = data;
        });
      }

      const allData = results.flat();
      downloadData(cleanData(allData), table, table.downloadFileName, type);
    } catch (error) {
      console.error('Error fetching count:', error);
    } finally {
      setIsDownloading(false);
    }
  }

  const downloadTableCSV = useCallback(() => {
    if (isDownloading) return;
    if (table.asyncDownload) {
      downloadFileParallel('csv');
    } else {
      downloadFile('csv');
    }
    setListDisplay('none');
  }, [queryVariables, table, isDownloading]);

  const downloadTableJson = useCallback(() => {
    if (isDownloading) return;
    if (table.asyncDownload) {
      downloadFileParallel('json');
    } else {
      downloadFile('json');
    }
    setListDisplay('none');
  }, [queryVariables, table, isDownloading]);

  const handleClickButton = () => {
    if (isDownloading) return;
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
    <div className={classes.dropdown} style={isDownloading ? { cursor: 'wait' } : {}}>

      <Tooltip title={isDownloading ? 'Download in progress...' : (table.downloadButtonTooltipText || 'Download filtered results')}>
        {
          count !== 0 && !isDownloading
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
