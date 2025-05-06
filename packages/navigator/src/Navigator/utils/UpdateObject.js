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
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable arrow-spacing */
/* eslint-disable keyword-spacing */
/* eslint-disable object-curly-newline */
/* eslint-disable no-prototype-builtins */
/* eslint-disable operator-linebreak */
/* eslint-disable no-extra-semi */

export function updateNestedObject(original, updates) {
    // If updates is not an object, return updates (base case)
    if (typeof updates !== 'object' || updates === null) {
        return updates;
    }

    // Loop through each key in the updates object
    for (const key in updates) {
        if (updates.hasOwnProperty(key)) {
            // If the key exists in the original object and is an object, recurse
            if (
                typeof original[key] === 'object' &&
                original[key] !== null &&
                typeof updates[key] === 'object'
            ) {
                original[key] = updateNestedObject(original[key], updates[key]);
            } else {
                // Otherwise, directly assign the value from updates
                original[key] = updates[key];
            }
        }
    }
    return original;
};

export function updateNestedValue(obj, value, targetKey = 'isChecked') {
  // Iterate over each key in the object
  for (const key in obj) {
    // Check if the current property is an object
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      // Recursively call the function for nested objects
      updateNestedValue(obj[key], false, targetKey);
    } else if (key === targetKey) {
      // Update the isChecked property to true
      obj[targetKey] = value;
    }
  }
};
