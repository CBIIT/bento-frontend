/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable array-callback-return */
/* eslint-disable array-callback-return */
/* eslint-disable semi */
/* eslint-disable comma-dangle */
/* eslint-disable max-len */
/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/jsx-closing-bracket-location */
/* eslint-disable arrow-body-style */
/* eslint-disable consistent-return */
import React from 'react';
import {
  ListItemText,
  withStyles,
  Typography,
} from '@material-ui/core';

function isLink(value) {
  return !!value.CDELink;
}

const wrapLinkInLink = ({ CDELink, CDECode }) => <a target="_blank" href={CDELink}>{CDECode}</a>;

const CDEListComponent = ({
  classes,
  items,
  CDEInfoMatchList,
  isSearchMode,
  highligtSearchText,
}) => {
  const highlightMatchingProperties = (item) => {
    if (isSearchMode && CDEInfoMatchList && CDEInfoMatchList.length > 0) {
      const matchItem = CDEInfoMatchList.map((prop) => {
        if (prop.value === item) {
          return prop;
        }
      }).filter((c) => c);
      if (matchItem.length) {
        return (
          <ListItemText>
            <span className={classes.listItemText}>
              {item.substring}
              {
                highligtSearchText(
                  item,
                  matchItem[0].indices,
                  'data-dictionary-property-table__span',
                )
              }
            </span>
          </ListItemText>
        );
      }
    }
    return (
      <ListItemText
        primary={(
          <Typography className={classes.listItemText}>
            {item}
          </Typography>
        )}
      />
    );
  };

  return (
    <div className={classes.listWrapper}>
      {
        items.map(({ label, value }) => {
          return (
            <div className={classes.listItem}>
              <div style={{
              }}>{label}</div>
              <div>{!isLink(value) ? highlightMatchingProperties(value) : <div>{wrapLinkInLink(value)}</div>}</div>
            </div>
          )
        })
      }
    </div>
  )
};

const styles = () => ({
  listItemText: {
    fontWeight: '300',
    fontSize: '14px',
    whiteSpace: 'pre-wrap',
  },
  listWrapper: {
    // paddingLeft: '380px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  listItem: {
    display: 'flex',
    flexDirection: 'column',
  },
  longText: {
    fontSize: '13px',
    fontWeight: '300',
    marginBottom: '4px',
    lineHeight: '1.3',
    '@media not all and (min-resolution:.001dpcm)': {
      lineHeight: '1',
    },
  },
  listIcon: {
    float: 'left',
    paddingTop: '-5px',
    height: '20px',
    marginTop: '-35px',
  },
  label: {
    paddingLeft: '15px',
    display: 'block',
    fontSize: '14px',
    fontWeight: 300,
    '@media not all and (min-resolution:.001dpcm)': {
      marginBottom: '0px',
    },
  },
  highLightText: {
    color: 'var(--g3-color__highlight-orange)',
    fontWeight: '600',
  },
});

export default withStyles(styles)(CDEListComponent);
