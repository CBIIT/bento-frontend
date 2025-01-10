import React, { useState } from 'react';
import PropertyView from '../Property/PropertyView';
import * as Styled from './Node.styled';
import DownloadButtonView from '../../PDF/DownloadBtn';

const NodeView = ({
  node,
  title,
  category,
  description,
  isOverLayTable = false
}) => {

  const [expand, setExpand] = useState(isOverLayTable);
  const propertiesCount = Object.keys(node.properties || {}).length;

  return (
    <Styled.Container className={`${category}_${title}`}>
      <Styled.TitleAndDescContainer className="titleAndDescContainer">
        <Styled.NodeTitle className={`nodeTitle_${title}`}>
          {title}
        </Styled.NodeTitle>
        <Styled.TagsAndDescriptionContainer className="tagsAndDescriptionContainer">
          <Styled.NodeDescription className={`nodeDescription_${title}`}>
            {description}
          </Styled.NodeDescription>
          <Styled.TagsAndBtnContainer className="tagsAndBtnContainer">
            <div>
              <Styled.DisplayPropertyTableButton
                className="displayPropertyTableButton"
                onClick={() => setExpand(!expand)}
                variant="contained"
                disabled={isOverLayTable}
                startIcon={
                  expand ? (
                    <Styled.MuiCollapseIcon isOverLayTable={isOverLayTable} />
                  ) : (
                    <Styled.MuiExpandIcon isOverLayTable={isOverLayTable} />
                  )
                }
              >
                <Styled.ButtonCountLabel className="buttonCountLabel">
                  {propertiesCount}
                </Styled.ButtonCountLabel>
                <Styled.ButtonTextLabel className="buttonTextLabel">
                  { propertiesCount === 1 ? ' property' : ' properties' }
                </Styled.ButtonTextLabel>
              </Styled.DisplayPropertyTableButton>
            </div>
            <Styled.AssignmentAndClassTags className="assignmentAndClassTags">
              {node.assignment && (
                <Styled.NodeLabel className="nodeLabel">
                  <span>Assignment:</span>
                  <Styled.NodeAssignment className="nodeAssignment">
                    {node.assignment}
                  </Styled.NodeAssignment>
                </Styled.NodeLabel>
              )}
              {node.class && (
                <Styled.NodeLabel className="nodeLabel">
                  Class:
                  <Styled.NodeClass className="nodeClass">
                    {node.class}
                  </Styled.NodeClass>
                </Styled.NodeLabel>
              )}
            </Styled.AssignmentAndClassTags>
            <Styled.DownloadContainer className="downloadContainer">
              <Styled.MuiButtonGroup className="muiButtonGroup">
                {/* <replace node required, preferred field val> */}
                <DownloadButtonView
                  category={category}
                  nodes={[{ ...node, required: [], preferred: []}]}
                />
              </Styled.MuiButtonGroup>
            </Styled.DownloadContainer>
          </Styled.TagsAndBtnContainer>
        </Styled.TagsAndDescriptionContainer>
        
      </Styled.TitleAndDescContainer>
      {expand && (
        <PropertyView properties={node.properties || {}} />
      )}
    </Styled.Container>
  );
};

export default NodeView;
