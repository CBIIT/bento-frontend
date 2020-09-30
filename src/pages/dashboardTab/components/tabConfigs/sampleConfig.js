import React from 'react';
import { Link } from 'react-router-dom';

const tableStyle = (ratio = 1) => ({
  width: (((document.documentElement.clientWidth * 0.6) / 10) * ratio),
  overflow: 'hidden',
  wordBreak: 'break-word',
  maxWidth: (((document.documentElement.clientWidth * 0.6) / 10) * ratio),
  minWidth: '160px',
}
);

export function SampleColumns(classes) {
  return ([
    {
      name: 'sample_id',
      label: 'Sample ID',
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
      name: 'sample_site',
      label: 'Sample Site',
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
      name: 'summarized_sample_type',
      label: 'Sample Type',
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
      name: 'specific_sample_pathology',
      label: 'Pathology/Morphology',
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
      name: 'tumor_grade',
      label: 'Tumor Grade',
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
      name: 'sample_chronology',
      label: 'Sample Chronology',
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
      name: 'percentage_tumor',
      label: 'Percentage Tumor',
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
      name: 'necropsy_sample',
      label: 'Necropsy Sample',
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
      name: 'sample_preservation',
      label: 'Sample Preservation',
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
  ]);
}

/*  To check if this row is selectable or not.
    I want the system to visually communicate ("flag") which of
    the samples being displayed have already had all of their files added to the cart.

    @param  data  row of data from sample tab
    @param  cartData, list of fileIDs
    @output  boolean true-> selectable
*/
// eslint-disable-next-line no-unused-vars
export function SampleDisableRowSelection(data, cartData) {
  // if (cartData.length > 0) {
  //   if (data.files && data.files.length > 0) {
  //     // check each files of cases
  //     const isAllfileBeSelected = _.cloneDeep(data.files).map((f) => {
  //       if (cartData.includes(f.uuid)) {
  //         return true;
  //       }
  //       return false;
  //     });

  //     // if one/more file(s) is not included in the cart, this row is selectable
  //     if (isAllfileBeSelected.includes(false)) {
  //       return true;
  //     }
  //     return false;
  //   }
  //   return false;
  // }
  return true;
}
/* on row select event
    @param  data  data for initial the table  sample -> [files]
    @param  allRowsSelected : selected rows
    @output [f.uuid]
*/
export function SampleOnRowsSelect(data, allRowsSelected) {
  // use reduce to combine all the files' id into single array
  return allRowsSelected.reduce((accumulator, currentValue) => {
    const { files } = data[currentValue.dataIndex];
    // check if file
    if (files && files.length > 0) {
      return accumulator.concat(files.map((f) => f.uuid));
    }
    return accumulator;
  }, []);
}
