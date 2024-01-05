import React, { createElement } from 'react';
import {
  ProjectCard, AboutCard,
} from './Cards';

const DEFAULT_CARD_MAP = {
  project: ProjectCard,
  about: AboutCard,
};

/**
 * This is a helper component to wrap the Search Result Card components
 *
 * Note: If the component type is unknown,
 * a placeholder component will be rendered instead
 *
 * @param {object} props
 * @param {string} props.searchText - The search text entered by the user
 * @param {object} props.data - The data object used to render the component
 * @param {object} props.classes - The classes object used to style the component
 * @param {number} props.index - The index of the data object in the search results
 * @param {object} [props.resultMap] - The mapping of search result types to components
 * @returns {JSX.Element} - The component to render
 */
export const ResultCard = (props) => {
  const {
    searchText, data, classes, index,
    resultMap,
  } = props;

  // Use the provided cardMap if it exists
  if (resultMap && typeof resultMap[data.type] !== 'undefined') {
    return createElement(resultMap[data.type], {
      data, classes, index, searchText,
    });
  }

  // Default to the default card map
  if (typeof DEFAULT_CARD_MAP[data.type] !== 'undefined') {
    return createElement(DEFAULT_CARD_MAP[data.type], {
      data, classes, index, searchText,
    });
  }

  // Render a placeholder component
  return createElement(() => (
    <div>
      {`The component for ${data.type} was not found.`}
    </div>
  ));
};

export default ResultCard;
