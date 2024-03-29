import React from 'react';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import DownloadIcon from '@material-ui/icons/CloudDownload';
import PrintIcon from '@material-ui/icons/Print';
import ViewColumnIcon from '@material-ui/icons/ViewColumn';
import FilterIcon from '@material-ui/icons/FilterList';
import ReactToPrint from 'react-to-print';
import find from 'lodash.find';
import { withStyles } from '@material-ui/core/styles';
import cloneDeep from 'lodash.clonedeep';
import MuiTooltip from '@material-ui/core/Tooltip';
import { createCSVDownload, downloadCSV } from '../utils';
import TableSearch from './TableSearch';
import TableViewCol from './TableViewCol';
import TableFilter from './TableFilter';
import Popover from './Popover';
import { generateDataAvailabilityTooltipText } from '@bento-core/util';

export const defaultToolbarStyles = (theme) => ({
  root: {
    backgroundColor: 'white !important',
    '@media print': {
      display: 'none',
    },
  },
  tableToolbar: {
    backgroundColor: 'white !important',
    paddingTop: '1em',
  },
  dalTooltip: {
    padding: '0px 12px !important'
  },
  dalPopper: {
    left: '-278px !important',
  },
  fullWidthRoot: {
    backgroundColor: 'white !important',
  },
  left: {
    flex: '1 1 auto',
  },
  fullWidthLeft: {
    flex: '1 1 auto',
  },
  actions: {
    flex: '1 1 auto',
    textAlign: 'right',
  },
  fullWidthActions: {
    flex: '1 1 auto',
    textAlign: 'right',
  },
  titleRoot: {},
  titleText: {},
  fullWidthTitleText: {
    textAlign: 'left',
  },
  icon: {
    '&:hover': {
      color: theme.palette.primary.main,
    },
  },
  iconActive: {
    color: theme.palette.primary.main,
  },
  filterPaper: {
    maxWidth: '50%',
  },
  filterCloseIcon: {
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 100,
  },
  searchIcon: {
    display: 'inline-flex',
    marginTop: '10px',
    marginRight: '8px',
  },
  [theme.breakpoints.down('sm')]: {
    titleRoot: {},
    titleText: {
      fontSize: '16px',
    },
    spacer: {
      display: 'none',
    },
    left: {
      // flex: "1 1 40%",
      padding: '8px 0px',
    },
    actions: {
      // flex: "1 1 60%",
      textAlign: 'right',
    },
  },
  [theme.breakpoints.down('xs')]: {
    root: {
      display: 'block',
      '@media print': {
        display: 'none !important',
      },
    },
    left: {
      padding: '8px 0px 0px 0px',
    },
    titleText: {
      textAlign: 'center',
    },
    actions: {
      textAlign: 'center',
    },
  },
  '@media screen and (max-width: 480px)': {},
});

const RESPONSIVE_FULL_WIDTH_NAME = 'scrollFullHeightFullWidth';

class TableToolbar extends React.Component {
  state = {
    iconActive: null,
    showSearch: Boolean(this.props.searchText || this.props.options.searchText || this.props.options.searchOpen),
    searchText: this.props.searchText || null,
  };

  componentDidUpdate(prevProps) {
    if (this.props.searchText !== prevProps.searchText) {
      this.setState({ searchText: this.props.searchText });
    }
  }

  handleCSVDownload = () => {
    const {
      data, displayData, columns, options,
    } = this.props;
    let dataToDownload = cloneDeep(data);
    let columnsToDownload = columns;

    if (options.downloadOptions && options.downloadOptions.filterOptions) {
      // check rows first:
      if (options.downloadOptions.filterOptions.useDisplayedRowsOnly) {
        dataToDownload = displayData.map((row, index) => {
          let i = -1;

          // Help to preserve sort order in custom render columns
          row.index = index;

          return {
            data: row.data.map((column) => {
              i += 1;

              // if we have a custom render, which will appear as a react element, we must grab the actual value from data
              // that matches the dataIndex and column
              // TODO: Create a utility function for checking whether or not something is a react object
              return typeof column === 'object' && column !== null && !Array.isArray(column)
                ? find(data, (d) => d.index === row.dataIndex).data[i]
                : column;
            }),
          };
        });
      }

      // now, check columns:
      if (options.downloadOptions.filterOptions.useDisplayedColumnsOnly) {
        columnsToDownload = columns.filter((_) => _.display === 'true');

        dataToDownload = dataToDownload.map((row) => {
          row.data = row.data.filter((_, index) => columns[index].display === 'true');
          return row;
        });
      }
    }
    createCSVDownload(columnsToDownload, dataToDownload, options, downloadCSV);
  };

  setActiveIcon = (iconName) => {
    this.setState(
      (prevState) => ({
        showSearch: this.isSearchShown(iconName),
        iconActive: iconName,
        prevIconActive: prevState.iconActive,
      }),
      () => {
        const { iconActive, prevIconActive } = this.state;

        if (iconActive === 'filter') {
          this.props.setTableAction('onFilterDialogOpen');
          if (this.props.options.onFilterDialogOpen) {
            this.props.options.onFilterDialogOpen();
          }
        }
        if (iconActive === undefined && prevIconActive === 'filter') {
          this.props.setTableAction('onFilterDialogClose');
          if (this.props.options.onFilterDialogClose) {
            this.props.options.onFilterDialogClose();
          }
        }
      },
    );
  };

  isSearchShown = (iconName) => {
    let nextVal = false;
    if (this.state.showSearch) {
      if (this.state.searchText) {
        nextVal = true;
      } else {
        const { onSearchClose } = this.props.options;
        this.props.setTableAction('onSearchClose');
        if (onSearchClose) onSearchClose();
        nextVal = false;
      }
    } else if (iconName === 'search') {
      nextVal = this.showSearch();
    }
    return nextVal;
  };

  getActiveIcon = (styles, iconName) => {
    let isActive = this.state.iconActive === iconName;
    if (iconName === 'search') {
      const { showSearch, searchText } = this.state;
      isActive = isActive || showSearch || searchText;
    }
    return isActive ? styles.iconActive : styles.icon;
  };

  showSearch = () => {
    this.props.setTableAction('onSearchOpen');
    !!this.props.options.onSearchOpen && this.props.options.onSearchOpen();
    return true;
  };

  hideSearch = () => {
    const { onSearchClose } = this.props.options;

    this.props.setTableAction('onSearchClose');
    if (onSearchClose) onSearchClose();
    this.props.searchClose();

    this.setState(() => ({
      iconActive: null,
      showSearch: false,
      searchText: null,
    }));
  };

  handleSearch = (value) => {
    this.setState({ searchText: value });
    this.props.searchTextUpdate(value);
  };

  handleSearchIconClick = () => {
    const { showSearch, searchText } = this.state;
    if (showSearch && !searchText) {
      this.hideSearch();
    } else {
      this.setActiveIcon('search');
    }
  };

  render() {
    const {
      data,
      options,
      classes,
      columns,
      filterData,
      filterList,
      filterUpdate,
      resetFilters,
      toggleViewColumn,
      title,
      components = {},
      updateFilterByType,
    } = this.props;

    const Tooltip = components.Tooltip || MuiTooltip;
    const {
      search, downloadCsv, print, viewColumns, filterTable,
    } = options.textLabels.toolbar;
    const { showSearch, searchText } = this.state;

    const filterPopoverExit = () => {
      this.setState({ hideFilterPopover: false });
      this.setActiveIcon.bind(null);
    };

    const closeFilterPopover = () => {
      this.setState({ hideFilterPopover: true });
    };

    return (
      <Toolbar
        className={options.responsive !== RESPONSIVE_FULL_WIDTH_NAME ? classes.root : classes.fullWidthRoot}
        role="toolbar"
        aria-label="Table Toolbar"
        classes={{ root: classes.tableToolbar }}
      >
        <div className={options.responsive !== RESPONSIVE_FULL_WIDTH_NAME ? classes.left : classes.fullWidthLeft}>
          {showSearch === true ? (
            options.customSearchRender ? (
              options.customSearchRender(searchText, this.handleSearch, this.hideSearch, options)
            ) : (
              <TableSearch
                searchText={searchText}
                onSearch={this.handleSearch}
                onHide={this.hideSearch}
                options={options}
              />
            )
          ) : typeof title !== 'string' ? (
            title
          ) : (
            <div className={classes.titleRoot} aria-hidden="true">
              <Typography
                variant="h6"
                className={
                  options.responsive !== RESPONSIVE_FULL_WIDTH_NAME ? classes.titleText : classes.fullWidthTitleText
                }
              >
                {title}
              </Typography>
            </div>
          )}
        </div>
        <div className={options.responsive !== RESPONSIVE_FULL_WIDTH_NAME ? classes.actions : classes.fullWidthActions}>
          {options.search && (
            <Tooltip title={search} disableFocusListener>
              <IconButton
                aria-label={search}
                data-testid={`${search}-iconButton`}
                buttonRef={(el) => (this.searchButton = el)}
                classes={{ root: this.getActiveIcon(classes, 'search') }}
                onClick={this.handleSearchIconClick}
              >
                <SearchIcon />
              </IconButton>
            </Tooltip>
          )}
          {
            options.legendTooltip && (
              <span style={{ marginRight: options.origin === 'Studies' ? '20em' : '24em', fontSize: '16px', fontWeight: '600', color: '#000' }}>
                Data Availability
                <Tooltip
                  title={generateDataAvailabilityTooltipText()}
                  interactive
                  classes={{
                    tooltip: classes.dalTooltip,
                    popper: classes.dalPopper,
                    tooltipPlacementBottom: classes.dalTooltipBottom
                  }}
                  placement="top"
                >
                  <IconButton aria-label="help">
                    <img style={{ width: '0.7em', marginBottom: '0.6em' }} src="https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/icdc/images/svgs/Tooltip.SpeechBubble.svg" alt="tooltip" />
                  </IconButton>
                </Tooltip>
              </span>
            )
          }
          {options.download && (
            <Tooltip title={downloadCsv}>
              <IconButton
                data-testid={`${downloadCsv}-iconButton`}
                aria-label={downloadCsv}
                classes={{ root: classes.icon }}
                onClick={this.handleCSVDownload}
              >
                <DownloadIcon />
              </IconButton>
            </Tooltip>
          )}
          {options.print && (
            <span>
              <ReactToPrint
                trigger={() => (
                  <span>
                    <Tooltip title={print}>
                      <IconButton
                        data-testid={`${print}-iconButton`}
                        aria-label={print}
                        classes={{ root: classes.icon }}
                      >
                        <PrintIcon />
                      </IconButton>
                    </Tooltip>
                  </span>
                )}
                content={() => this.props.tableRef()}
              />
            </span>
          )}
          {options.viewColumns && (
            <Popover
              refExit={this.setActiveIcon.bind(null)}
              classes={{ closeIcon: classes.filterCloseIcon }}
              trigger={(
                <Tooltip title={viewColumns} disableFocusListener>
                  <IconButton
                    data-testid={`${viewColumns}-iconButton`}
                    aria-label={viewColumns}
                    classes={{ root: this.getActiveIcon(classes, 'viewcolumns') }}
                    onClick={this.setActiveIcon.bind(null, 'viewcolumns')}
                  >
                    <ViewColumnIcon />
                  </IconButton>
                </Tooltip>
              )}
              content={
                <TableViewCol data={data} columns={columns} options={options} onColumnUpdate={toggleViewColumn} />
              }
            />
          )}
          {options.filter && (
            <Popover
              refExit={filterPopoverExit}
              hide={this.state.hideFilterPopover}
              classes={{ paper: classes.filterPaper, closeIcon: classes.filterCloseIcon }}
              trigger={(
                <Tooltip title={filterTable} disableFocusListener>
                  <IconButton
                    data-testid={`${filterTable}-iconButton`}
                    aria-label={filterTable}
                    classes={{ root: this.getActiveIcon(classes, 'filter') }}
                    onClick={this.setActiveIcon.bind(null, 'filter')}
                  >
                    <FilterIcon />
                  </IconButton>
                </Tooltip>
              )}
              content={(
                <TableFilter
                  customFooter={options.customFilterDialogFooter}
                  columns={columns}
                  options={options}
                  filterList={filterList}
                  filterData={filterData}
                  onFilterUpdate={filterUpdate}
                  onFilterReset={resetFilters}
                  handleClose={closeFilterPopover}
                  updateFilterByType={updateFilterByType}
                />
              )}
            />
          )}
          {options.customToolbar && options.customToolbar()}
        </div>
      </Toolbar>
    );
  }
}

export default withStyles(defaultToolbarStyles, { name: 'MUIDataTableToolbar' })(TableToolbar);
