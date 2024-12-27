import React from 'react';
import CheckBoxView from './CheckBoxView';

const FacetView = ({
  checkBoxItems,
}) => {
  return (
    <>
      {
        Object.keys(checkBoxItems).map(
          (item) => (
            <div>
              <CheckBoxView checkBoxItem={checkBoxItems[item]} />
            </div>
          )
        )
      }
    </>
  );
};
  
export default FacetView;
