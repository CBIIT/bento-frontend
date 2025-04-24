import styled from '@emotion/styled';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export const StyledCategoryContainer = styled('div')(
  ({ categoryStyles }) => {
    const categoryColor = categoryStyles?.color;
    const background = categoryStyles?.background;
    return {
      borderLeftColor: categoryColor,
      minHeight: '44px',
      background,
      display: 'flex',
      alignItems: 'center',
      color: '#ffffff',
      paddingLeft: '20px',
      gap: '8px',
    };
  },
);

export const StyledCategoryIcon = styled('img')({
  width: '32px',
});

export const StyleCategoryTitle = styled('div')({
  color: '#FFFFFF',
  fontFamily: 'Lato',
  fontSize: '19px',
  fontWeight: '500',
  letterSpacing: '0',
});

export const StyledCloseButton = styled(IconButton)({
  marginLeft: 'auto',
  order: 2,
});

export const StyledCloseIcon = styled(CloseIcon)({
  color: '#ffffff',
  fontSize: '20px',
});

export const StyledLeftBorder = styled('div')(
  ({ categoryStyles }) => {
    const categoryColor = categoryStyles.color;
    return {
      borderLeftColor: categoryColor,
    };
  },
);

export const StyledCatergoryOuterContainer = styled('div')(
  ({ categoryStyles, theme }) => {
    // console.log(theme.styles);
    const categoryColor = categoryStyles.color;
    return {
      borderLeft: `5px solid ${categoryColor}`,
      ...theme?.styles?.customClass,
    };
  },
);
