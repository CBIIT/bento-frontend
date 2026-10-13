function isSynonymEntry(item) {
  return item !== null && typeof item === 'object' && item.type === 'associatedIds';
}

/**
 * Participant IDs first, then synonyms. Order within each group is unchanged.
 * Returns a copy so the stored selection is not rearranged on a later render.
 *
 * @param {Array} items
 * @returns {Array}
 */
export default function sortSearchEntries(items) {
  const participants = [];
  const synonyms = [];
  (items || []).forEach((item) => {
    if (isSynonymEntry(item)) {
      synonyms.push(item);
    } else {
      participants.push(item);
    }
  });
  return participants.concat(synonyms);
}
