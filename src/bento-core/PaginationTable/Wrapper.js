import React from 'react';
import {
  Button,
  Container,
  createTheme,
  Link,
  ThemeProvider,
} from '@material-ui/core';
import { ToolTip } from 'bento-components';
import clsx from 'clsx';

export const types = {
  BUTTON: 'BUTTON',
  TABLE_DOWNLOAD: 'TABLE_DOWNLOAD',
  TABLE_VIEW_COLUMN: 'TABLE_VIEW_COLUMN',
  TEXT_INPUT: 'TEXT_INPUT',
  CUSTOM_ELEM: 'CUSTEM_ELEM',
  LINK: 'LINK',
};

const ToolTipView = (props) => {
  const {
    parent,
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
      title={tooltipCofig[parent]}
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

const ButtonComponent = ({ view }) => {
  const {
    title,
    eventHandler,
    clsName,
    tooltipCofig,
    conditional = false,
    selectedRows = [],
    parent,
  } = view;
  return (
    <>
      <Button
        onClick={eventHandler}
        className={clsx(clsName, `${clsName}_${parent}`)}
        disableRipple
        disabled={conditional && selectedRows.length === 0}
      >
        {title}
      </Button>
      {tooltipCofig && (<ToolTipView {...view} />)}
    </>
  );
};

const LinkComponent = ({ view }) => {
  console.log(view);
  const { url, clsName, title } = view;
  return (
    <>
      <Link href={url} className={clsName}>
        {title}
      </Link>
    </>
  );
};

const ViewComponent = (view) => {
  const { type } = view;
  switch (type) {
    case types.BUTTON:
      return (<ButtonComponent view={view} />);
    case types.LINK:
      return (<LinkComponent view={view} />);
    case types.CUSTOM_ELEM:
      return view.customViewElem();
    default:
      return <></>;
  }
};

const defaultTheme = {
  override: {
  },
};

const CustomLayout = (props) => {
  const { config } = props;
  return (
    <>
      {
        config.map((container) => (
          <Container maxWidth={container.size} className={container.clsName}>
            {container.items.map((item) => (
              <ViewComponent
                {...item}
                {...props}
              />
            ))}
          </Container>
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
    customTheme = {},
  } = props;
  const themeConfig = createTheme({ overrides: { ...defaultTheme, ...customTheme } });
  return (
    <ThemeProvider theme={themeConfig}>
      {headerConfig.length > 0 && (
        <CustomLayout config={headerConfig} {...props} />
      )}
      {children}
      {footerConfig.length > 0 && (
        <CustomLayout config={footerConfig} {...props} />
      )}
    </ThemeProvider>
  );
};

export default CustomWrapper;
