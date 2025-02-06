import React from 'react';
import CheckBoxView from './CheckBoxView';

const FacetView = ({
  checkBoxItems,
}) => {
  const itemCount = Object.keys(checkBoxItems || {}).length;
  return (
    <>
      {
        Object.keys(checkBoxItems).map(
          (item, index) => (
            <div>
              <CheckBoxView
                checkBoxItem={checkBoxItems[item]}
                key={index}
                display={itemCount > (index + 1)}
              />
            </div>
          )
        )
      }
    </>
  );
};
  
export default FacetView;
