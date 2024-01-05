import React, { useState } from 'react';
import {
  Button,
  IconButton,
  Link,
  Tooltip,
} from '@material-ui/core';
import CopyIcon from '../assets/CopyIcon.svg';

const QueryUrl = ({
  classes,
  filterItems,
  localFind,
  rootPath,
}) => {
  const [expand, setExpand] = useState(false);
  const toggleExpand = () => setExpand(!expand);

  const { autocomplete = [], upload } = localFind;

  const pathFilterParams = filterItems.reduce((acc, item) => {
    const { datafield, items = [] } = item;
    acc[datafield] = items;
    return acc;
  }, {});

  const query = JSON.stringify({
    ...pathFilterParams,
    autocomplete,
    upload,
  });
  const url = encodeURI(rootPath.concat(query));

  const copyUrl = async () => {
    await navigator.clipboard.writeText(url);
  };

  return (
    <div className={classes.urlContainer}>
      <Button
        onClick={toggleExpand}
        className={classes.viewLinkToggleBtn}
      >
        { (expand) ? 'Hide Query URL' : 'Show Query URL'}
      </Button>
      {
        (expand) && (
          <>
            <Link
              target="_blank"
              href={url}
              className={classes.link}
            >
              <p className={classes.viewLink}>
                {url}
              </p>
            </Link>
            <Tooltip
              arrow
              title="Copy to Clipboard"
            >
              <IconButton onClick={copyUrl} className={classes.copyIconBtn}>
                <img src={CopyIcon} alt="copy icon" />
              </IconButton>
            </Tooltip>
          </>
        )
      }
    </div>
  );
};

export default QueryUrl;
