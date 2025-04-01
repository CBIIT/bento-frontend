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
/* eslint-disable arrow-spacing */
/* eslint-disable keyword-spacing */
/* eslint-disable object-curly-newline */
/* eslint-disable no-unused-vars */
/* eslint-disable padded-blocks */
/* eslint-disable spaced-comment */

import React,
{ 
  useCallback, 
  useEffect, 
  useState
} from 'react';
import * as Styled from './Node.styled';
import { Handle, Position } from '@xyflow/react';
import { useModelContext } from '../../../state/NavContextProvider';
import {
  onNodeFocus,
  showOverlayTable
} from '../../../state/actions/Action';

const NodeView = ({
  id,
  data,
  currentSearchKeyword,
  expandNodeView,
  highlightingNode,
  highlightParentNodes,
}) => {

  const { context = {}} = useModelContext();
  const { dispatch, focusedNodeId, matches = {}, isSearchMode } = context;

  const [display, setDisplay] = useState(false);

  const {
    label,
    icon,
    iconColor,
    category,
    matchedNodeNameQuery,
    summary
  } = data;

  //dispatch event - on table view
  const displayOverviewTable = () => {
    dispatch(showOverlayTable(id));
  };

  /**
   * expand node in normal mode (when search mode is false)
   * use view option to adjust the fontSize on property dialog
   */
  const toggleNode = () => {
    if(isSearchMode) {
      displayOverviewTable();
    } else {
      setDisplay(!display);
      const focusNode = !display ? id : null;
      dispatch(onNodeFocus(focusNode));
    }
  };

  /**
   * light node based on reasult of search query
   */
  useEffect(() => {
    if (`${label}`.toLowerCase() !== focusedNodeId?.id) {
      setDisplay(focusedNodeId === id);
    }
  }, [focusedNodeId]);

  return (
    <Styled.NodeOuterDiv
      className="nodeOuterDiv"
      display={display && !isSearchMode}
    >
      <Styled.NodeContainer
        className="nodeContainer"
        display={display}
        match={(matches || {})[label]}
        isSearchMode={isSearchMode}
      >
        {
          (display) && (
            <Styled.CloseIconBar className="closeIconBar">
              <Styled.CloseButton onClick={toggleNode} />
            </Styled.CloseIconBar>
          )
        }
        <Styled.ContentWrapper className="contentWrapper">
          <Styled.NodeTitle className="nodeTitle" display={display}>
            <Styled.NodeButton
              className="nodeButton"
              match={(matches || {})[label]}
              isSearchMode={isSearchMode}
              onClick={toggleNode}
            >
              <Styled.NodeButtonInnerWrapper
                className="nodeButtonInnerWrapper"
              >
                <Styled.NodeBackground className="nodeBackground" catgoryColor={iconColor}>
                  <Styled.IconWrapper
                    className="iconWrapper"
                    catgoryColor={iconColor}
                  >
                    <Styled.CategoryIcon
                      className="categoryIcon"
                      src={icon}
                      alt="category icon"
                    />
                  </Styled.IconWrapper>
                </Styled.NodeBackground>
                <Styled.LabelWrapper className="labelWrapper">
                  {`${label}`.toLowerCase()}
                </Styled.LabelWrapper>
              </Styled.NodeButtonInnerWrapper> 
            </Styled.NodeButton>
          </Styled.NodeTitle>
        </Styled.ContentWrapper>
        <Styled.Summary className="nodeSummary" display={display}>
          <Styled.SummaryList className="nodeSummaryList">
            {
              Object.keys(summary).map((key, index)=> (
              <Styled.ListItem key={index} className="summaryListItem">
                <Styled.ListItemLabel className="summaryListItemLabel">
                  {`${key}: `}
                </Styled.ListItemLabel>
                <Styled.ListItemValue className="summaryListItemValue">
                  {summary[key]}
                </Styled.ListItemValue>
              </Styled.ListItem>))
            }
          </Styled.SummaryList>
        </Styled.Summary>
        <Styled.FlowHandle
          className="nodeTargetPt"
          type="target"
          position={Position.Top}
        />
        <Styled.FlowHandle
          className="nodeSourcePt"
          type="source"
          position={Position.Bottom}
        />
      </Styled.NodeContainer>
      <Styled.ViewPropertyTableBtn
        className="viewPropertyTableBtn"
        onClick={displayOverviewTable}
        display={display}
      >
        View Properties
      </Styled.ViewPropertyTableBtn>
    </Styled.NodeOuterDiv>
  );
};

export default NodeView;
