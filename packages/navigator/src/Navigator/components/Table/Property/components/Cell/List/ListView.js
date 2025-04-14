import React, { useState } from 'react';
/* eslint-disable-next-line */
import CloseIcon from '@mui/icons-material/Close';
import {
  Button,
  IconButton,
} from '@mui/material';
/* eslint-disable-next-line */
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import * as Styled from './List.styled';
import HighlightText from '../../../../../Sidebar/Search/HighlightText';

const maxItem = 10;
const ListView = ({
  items = [],
  matchingItems = {},
  searchTerm,
}) => {
  const [display, setDisplay] = useState(false);
  const listItems = items.slice(0, maxItem);
  const DisplayListItem = ({ displayItems = [] }) => (
    <Styled.MuiList
      className="acptValList"
      display={display}
    >
      {
        displayItems.map((item, index) => (
          <Styled.MuiListItem
            key={index}
            className="acptValListItem"
            display={display}
          >
            <Styled.MuiListItemIcon>
              <FiberManualRecordIcon style={{ fontSize: 8 }} />
            </Styled.MuiListItemIcon>
            <Styled.MuiListItemText>
              {matchingItems[index]
                ? (
                  <HighlightText
                    text={item}
                    searchTerm={searchTerm}
                  />
                ) : (
                  <>{item}</>
                )}
            </Styled.MuiListItemText>
          </Styled.MuiListItem>
        ))
      }
    </Styled.MuiList>
  );

  return (
    <>
      <Styled.OuterContainer className="acptValOuterContainer">
        <Styled.AcceptValueLabel className="acptValLabel">
          Acceptable Values:
        </Styled.AcceptValueLabel>
        {' '}
        {(!display) && (<DisplayListItem displayItems={listItems} />)}
        {(!display && items.length > maxItem) ? (
          <Button onClick={() => setDisplay(!display)}>
            ...show More
          </Button>
        ) : (
          <Styled.MuiDialog
            open={display}
            onClose={() => setDisplay(false)}
            maxWidth="sm"
            PaperProps={{ sx: { padding: '1rem' } }}
          >
            <Styled.DialogTitleContent>
              <Styled.DialogTitle>
                Acceptable Values
              </Styled.DialogTitle>
              <Styled.ActionBtn>
                <IconButton onClick={() => setDisplay(false)}>
                  <CloseIcon fontSize="small" />
                </IconButton>
              </Styled.ActionBtn>
            </Styled.DialogTitleContent>
            <DisplayListItem displayItems={items} />
          </Styled.MuiDialog>
        )}
      </Styled.OuterContainer>
    </>
  );
};

export default ListView;
