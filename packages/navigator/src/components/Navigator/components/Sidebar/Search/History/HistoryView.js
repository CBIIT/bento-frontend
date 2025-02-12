import React from 'react';
import * as Styled from './History.styled';
import { useModelContext } from '../../../../state/NavContextProvider';
import { onTextSearch } from '../../../../state/actions/Action';
// import { findMatchingText } from '../Util';
import useSearchHistory from '../SearhResultStore';

const SearchHistoryView = () => {
  const { context } = useModelContext();
  const [state, actions] = useSearchHistory();

  const clearSearchHistory = () => {
    actions.setSearchResults();
  };

  const { results } = state;
  const items = Object.keys(results || {})
    .reduce((acc, key) => {
      if (key !== null) {
        const item = results[key]?.summary || {};
        const count = item.totalCount;
        acc.push({ key, count });
      }
      return acc;
    }, []);
  if (items.length === 0) {
    return <></>;
  }

  const searchText = (text) => {
    const { dispatch } = context;
    if (state && state?.results) {
      const result = state.results[text] || {};
      const { matches, summary } = result;
      dispatch(onTextSearch({ matches, summary }));
    }
    // else {
    //   const { matches, summary } = findMatchingText('', context);
    //   if(Object.keys(summary).length > 0) {
    //     actions.setSearchResults(searchTerm, summary, matches);
    //   }
    //   dispatch(onTextSearch({ matches, summary }));
    // }
  };

  return (
    <Styled.SearchHistoryContainer>
      <div>
        <Styled.TitleText>
          Last Search
        </Styled.TitleText>
        <Styled.ClearBtn onClick={clearSearchHistory}>
          Clear History
        </Styled.ClearBtn>
      </div>
      <Styled.SerachedItemsView>
        {items.map((item) => (
          <Styled.SearchedText onClick={() => searchText(item.key)}>
            <Styled.KeyWord>
              {item.key}
            </Styled.KeyWord>
            <Styled.ItemBadge>
              {item.count}
            </Styled.ItemBadge>
          </Styled.SearchedText>
        ))}
      </Styled.SerachedItemsView>
    </Styled.SearchHistoryContainer>
  );
};

export default SearchHistoryView;
