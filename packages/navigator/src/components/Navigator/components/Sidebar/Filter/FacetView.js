import React from 'react';
import CheckBoxView from './CheckBoxView';

const FacetView = ({
  checkBoxItems,
  facetItemCount,
  sortBy,
}) => {
  const itemCount = Object.keys(checkBoxItems || {}).length;
  const facetItemItems = Object.keys(checkBoxItems || {}).map((key) => {
    const item = checkBoxItems[key];
    return {
      facetItem: item.facetItem,
      isChecked: item.isChecked,
      count: facetItemCount[item.facetItem]?.length || 0,
    };
  });

  /**
  * client table aplhanumeric sorting for column table
  * uses string prototype function for sorting
  */
  const alphaNumericSort = (a, b) => `${a[sortBy]}`.localeCompare(
    `${b[sortBy]}`, undefined, {
      numeric: true,
      sensitivity: 'base',
    },
  );

  const sortFacetItems = facetItemItems.sort((a, b) => ((sortBy === 'count')
    ? alphaNumericSort(b, a) : alphaNumericSort(a, b))
    .sort((a1, b1) => ((a1.isChecked === b1.isChecked) ? 0 : a1.isChecked ? -1 : 1)));

  return (
    <>
      {
        sortFacetItems.map(
          (item, index) => (
            <div>
              <CheckBoxView
                checkBoxItem={checkBoxItems[item.facetItem]}
                key={index}
                display={itemCount > (index + 1)}
              />
            </div>
          ),
        )
      }
    </>
  );
};

export default FacetView;
