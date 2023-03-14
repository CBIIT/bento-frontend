import React, { useContext } from 'react';
import {
  Button,
  Container,
  createTheme,
  Link,
  ThemeProvider,
} from '@material-ui/core';
import { ToolTip } from 'bento-components';
import clsx from 'clsx';
import { TableContext } from './ContextProvider';
// import { addAllFiles, addSelectedFiles } from './TableService';

export const types = {
  BUTTON: 'BUTTON',
  TABLE_DOWNLOAD: 'TABLE_DOWNLOAD',
  TABLE_VIEW_COLUMN: 'TABLE_VIEW_COLUMN',
  TEXT_INPUT: 'TEXT_INPUT',
  CUSTOM_ELEM: 'CUSTEM_ELEM',
  LINK: 'LINK',
};

export const btnTypes = {
  ADD_ALL_FILES: 'ADD_ALL_FILES',
  ADD_SELECTED_FILES: 'ADD_SELECTED_FILES',
};

/**
* customize tooltips based on tooltipContent
* defined on dashboardTabData (tooltipContent)
*/
export const ToolTipView = (props) => {
  const {
    section,
    tooltipCofig,
    classes,
  } = props;

  const {
    icon,
    alt,
    arrow = false,
  } = tooltipCofig;

  return (
    <ToolTip
      title={tooltipCofig[section]}
      arrow={arrow}
      classes={{
        tooltip: classes.customTooltip,
        arrow: classes.customArrow,
      }}
    >
      {icon && (<img src={icon} alt={alt} />)}
    </ToolTip>
  );
};

/**
* customize button based on configuration
* refer config table (wrapper component config)
*/
export const ButtonComponent = (props) => {
  const {
    title,
    eventHandler,
    clsName,
    tooltipCofig,
    section,
    addFileAPI,
    activeFilters,
    addSelectedIdAPI,
    btnType,
    dataKey,
  } = props;

  const tableContext = useContext(TableContext);
  if (btnTypes.ADD_SELECTED_FILES === btnType) {
    const {
      selectedRows = [],
    } = tableContext.tblState;
    const variables = {};
    variables[dataKey] = selectedRows;
    return (
      <>
        <Button
          onClick={() => eventHandler(variables, addSelectedIdAPI)}
          className={clsx(clsName, `${clsName}_${section}`)}
          disableRipple
          disabled={selectedRows.length === 0}
        >
          {title}
        </Button>
        {tooltipCofig && (<ToolTipView {...props} />)}
      </>
    );
  }

  return (
    <>
      <Button
        onClick={() => eventHandler(activeFilters, addFileAPI)}
        className={clsx(clsName, `${clsName}_${section}`)}
        disableRipple
        disabled={false}
      >
        {title}
      </Button>
      {tooltipCofig && (<ToolTipView {...props} />)}
    </>
  );
};

/**
* configure Link based on configuration
* refer config table (wrapper component config)
*/
export const LinkComponent = (props) => {
  const { url, clsName, title } = props;
  return (
    <>
      <Link href={url} className={clsName}>
        {title}
      </Link>
    </>
  );
};

/**
*
* @param {*}
* @returns custom component based on configuration
*/
export const ViewComponent = (props) => {
  const { type } = props;
  switch (type) {
    case types.BUTTON:
      return (<ButtonComponent {...props} />);
    case types.LINK:
      return (<LinkComponent {...props} />);
    case types.CUSTOM_ELEM:
      return props.customViewElem();
    default:
      return <></>;
  }
};

export const defaultTheme = {
  override: {
  },
};

/**
* creates header and footer components of table
*/
const CustomLayout = (props) => {
  const {
    configs,
    customTheme = {},
  } = props;
  /**
  * return when configuration is empty
  */
  if (configs.length < 1) {
    return null;
  }
  /**
  * override default style configuration (please refer to class name table to override styles)
  * 1. props -> {configs, customTheme, section, classes, selectedRows}
  * 2. item -> Component cofiguration defined on cofiguration (refer config table)
  * (attrs - title, eventHandler, clsName, tooltipCofig, conditional)
  */
  const themeConfig = createTheme({ overrides: { ...defaultTheme, ...customTheme } });
  return (
    <>
      {
        configs.map((container) => (
          <ThemeProvider theme={themeConfig}>
            <Container
              maxWidth={container.size}
              className={container.clsName}
            >
              {container.items.map((item) => (
                <ViewComponent
                  {...item}
                  {...props}
                />
              ))}
            </Container>
          </ThemeProvider>
        ))
      }
    </>
  );
};

const CustomWrapper = (props) => {
  const {
    children,
    headerConfig = [],
    footerConfig = [],
    customTheme,
    section,
    classes,
    activeFilters,
  } = props;
  return (
    <>
      <CustomLayout
        configs={headerConfig}
        customTheme={customTheme}
        section={section}
        classes={classes}
        activeFilters={activeFilters}
      />
      {children}
      <CustomLayout
        configs={footerConfig}
        customTheme={customTheme}
        section={section}
        classes={classes}
      />
    </>
  );
};

export default CustomWrapper;
