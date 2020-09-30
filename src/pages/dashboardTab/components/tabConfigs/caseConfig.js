/* eslint-disable */
import React from 'react';
import { Link } from 'react-router-dom';
import { addSubjects } from '../../../fileCentricCart/store/cartAction';
import { useDispatch } from 'react-redux';

const tableStyle = (ratio = 1) => ({
  width: (((document.documentElement.clientWidth * 0.6) / 10) * ratio),
  overflow: 'hidden',
  wordBreak: 'break-word',
  maxWidth: (((document.documentElement.clientWidth * 0.6) / 10) * ratio),
  minWidth: '160px',
}
);

export function caseColumns(classes) {
  return ([
    {
      name: 'subject_id',
      label: 'Case ID',
      options: {
        filter: false,
        sortDirection: 'asc',
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
      name: 'program',
      label: 'Program Code',
      options: {
        filter: false,
        customBodyRender: (value) => (
          <div className="mui_td" style={tableStyle(0.6)}>

            <Link to={`/study/${value}`} className={classes.link}>{value}</Link>

          </div>
        ),
      },
    },
    {
      name: 'program_id',
      label: 'Program ID',
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
      name: 'study_acronym',
      label: 'Arm',
      options: {
        filter: false,
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
      name: 'diagnosis',
      label: 'Diagnosis',
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
      name: 'recurrence_score',
      label: 'Recurrence Score',
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
      name: 'tumor_size',
      label: 'Tumor Size (cm)',
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
      name: 'er_status',
      label: 'ER Status',
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
      name: 'pr_status',
      label: 'PR Status',
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
      name: 'age_at_index',
      label: 'Age (years)',
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
      name: 'survival_time',
      label: 'Survival (days)',
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
      name: 'cohort_description',
      label: 'Cohort',
      options: {
        filter: false,
        customBodyRender: (value) => (
          <div className="mui_td" style={tableStyle(1)}>
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
export function caseDisableRowSelection(data, cartData) {
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
export function caseOnRowsSelect(data, allRowsSelected) {
  // use reduce to combine all the files' id into single array
  return allRowsSelected.reduce((accumulator, currentValue) => {
    const { files } = data[currentValue.dataIndex];
    // check if file
    if (files && files.length > 0) {
      return accumulator.concat(files.map((f) => f.file_id));
    }
    return accumulator;
  }, []);
}

export function caseTabExport(selectedFileIDs) {
    const dispatch = useDispatch();
    dispatch(addSubjects({ subjectIds: selectedFileIDs }));
  return null;
}
