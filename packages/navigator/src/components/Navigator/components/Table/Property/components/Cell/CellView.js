import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { field as columnField } from '../../tableConfig';
import { TableCell } from "@mui/material";
import KeyIconSvg from "../../../assets/key_icon.svg";
import { PropertyKeyIcon } from "./Cell.styled";
import ListView from './List/ListView';

const CellView = ({
  column,
  row
}) => {
  const { field } = column;
  if (field === columnField.PROPERTY_NAME) {
    const { key: isKey = false } = row;
    return (
      <TableCell>
        {row[field]} {isKey && (<PropertyKeyIcon src={KeyIconSvg} alt="key_icon" />)}
      </TableCell>
    );
  };

  /**
   * type column
   */

  if (field === columnField.TYPE) {
    /***
    * priorize enum over keys
    */
    const enumValue = row[columnField.ENUM] || row?.Enum;
    const isEnum = Array.isArray(enumValue);

    if (isEnum) {
      return (
        <TableCell>
          <ListView
            items={enumValue}
          />
        </TableCell>
      );
    }

    const typeValue = row[field];
    const isArray = Array.isArray(typeValue);
    if (isArray) {
      return (
        <TableCell>
          <List>
            {typeValue.map(item => (
              <ListItem>{item}</ListItem>
            ))}
          </List>
        </TableCell>
      );
    }
  }

  if ( typeof row[field] === 'string') {
    return (
      <TableCell>
        {row[field]}
      </TableCell>
    );
  }
};

export default CellView;
