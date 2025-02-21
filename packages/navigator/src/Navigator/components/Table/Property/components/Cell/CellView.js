import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { field as columnField } from '../../tableConfig';
import KeyIconSvg from '../../../assets/key_icon.svg';
import { PropertyKeyIcon } from './Cell.styled';
import ListView from './List/ListView';
import { useModelContext } from '../../../../../state/NavContextProvider';
import HighlightText from '../../../../Sidebar/Search/HighlightText';
import * as Styled from './Cell.styled';

const CellView = ({
  column,
  row,
}) => {
  const { field } = column;

  /**
  * highlight search text
  */
  const { context = {} } = useModelContext();
  const {
    isSearchMode = false,
    matches = {},
  } = context;

  const { node, propertyName } = row;
  const matchedProperties = (matches || {})[node]?.properties || {};
  const matchedProperty = matchedProperties[propertyName] || {};

  const highligtSearchText = (text, key) => {
    if (!isSearchMode) {
      return text;
    }
    if (matchedProperty[key]) {
      return (
        <HighlightText
          text={text}
          searchTerm={matches?.searchText}
        />
      );
    }
    return text;
  };

  if (field === columnField.INCLUSION) {
    const { inclusion } = row;
    return (
      <Styled.InclusionCellView inclusion={inclusion}>
        {inclusion}
      </Styled.InclusionCellView>
    );
  }

  if (field === columnField.PROPERTY_NAME) {
    const { key: isKey = false } = row;
    return (
      <Styled.PropertyName isKey={isKey}>
        {highligtSearchText(row[field], field)}
        {isKey && (<PropertyKeyIcon src={KeyIconSvg} alt="key_icon" />)}
      </Styled.PropertyName>
    );
  }

  /**
  * type column
  */

  if (field === columnField.TYPE) {
    /**
    * priorize enum over keys
    */
    const enumValue = row[columnField.ENUM] || row?.Enum;
    const isEnum = Array.isArray(enumValue);
    if (isEnum) {
      const matchingItems = matchedProperty[columnField.ENUM] || {};
      return (
        <Styled.ListCell>
          <ListView
            items={enumValue}
            matchingItems={matchingItems}
            searchTerm={matches?.searchText}
          />
        </Styled.ListCell>
      );
    }

    const typeValue = row[field];
    const isArray = Array.isArray(typeValue);
    if (isArray) {
      return (
        <Styled.TypeCell>
          <List>
            {typeValue.map((item) => (
              <ListItem>{item}</ListItem>
            ))}
          </List>
        </Styled.TypeCell>
      );
    }

    if (typeof row[field] === 'object') {
      return (
        <Styled.TypeCell>
          {highligtSearchText(JSON.stringify(row[field]), field)}
        </Styled.TypeCell>
      );
    }
  }

  if (typeof row[field] === 'string') {
    return (
      <Styled.MuiCellView>
        {highligtSearchText(row[field], field)}
      </Styled.MuiCellView>
    );
  }

  return (<></>);
};

export default CellView;
