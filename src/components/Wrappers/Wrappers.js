/* eslint-disable */
import React from 'react';
import {
  withStyles,
  withTheme,
  Badge as BadgeBase,
  Typography as TypographyBase,
  Button as ButtonBase,
} from '@material-ui/core';
import classnames from 'classnames';

const getColor = (color, theme, brigtness = 'main') => {
  if (color && theme.palette[color] && theme.palette[color][brigtness]) {
    return theme.palette[color][brigtness];
  }
};

const getFontWeight = (style) => {
  switch (style) {
    case 'light':
      return 300;
    case 'medium':
      return 500;
    case 'bold':
      return 600;
    default:
      return 400;
  }
};

const getFontSize = (size, variant = '', theme) => {
  let multiplier;

  switch (size) {
    case 'xs':
      multiplier = 0.5;
      break;
    case 'sm':
      multiplier = 0.8;
      break;
    case 'md':
      multiplier = 1.2;
      break;
    case 'l':
      multiplier = 1.5;
      break;
    case 'xl':
      multiplier = 1.7;
      break;
    case 'xxl':
      multiplier = 2;
      break;
    default:
      multiplier = 1;
      break;
  }

  const defaultSize = variant && theme.typography[variant]
    ? theme.typography[variant].fontSize
    : `${theme.typography.fontSize}px`;

  return `calc(${defaultSize} * ${multiplier})`;
};

const createStyled = (styles, options) => {
  const Styled = (props) => {
    const { children, ...other } = props;
    return children(other);
  };

  return withStyles(styles, options)(Styled);
};

const BadgeExtended = ({
  classes, theme, children, colorBrightness, ...props
}) => {
  const Styled = createStyled({
    badge: {
      backgroundColor: getColor(props.color, theme, colorBrightness),
    },
  });

  return (
    <Styled>
      {(styledProps) => (
        <BadgeBase
          classes={{
            badge: classnames(classes.badge, styledProps.classes.badge),
          }}
          {...props}
        >
          {children}
        </BadgeBase>
      )}
    </Styled>
  );
};

export const Badge = withStyles(
  () => ({
    badge: {
      fontWeight: 600,
      height: 16,
      minWidth: 16,
      backgroundColor: 'transparent',
    },
  }),
  { withTheme: true },
)(BadgeExtended);

const TypographyExtended = ({
  theme, children, weight, size, family, colorBrightness, ...props
}) => (
  <TypographyBase
    style={{
      color: getColor(props.color, theme, colorBrightness),
      fontWeight: getFontWeight(weight),
      fontSize: getFontSize(size, props.variant, theme),
      fontFamily: family
    }}
    {...props}
  >
    {children}
  </TypographyBase>
);

export const Typography = withTheme()(TypographyExtended);

const ButtonExtended = ({ theme, children, ...props }) => {
  const Styled = createStyled({
    button: {
      backgroundColor: getColor(props.color, theme),
      boxShadow: theme.customShadows.widget,
      color: 'white',
      '&:hover': {
        backgroundColor: getColor(props.color, theme, 'light'),
        boxShadow: theme.customShadows.widgetWide,
      },
    },
  });

  return (
    <Styled>
      {({ classes }) => (
        <ButtonBase classes={{ root: classes.button }} {...props}>
          {children}
        </ButtonBase>
      )}
    </Styled>
  );
};

export const Button = withTheme()(ButtonExtended);
