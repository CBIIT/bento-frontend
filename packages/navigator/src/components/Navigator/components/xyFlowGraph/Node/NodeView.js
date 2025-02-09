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

  /**
   * expand node in normal mode (when search mode is false)
   * use view option to adjust the fontSize on property dialog
   */
  const toggleNode = () => {
    setDisplay(!display);
    const focusNode = !display ? id : null;
    dispatch(onNodeFocus(focusNode));
  };

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

  console.log(isSearchMode);

  /**
   * light node based on reasult of search query
   */
  // useEffect(() => {
  //   if (!expandNodeView) {
  //     setDisplay(false);
  //   } else {
  //     if (`${label}`.toLowerCase() === highlightingNode?.id) {
  //       setDisplay(true);
  //     } else {
  //       setDisplay(false);
  //     }
  //   }
  // }, [expandNodeView, highlightingNode]);

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
            <Styled.NodeButton className="nodeButton" onClick={toggleNode}>
              <Styled.NodeButtonInnerWrapper
                className="nodeButtonInnerWrapper"
                match={(matches || {})[label]}
                isSearchMode={isSearchMode}
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
