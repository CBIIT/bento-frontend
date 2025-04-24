import React, { useEffect, useState } from 'react';
import { useModelContext } from '../../../state/NavContextProvider';
import { closeOverlayTable } from '../../../state/actions/Action';
import { category2NodeList } from '../../Table/TableView';
import CategoryView from '../../Table/Category/CategoryView';
import * as Styled from './OverlayTable.styled';

const isOverLayTable = true;

const OverlayPropertyTable = () => {
  const { context = {} } = useModelContext();
  const {
    dictionary,
    overlayNodeId = null,
    dispatch,
    isSearchMode = false,
    matches = {},
  } = context;
  const showOverlayTable = Object.keys(dictionary).includes(overlayNodeId);

  if (!overlayNodeId) {
    return <></>;
  }

  const [display, setDisplay] = useState(showOverlayTable);

  useEffect(() => {
    setDisplay(showOverlayTable);
  }, [overlayNodeId]);
  const node2Category = category2NodeList({ [overlayNodeId]: dictionary[overlayNodeId] });
  const handleCloseOverlayTable = () => {
    setDisplay(false);
    dispatch(closeOverlayTable());
  };

  return (
    <>
      {
        display && (
          <Styled.OverlayTableContainer className="overlayTableContainer">
            <Styled.OverlayTableBackground className="overlayTableBackground">
              <Styled.OverlayFixedContainer className="overlayFixedContainer">
                <Styled.OverlayContent className="overlayContent">
                  {Object.keys(node2Category).map((category) => (
                    <CategoryView
                      key={category}
                      nodes={node2Category[category]}
                      category={category}
                      isOverLayTable={isOverLayTable}
                      isSearchMode={isSearchMode}
                      matches={isSearchMode ? matches : {}}
                      onCloseOverlayTable={handleCloseOverlayTable}
                    />
                  ))}
                </Styled.OverlayContent>
              </Styled.OverlayFixedContainer>
            </Styled.OverlayTableBackground>
          </Styled.OverlayTableContainer>
        )
      }
    </>
  );
};

export default OverlayPropertyTable;
