import React from 'react';
import { useSelector } from 'react-redux';
import  {Header}  from '@bento-core/header';
import { withRouter } from 'react-router-dom';
import { SearchBarGenerator } from '@bento-core/global-search';
import headerData from '../../bento/globalHeaderData';
import { queryAutocompleteAPI, SEARCH_DATAFIELDS, SEARCH_KEYS } from '../../bento/search';
import { PUBLIC_ACCESS } from '../../bento/siteWideConfig';
import { accessLevelTypes } from '@bento-core/authentication';

const ICDCHeader = (props) => {
  const { location } = props;

  const isSignedIn = useSelector((state) => state && state.login.isSignedIn);
  const isAdmin = useSelector((state) => state.login && state.login.role && state.login.role === 'admin');
  const hasApprovedArms = useSelector((state) => state.login.acl
    && state.login.acl.some((arm) => arm.accessStatus === 'approved'));
  const authenticated = PUBLIC_ACCESS === accessLevelTypes.METADATA_ONLY
    || (isSignedIn && (hasApprovedArms || isAdmin));

  const SearchBarConfig = {
    config: {
      query: async (search) => queryAutocompleteAPI(search, !authenticated),
      searchKeys: authenticated ? SEARCH_KEYS.private : SEARCH_KEYS.public,
      searchFields: authenticated ? SEARCH_DATAFIELDS.private : SEARCH_DATAFIELDS.public,
    },
  };
  const { SearchBar } = SearchBarGenerator(SearchBarConfig);

  return (
    <Header
      logo={headerData.globalHeaderLogo}
      alt={headerData.globalHeaderLogoAltText}
      homeLink={headerData.globalHeaderLogoLink}
      SearchComponent={!location.pathname.match('/search') ? SearchBar : undefined}
    />
  );
};

export default withRouter(ICDCHeader);
