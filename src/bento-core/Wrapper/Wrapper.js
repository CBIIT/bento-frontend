import React from 'react';
import {
  Container,
  createTheme,
  Link,
  ThemeProvider,
} from '@material-ui/core';
import ButtonView from './components/ButtonView';
import TextFieldView from './components/TextFieldView';

export const types = {
  BUTTON: 'BUTTON',
  TABLE_DOWNLOAD: 'TABLE_DOWNLOAD',
  TABLE_VIEW_COLUMN: 'TABLE_VIEW_COLUMN',
  TEXT_INPUT: 'TEXT_INPUT',
  CUSTOM_ELEM: 'CUSTEM_ELEM',
  LINK: 'LINK',
  ICON: 'ICON',
  TEXT: 'TEXT',
  CONTRAINER: 'CONTRAINER',
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

const Img = ({ src, alt, clsName }) => <img src={src} alt={alt} className={clsName} />;

const Text = ({
  text,
  clsName,
  tag,
  Component,
}) => (
  <span className={clsName} type={tag}>
    {text}
    { Component && <Component /> }
  </span>
);

/**
*
* @param {*}
* @returns custom component based on configuration
*/
export const ViewComponent = (props) => {
  const { type, customViewElem } = props;
  switch (type) {
    case types.BUTTON:
      return (<ButtonView {...props} />);
    case types.LINK:
      return (<LinkComponent {...props} />);
    case types.ICON:
      return <Img {...props} />;
    case types.TEXT:
      return <Text {...props} />;
    case types.TEXT_INPUT:
      return <TextFieldView {...props} />;
    case types.CUSTOM_ELEM:
      return customViewElem();
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
  if (configs.length === 0) {
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
    wrapConfig = [],
    customTheme,
    section,
    classes,
    activeFilters,
    tblDispatch,
  } = props;
  return (
    <>
      <CustomLayout
        configs={wrapConfig}
        customTheme={customTheme}
        section={section}
        classes={classes}
        activeFilters={activeFilters}
        tblDispatch={tblDispatch}
      />
      {children}
    </>
  );
};

export default CustomWrapper;
