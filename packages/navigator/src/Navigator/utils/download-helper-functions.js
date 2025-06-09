/* eslint-disable no-param-reassign */
/** cluster props according to the category for PDF download */
export function sortByCategory(c2nl, dictionary) {
  const keys = Object.keys(c2nl);
  return Object.values(dictionary).sort((a, b) => keys.indexOf(`${a.category}`) - keys.indexOf(`${b.category}`));
}

export function category2NodeList(dictionary) {
  const res = Object.keys(dictionary).filter(
    (id) => id.charAt(0) !== '_' && id === dictionary[id].id,
  ).map(
    (id) => dictionary[id],
  ).filter(
    (node) => node.category && node.id,
  )
    .reduce(
      (lookup, node) => {
        if (!lookup[node.category]) {
          lookup[node.category] = [];
        }
        lookup[node.category].push(node);
        return lookup;
      }, {},
    );
  return res;
}
