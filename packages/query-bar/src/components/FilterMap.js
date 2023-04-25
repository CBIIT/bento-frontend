import React, { createElement } from 'react';
import Checkbox from './CheckboxFilter';
import Slider from './SliderFilter';

const DEFAULT_FILTER_MAP = {
  checkbox: Checkbox,
  slider: Slider,
};

/**
 * This is a helper component to wrap the Filter component
 *
 * Note: If the filter component type is unknown,
 * a placeholder component will be rendered instead
 *
 * @param {object} props
 * @param {string} props.type - The type of component to render
 * @returns {JSX.Element} - The component to render
 */
export const Filter = ({ type, ...props }) => {
  // Default to the default card map
  if (typeof DEFAULT_FILTER_MAP[type] !== 'undefined') {
    return createElement(DEFAULT_FILTER_MAP[type], props);
  }

  // Render a placeholder component
  return createElement(() => (
    <div>
      {`The component for ${type} was not found.`}
    </div>
  ));
};

export default Filter;
