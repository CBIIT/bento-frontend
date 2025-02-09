import React, { useEffect, useState } from 'react';
import Fuse from 'fuse.js';

import HighlightText from './HighlightText';
import * as Styled from './SuggestionList.styled';

const suggestionKeys = [
  'title',
  'description',
  'properties.name',
  'properties.description',
  'properties.type',
];

const limit = 10;

const getSuggestionList = (dictionary, searchText) => {
  const flattened = Object.keys(dictionary || {}).reduce((acc, key) => {
    const node = dictionary[key];
    Object.entries(node).forEach(
      ([key, value]) => {
        if (suggestionKeys.includes(key)) {
            acc.push({key: key, value: value})
        }
        if (key === 'properties') {
          if (node?.properties) {
            Object.keys(node?.properties)
              .forEach(item => {
              const propertyItem = node?.properties[item];
              Object.entries(propertyItem).forEach(
                ([key, propKeyalue]) => {
                  if (typeof propKeyalue === 'string') {
                    const propertyKey = `properties.${key}`;
                    if (suggestionKeys.includes(propertyKey)) {
                      acc.push({key: propertyKey, value: propKeyalue})
                    }
                  }
                }
              )   
            });
          }
        }
      }
    )
    return acc;
  }, []);

  const options = {
    keys: ['value'], // Search only in 'value' field
    threshold: 0.4, // Controls fuzziness (lower means stricter match)
  };

  const fuse = new Fuse(flattened, options);
  const results = fuse.search(searchText);
  // console.log(results);
  const suggestedList = results.reduce(
    (acc, { item, refIndex }) => {
      const { value } = item;
      acc.push(value);
      return acc;
    }, []);
  return suggestedList;
};

const SuggestionListView = ({
  dictionary,
  textSearch,
  searchTextQuery
}) => {
  const [items, setItems] = useState([]);
  useEffect( () => {
    if (textSearch) {
      const suggestionList = getSuggestionList(dictionary, textSearch);
      // console.log(suggestionList);
      setItems(suggestionList);
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
            {items.map(listItem => (
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
