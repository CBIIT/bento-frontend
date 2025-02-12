import React, { useEffect, useState } from 'react';
import Fuse from 'fuse.js';
import HighlightText from '../HighlightText';
import * as Styled from './SuggestionList.styled';
import useSuggestionList from './Suggestion.store';

const suggestionKeys = [
  'title',
  'description',
  'properties.name',
  'properties.description',
  'properties.type',
];

const getSuggestionList = (dictionary, searchText) => {
  const flattened = Object.keys(dictionary || {}).reduce((acc, key) => {
    const node = dictionary[key];
    Object.entries(node).forEach(([nKey, nValue]) => {
      if (suggestionKeys.includes(nKey)) {
        acc.push({ key: nKey, value: nValue });
      }
      if (nKey === 'properties') {
        if (node?.properties) {
          Object.keys(node?.properties).forEach((item) => {
            const propertyItem = node?.properties[item];
            Object.entries(propertyItem).forEach(([pKey, propKeyalue]) => {
              if (typeof propKeyalue === 'string') {
                const propertyKey = `properties.${pKey}`;
                if (suggestionKeys.includes(propertyKey)) {
                  acc.push({ key: propertyKey, value: propKeyalue });
                }
              }
            });
          });
        }
      }
    });
    return acc;
  }, []);

  const options = {
    keys: ['value'], // Search only in 'value' field
    threshold: 0.4, // Controls fuzziness (lower means stricter match)
  };

  const fuse = new Fuse(flattened, options);
  const results = fuse.search(searchText);
  const suggestedList = results.reduce(
    (acc, { item }) => {
      const { value } = item;
      if (!acc.includes(value)) {
        acc.push(value);
      }
      return acc;
    }, [],
  );
  return suggestedList;
};

const SuggestionListView = ({
  dictionary,
  textSearch,
  searchTextQuery,
}) => {
  const [items, setItems] = useState([]);
  const [state, actions] = useSuggestionList();

  useEffect(() => {
    if (state[textSearch]) {
      setItems(state[textSearch]);
    } else if (textSearch) {
      const suggestionList = getSuggestionList(dictionary, textSearch);
      setItems(suggestionList);
      actions.setSuggestionList(textSearch, suggestionList);
    } else {
      setItems([]);
    }
  }, [textSearch]);

  const onSearchSuggestedItem = (value) => {
    searchTextQuery(value);
  };

  return (
    <>
      {
        (items.length > 0) && (
          <Styled.SuggestListContainer>
            {items.map((listItem) => (
              <Styled.SuggestListItem
                onClick={() => onSearchSuggestedItem(listItem)}
              >
                <HighlightText
                  text={listItem}
                  searchTerm={textSearch}
                />
              </Styled.SuggestListItem>
            ))}
          </Styled.SuggestListContainer>
        )
      }
    </>
  );
};

export default SuggestionListView;
