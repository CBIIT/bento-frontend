import React from 'react';
import SearchView from './searchView';

const SearchViewContainer = ({ match }) => <SearchView searchparam={match.params.id} />;

export default SearchViewContainer;
