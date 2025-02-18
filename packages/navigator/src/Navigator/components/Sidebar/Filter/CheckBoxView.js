import React from 'react';
import { useModelContext } from '../../../state/NavContextProvider';
import { onToggleCheckBox } from '../../../state/actions/Action';
import {
  StyledCheckBoxIcon,
  StyledCountDiv,
  StyledCountSpan,
  StyledLabelAndCount,
  StyledLabelDiv,
  StyledLabelSpan,
  StyledListItem,
  StyledMuiCheckBox,
  StyledMuiDivider,
} from './CheckBox.styled';

const alignment = 'flex-start';
const isTrue = true;
const CheckBoxView = ({
  checkBoxItem,
  display,
}) => {
  const { isChecked, facetItem } = checkBoxItem;
  /**
  * use context access data model state
  */
  const { context } = useModelContext();
  const { facetItemCount = {} } = context;

  const handleToggleCheckBox = () => {
    const { dispatch } = context;
    dispatch(onToggleCheckBox({
      ...checkBoxItem,
      isChecked: !isChecked,
    }));
  };
  const matchedNodeCount = facetItemCount[facetItem]?.length || 0;
  return (
    <>
      {
        (matchedNodeCount > 0 || isChecked) && (
          <>
            <StyledListItem
              width={1}
              button
              alignItems={alignment}
              isChecked={isChecked}
              selected={isTrue}
              matchedNodeCount={matchedNodeCount}
              onClick={handleToggleCheckBox}
            >
              <StyledMuiCheckBox
                onClick={handleToggleCheckBox}
                checkedIcon={<StyledCheckBoxIcon />}
                checked={isChecked}
                tabIndex={-1}
                disableRipple
                color="secondary"
              />
              <StyledLabelAndCount>
                <StyledLabelDiv>
                  <StyledLabelSpan>
                    {facetItem}
                  </StyledLabelSpan>
                </StyledLabelDiv>
                <StyledCountDiv>
                  <StyledCountSpan>
                    {matchedNodeCount}
                  </StyledCountSpan>
                </StyledCountDiv>
              </StyledLabelAndCount>
            </StyledListItem>
            {display && (<StyledMuiDivider checkboxItem={isTrue} />) }
          </>
        )
      }
    </>
  );
};

export default CheckBoxView;
