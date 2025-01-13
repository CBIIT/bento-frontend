import React, { useEffect, useState } from 'react';
import { useModelContext } from '../../../state/NavContextProvider';
import { onToggleCheckBox } from '../../../state/actions/Action';
import {
  StyledCheckBoxIcon,
  StyledLabelDiv,
  StyledLabelSpan,
  StyledListItem,
  StyledMuiCheckBox,
  StyledMuiDivider
} from './CheckBox.styled';

const alignment = "flex-start";

const CheckBoxView = ({
  checkBoxItem
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
  }

  return (
     <>
     {
      (facetItemCount[facetItem]?.length > 0 || isChecked) && (
        <>
          <StyledListItem
            width={1}
            button
            alignItems={alignment}
            selected={true}
            onClick={handleToggleCheckBox}
          >
            <StyledMuiCheckBox
              onClick={handleToggleCheckBox}
              checkedIcon={ <StyledCheckBoxIcon /> }
              checked={isChecked}
              tabIndex={-1}
              disableRipple
              color="secondary"
            />
            <StyledLabelDiv>
              <StyledLabelSpan>
                  {facetItem}
              </StyledLabelSpan>
              <span>
                {`(${facetItemCount[facetItem]?.length || 0})`}
              </span>
            </StyledLabelDiv>
          </StyledListItem>
          <StyledMuiDivider checkboxItem={true} />
        </>
      )
     }
     </>
  );
}

export default CheckBoxView;
