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
