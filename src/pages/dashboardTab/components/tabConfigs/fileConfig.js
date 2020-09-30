import React from 'react';
import { Link } from 'react-router-dom';

const tableStyle = (ratio = 1) => ({
  width: (((document.documentElement.clientWidth * 0.4) / 10) * ratio),
  overflow: 'hidden',
  wordBreak: 'break-word',
  maxWidth: (((document.documentElement.clientWidth * 0.4) / 10) * ratio),
  minWidth: '160px',
}
);

export function FileColumns(classes) {
  return ([
    {
      name: 'file_name',
      label: 'File Name',
      options: {
        filter: false,
        sortDirection: 'asc',
        customBodyRender: (value) => (
          <div className="mui_td" style={tableStyle(1)}>
            {' '}
            {value}
            {' '}
          </div>
        ),
      },
    },
    {
      name: 'file_type',
      label: 'File Type',
      options: {
        filter: false,
        customBodyRender: (value) => (
          <div className="mui_td" style={tableStyle(2)}>
            {' '}
            {value}
            {' '}
          </div>
        ),
      },
    },
    {
      name: 'parent',
      label: 'Association',
      options: {
        filter: false,
        customBodyRender: (value) => (
          <div className="mui_td" style={tableStyle(0.5)}>
            {' '}
            {value}
            {' '}
          </div>
        ),
      },
    },
    {
      name: 'file_description',
      label: 'Description',
      options: {
        filter: false,
        customBodyRender: (value) => (
          <div className="mui_td" style={tableStyle(0.5)}>
            {' '}
            {value}
            {' '}
          </div>
        ),
      },
    },
    {
      name: 'file_format',
      label: 'Format',
      options: {
        filter: false,
        customBodyRender: (value) => (
          <div className="mui_td" style={tableStyle(0.5)}>
            {' '}
            {value}
            {' '}
          </div>
        ),
      },
    },
    {
      name: 'file_size',
      label: 'Size',
      options: {
        filter: false,
        customBodyRender: (value) => (
          <div className="mui_td" style={tableStyle(0.8)}>
            {' '}
            {value}
            {' '}
          </div>
        ),
      },
    },
    {
      name: 'case_id',
      label: 'Case ID',
      options: {
        filter: false,
        customBodyRender: (value) => (
          <div className="mui_td" style={tableStyle(0.8)}>
            {' '}
            <Link to={`/case/${value}`} className={classes.link}>{value}</Link>
            {' '}
          </div>
        ),
      },
    },
    {
      name: 'breed',
      label: 'Breed',
      options: {
        filter: false,
        customBodyRender: (value) => (
          <div className="mui_td" style={tableStyle(0.6)}>
            {' '}
            {value}
            {' '}
          </div>
        ),
      },
    },
    {
      name: 'diagnosis',
      label: 'Diagnosis',
      options: {
        filter: false,
        customBodyRender: (value) => (
          <div className="mui_td" style={tableStyle(2.3)}>
            {' '}
            {value}
            {' '}
          </div>
        ),
      },
    },
    {
      name: 'study_code',
      label: 'Study Code',
      options: {
        filter: false,
        customBodyRender: (value) => (
          <div className="mui_td" style={tableStyle(1.8)}>
            {' '}
            {value}
            {' '}
          </div>
        ),
      },
    },
  ]);
}

/* eslint-disable */
/*  To check if this row is selectable or not.
    I want the system to visually communicate ("flag") which of
    the file being displayed have already added to the cart.

    @param  data  row of data from sample tab
    @param  cartData, list of fileIDs
    @output  boolean true-> selectable
*/
// eslint-disable-next-line no-unused-vars
export function FileDisableRowSelection(data, cartData) {
  // if (cartData.length > 0) {
  //   if (cartData.includes(data.uuid)) {
  //     return false;
  //   }
  //   return true;
  // }
  return true;
}

/* on row select event
    @param  data  data for initial the table
    @param  allRowsSelected : selected rows
    @output [f.uuid]
*/

export function FileOnRowsSelect(data, allRowsSelected) {
  return allRowsSelected.map((row) => data[row.dataIndex].uuid);
}



export function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes';

  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(1024));

  return `${parseFloat((bytes / (1024 ** i)).toFixed(dm))} ${sizes[i]}`;
}
