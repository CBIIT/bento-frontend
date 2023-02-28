import React from 'react';

/**
 * Creates a component that displays the adornment
 * for the search bar results
 *
 * @param {object} props
 * @returns JSX.Element
 */
export const ExpandElement = (props) => {
  const {
    text, classes, iconSrc,
  } = props;

  const src = iconSrc || 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/bento/images/icons/svgs/EnterIcon.svg';

  return (
    <div>
      {text}
      {' '}
      <span>
        <img className={classes.enterIcon} src={src} alt="adornment icon" />
      </span>
    </div>
  );
};

export default ExpandElement;
