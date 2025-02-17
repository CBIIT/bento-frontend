/* eslint-disable react/jsx-boolean-value */
/* eslint-disable import/no-unresolved */
/* eslint-disable guard-for-in */
/* eslint-disable no-var */
/* eslint-disable vars-on-top */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-param-reassign */
/* eslint-disable space-infix-ops */
/* eslint-disable prefer-template */
/* eslint-disable import/no-unresolved */
/* eslint-disable quotes */
/* eslint-disable no-undef */
/* eslint-disable no-shadow */
/* eslint-disable semi */
/* eslint-disable object-curly-spacing */
/* eslint-disable import/no-cycle */
/* eslint-disable no-multiple-empty-lines */
/* eslint-disable indent */
/* eslint-disable object-shorthand */
/* eslint-disable comma-dangle */
/* eslint-disable import/order */
/* eslint-disable no-trailing-spaces */
/* eslint-disable react/jsx-indent */
/* eslint-disable object-curly-newline */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable arrow-spacing */
/* eslint-disable keyword-spacing */
/* eslint-disable object-curly-newline */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-case-declarations */
/* eslint-disable space-before-blocks */
/* eslint-disable arrow-parens */
/* eslint-disable function-paren-newline */
/* eslint-disable prefer-const */
/* eslint-disable max-len */
/* eslint-disable eqeqeq */
/* eslint-disable comma-spacing */
/* eslint-disable consistent-return */
/* eslint-disable no-console */
/* eslint-disable arrow-body-style */
/* eslint-disable no-else-return */
/* eslint-disable padded-blocks */
import React, { useEffect, useState } from 'react';
import { useModelContext } from '../../../state/NavContextProvider';
import { closeOverlayTable } from '../../../state/actions/Action';
import { category2NodeList } from '../../Table/TableView';
import CategoryView from '../../Table/Category/CategoryView';
import * as Styled from './OverlayTable.styled';

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
          <Styled.OverlayTableContainer>
            <Styled.OverlayTableBackground>
              <Styled.OverlayFixedContainer>
                <Styled.OverlayContent>
                {Object.keys(node2Category).map((category) => (
                  <CategoryView
                    key={category}
                    nodes={node2Category[category]}
                    category={category}
                    isOverLayTable={true}
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
