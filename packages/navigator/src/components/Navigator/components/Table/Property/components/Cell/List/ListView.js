import React, { useState } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import * as Styled from './List.styled';
import { 
  Button, 
  IconButton,
  ListItemIcon
} from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

const maxItem = 10;
const ListView = ({
  items = [],
}) => {
  const [display, setDisplay] = useState(false);
  const listItems = items.slice(0, maxItem);

  const DisplayListItem = ({ items }) => (
    <Styled.MuiList
      className='acptValList'
      display={display}
    >
      {
        items.map((item, index) => (
          <Styled.MuiListItem
            key={index}
            className='acptValListItem'
            display={display} 
          >
            <ListItemIcon>
              <FiberManualRecordIcon style={{ fontSize: 8 }} />
            </ListItemIcon>
            <Styled.MuiListItemText>
              {item}
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
        </Styled.AcceptValueLabel>{" "}
        {(!display) ? (
            <>
              <DisplayListItem items={listItems} />
              <Button onClick={() => setDisplay(!display)}>
                ...show More
              </Button>
            </>
          ) : (
            <Styled.MuiDialog
              open={display}
              onClose={() => setDisplay(false)}
              maxWidth={'md'}
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
                
              <DisplayListItem items={items} />
            </Styled.MuiDialog>
          )
        }
      </Styled.OuterContainer>
    </>
  );
}

export default ListView;
