import React from 'react';
import TableFooter from '@material-ui/core/TableFooter';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import { HashRouter, Link } from 'react-router-dom';
import { manipulateLinks, formatBytes } from './helpers';

//  Generate MuiTable's columns.
export function getColumns(
  tableConfig,
  classes,
  data,
  externalLinkIcon,
  linkto = '',
  linkClick,
  DocumentDownloadComponent,
  replaceEmptyValueWith = '',
) {
  const updatedTableWithLinks = manipulateLinks(tableConfig.columns);
  return updatedTableWithLinks.slice(0, 12).map((column, index) => ({
    name: column.dataField,
    label: column.header,
    options: {
      display: typeof (column.display) !== 'undefined' ? column.display : true,
      filter: typeof (column.filter) !== 'undefined' ? column.filter : false,
      customBodyRender: (value, tableMeta) => (
        <div className={classes[`tableCell${index + 1}`]}>
          { value && !column.downloadDocument
            ? (column.internalLink ? (
              <HashRouter>
                <Link
                  className={classes.link}
                  to={`${column.actualLink}${tableMeta.rowData[column.actualLinkId] ? tableMeta.rowData[column.actualLinkId] : ''}`}
                >
                  {value}
                </Link>
              </HashRouter>
            )
              : column.externalLink ? (
                <span className={classes.linkSpan}>
                  <a
                    href={`${column.actualLink}${tableMeta.rowData[column.actualLinkId] ? tableMeta.rowData[column.actualLinkId] : ''}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={classes.link}
                  >
                    {' '}
                    {column.formatBytes ? formatBytes(value) : value}
                    {' '}
                  </a>
                  {externalLinkIcon ? (
                    <img
                      src={externalLinkIcon.src}
                      alt={externalLinkIcon.alt}
                      className={classes.externalLinkIcon}
                    />
                  ) : ''}
                </span>
              )
                : (
                  <div className={classes[`tableCell${index + 1}`]}>
                    {' '}
                    {column.dataFromRoot ? data[column.dataField]
                      : (column.formatBytes ? formatBytes(value)
                        : (column.dataField === 'num_subjects' || column.dataField === 'numberOfCases')
                          ? (
                            <HashRouter>
                              <Link
                                className={classes.link}
                                to={(location) => ({ ...location, pathname: linkto })}
                                onClick={() => linkClick(tableMeta)}
                              >
                                {value}
                              </Link>
                            </HashRouter>
                          )
                          : `${column.formatBytes ? formatBytes(value) : value}`
                      )}
                    {' '}

                  </div>
                )) : replaceEmptyValueWith}
          {
            column.downloadDocument && (
            <span>
              <DocumentDownloadComponent
                fileSize={
                  tableMeta.rowData[
                    updatedTableWithLinks.findIndex(
                      (tableRowData) => tableRowData.dataField
                        === column.documentDownloadProps.fileSizeColumn,
                    )
                  ]
                }
                fileLocation={
                  tableMeta.rowData[
                    updatedTableWithLinks.findIndex(
                      (tableRowData) => tableRowData.dataField
                        === column.documentDownloadProps.fileLocationColumn,
                    )
                  ]
                }
                fileFormat={
                  tableMeta.rowData[
                    updatedTableWithLinks.findIndex(
                      (tableRowData) => tableRowData.dataField
                        === column.documentDownloadProps.fileFormatColumn,
                    )
                  ]
                }
                caseId={
                  tableMeta.rowData[
                    updatedTableWithLinks.findIndex(
                      (tableRowData) => tableRowData.dataField
                        === column.documentDownloadProps.caseIdColumn,
                    )
                  ]
                }
                maxFileSize={column.documentDownloadProps.maxFileSize}
                toolTipTextUnauthenticated={column.documentDownloadProps.toolTipTextUnauthenticated}
                toolTipTextFileDownload={column.documentDownloadProps.toolTipTextFileDownload}
                toolTipTextFilePreview={column.documentDownloadProps.toolTipTextFilePreview}
                toolTipTextFileViewer={column.documentDownloadProps.toolTipTextFileViewer}
                iconUnauthenticated={column.documentDownloadProps.iconUnauthenticated}
                iconFileDownload={column.documentDownloadProps.iconFileDownload}
                iconFilePreview={column.documentDownloadProps.iconFilePreview}
                iconFileViewer={column.documentDownloadProps.iconFileViewer}
                requiredACLs={value}
              />
            </span>
            )
          }
        </div>
      ),
    },
  }));
}

export const getDefaultCustomFooter = (
  count,
  page,
  rowsPerPage,
  changeRowsPerPage,
  changePage,
  classes,
) => {
  if (count >= 1) {
    return (
      <TableFooter>
        <TableRow>
          <TablePagination
            className={classes.root}
            count={count}
            page={page}
            rowsPerPage={rowsPerPage}
            onChangeRowsPerPage={(event) => changeRowsPerPage(event.target.value)}
          // eslint-disable-next-line no-shadow
            onChangePage={(_, page) => changePage(page)}
          />
        </TableRow>
      </TableFooter>
    );
  }
  return '';
};

export function getOptions(table, classes, customFooter, onRowSelectionChange, isRowSelectable) {
  return {
    selectableRows: typeof (table.selectableRows) !== 'undefined' ? table.selectableRows : false,
    responsive: typeof (table.responsive) !== 'undefined' ? table.responsive : false,
    search: typeof (table.search) !== 'undefined' ? table.search : false,
    filter: typeof (table.filter) !== 'undefined' ? table.filter : false,
    searchable: typeof (table.searchable) !== 'undefined' ? table.searchable : false,
    print: typeof (table.print) !== 'undefined' ? table.print : false,
    viewColumns: typeof (table.viewColumns) !== 'undefined' ? table.viewColumns : false,
    pagination: typeof (table.pagination) !== 'undefined' ? table.pagination : true,
    headerPagination: typeof (table.headerPagination) !== 'undefined' ? table.headerPagination : false,
    footerPagination: typeof (table.footerPagination) !== 'undefined' ? table.footerPagination : true,
    download: typeof (table.download) !== 'undefined' ? table.download : false,
    legendTooltip: typeof (table.legendTooltip) !== 'undefined' ? table.legendTooltip : false,
    origin: table.title,
    rowsPerPageOptions: table.rowsPerPageOptions ? table.rowsPerPageOptions : [10, 25, 50, 100],
    sortOrder: {
      name: table.defaultSortField,
      direction: table.defaultSortDirection,
    },
    downloadOptions: {
      filename:
        table && table.downloadFileName
          ? table.downloadFileName : 'Bento_files_download.csv',
      filterOptions: {
        useDisplayedColumnsOnly:
        table.filterOptions
        && table.filterOptions
        && typeof (table.filterOptions.useDisplayedColumnsOnly) !== 'undefined' ? table.filterOptions.useDisplayedColumnsOnly : false,
      },
    },
    customToolbarSelect: () => '',
    customFooter: (count, page, rowsPerPage, changeRowsPerPage, changePage) => (customFooter
      ? customFooter(count, page, rowsPerPage, changeRowsPerPage, changePage, classes)
      : getDefaultCustomFooter(count, page, rowsPerPage, changeRowsPerPage, changePage, classes)),
    isRowSelectable: (dataIndex) => (isRowSelectable
      ? isRowSelectable(dataIndex)
      : true),
    onRowsSelect: (curr, allRowsSelected) => (
      onRowSelectionChange
        ? onRowSelectionChange(curr, allRowsSelected)
        : null),
  };
}

const ICDC_DATA_AVAIL_ICONS = [
  {

    label: 'Case Files',

    icon: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/icdc/images/svgs/CaseFiles_.svg',
  },
  {

    label: 'Study Files',

    icon: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/master/icdc/images/svgs/StudyFiles_.svg',
  },
  {

    label: 'Image Collections',

    icon: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/icdc/images/svgs/StudyDataAvail-ImageCollection.svg',
  },
  {

    label: 'Publications',

    icon: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/icdc/images/svgs/StudyDataAvail-Publications.svg',
  },
  {

    label: 'Additional CRDC Nodes',

    icon: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/icdc/images/svgs/StudyDataAvail-CRDCnodes.svg',
  },
];
export const generateDataAvailabilityTooltipText = () => (
  <div style={{ display: 'grid', paddingTop: '0em' }}>
    <h3 style={{ textAlign: 'center' }}>Data Availability:</h3>
    {
        ICDC_DATA_AVAIL_ICONS.map((item) => (

          <div style={{ display: 'flex', gap: '2em', marginBottom: '0.5em' }}>
            <img src={item.icon} alt={`${item.label} icon`} style={{ width: '3em' }} />
            {' '}
            {item.label}
          </div>

        ))
      }
  </div>
);
