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
