import { facetSectionType, filterByNode } from "../../../controller/Filter";

const inclusiveNodeFacet = {
  core: 'core',
  extended: 'extended',
  primary: 'primary',
  secondary: 'secondary'
}

export const getFacetItemCount = (
    currState,
    activeFilters,
    node2FacetItem,
    props2FacetItem
) => {
    console.log(`node2FacetItem props2FacetItem`)
    console.log(activeFilters);
    console.log(node2FacetItem);
    console.log(props2FacetItem);

    const { filterSections } = currState;
    console.log(filterSections);

    /**
     * node facet Item count
     */
    const sections = Object.keys(activeFilters[facetSectionType.filterByNode] || {});
    const selectedNodes = sections.reduce(
      (acc, facetItem) => {
        acc.push(node2FacetItem[facetItem]);
        return acc;
    }, []);
    // const distinctNodes = new Set(selectedNodes);
    console.log('GET DISTINCT NODES');
    console.log(selectedNodes);

    const commonNodes = selectedNodes[0].filter(item =>
      selectedNodes.every(array => array.includes(item))
    );
    console.log('commonNodes')
    console.log(commonNodes);

    const uniqueNodes = selectedNodes.reduce((acc, arr) => acc = [...acc, ...arr], []);
    console.log('all distinct');
    console.log(uniqueNodes)

};