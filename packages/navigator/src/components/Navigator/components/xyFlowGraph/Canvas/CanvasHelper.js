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
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-case-declarations */
/* eslint-disable space-before-blocks */
/* eslint-disable arrow-parens */
/* eslint-disable function-paren-newline */
/* eslint-disable prefer-const */
/* eslint-disable max-len */
/* eslint-disable eqeqeq */
/* eslint-disable spaced-comment */
/* eslint-disable block-spacing */
/* eslint-disable consistent-return */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-lonely-if */
/* eslint-disable no-multi-spaces */
import _ from 'lodash';
/**
 * This method will execture only once during data initiallization
 * @param {*} distionary 
 * 12/20/2022 - AR
 * Simple Breath First Search to assign node to a tree
 * prerequisite - {dictionary} node hierarchy order
 * optimized for icdc_data_model
 * The level value initially assigned to each node is used for 
 * calculating the position of the node during search filter
 * 
 */
export const generateNodeTree = (dictionary, nextLevel = 2, intervel = 2) => {
    const nodes = Object.keys(dictionary);
    /**
    * initialize level to zero for all the nodes
    */
    const node2Level = nodes.reduce((acc, node) => {acc[node] = 0; return acc}, {});
    /**
     * check only distinct links are processed
     * edge1 = node1 -> node2, edge/link with be included on both nodes
     * edge1 of hierarchy node is selected 
     */
    const distinctLinks = {};
    const exploredSoureNodes = {};
    let maxLevel = 0;
    nodes.forEach((node, index) => {
        const links = dictionary[node]?.links;
        if (!links) {
          return [];
        }
        links.forEach((link, linkIndex) => {
            const source = link.source;
            const target = link.target;
            if (target && source && target !== source){
                // check for circular relation (adverse_event/case)
                if (distinctLinks[source] === target) {
                    node2Level[source] -= nextLevel;
                    node2Level[target] += nextLevel/intervel;
                } else {
                    // assign order based on the level of hierarchy node
                    distinctLinks[target] = source;
                    const levels = [node2Level[target], node2Level[source] + nextLevel];
                    let max = Math.max(...levels);
                    /**
                     * IF - hierarchy is other than root node (program)
                     * off_treatment, off_study, canine_ind to case
                     * should be above case in the tree
                     * 
                     * ELSE - will assign level to node 
                     * pushes node to bottom of the tree
                     */
                    if (index > 0 && node2Level[source] === 0) {
                        if (node2Level[target] === 0) {
                            const level = node2Level[target] + nextLevel/2;
                            node2Level[target] = level;
                            max = Math.max(max, level);
                        } else {
                            // node2Level[source] = node2Level[target] - nextLevel/2;
                            // updated 10/18/2023 - AR
                            /***
                             * incase of multiple root nodes (canine_ind, off_study)
                             * node without any parent.
                             * assign level to unexplored parent nodes
                             */
                            if (!exploredSoureNodes[source]) {
                              // assign level to parent in a tree
                              // one above child node level
                              node2Level[source] = node2Level[target] - nextLevel/2;
                            } 
                        }
                    } else {
                        node2Level[target] = max;
                    }
                    maxLevel = Math.max(max, maxLevel);
                }
                exploredSoureNodes[source] = true;
                exploredSoureNodes[target] = true;
            }
        });
    });
    /**
    * assign max level to node with no edges
    * move to bottom of the tree
    */
    const nodeWithoutEdges = _.cloneDeep(nodes).filter((node) => (
        !dictionary[node].links || (dictionary[node].links && dictionary[node].links.length == 0)));
    nodeWithoutEdges.forEach((node) => {
      if (!exploredSoureNodes[node]) {
          node2Level[node] = maxLevel;
      }
    });

    /**
    * create a complete node tree
    * calculate subtree and assign position to node
    */
    const nodeTree = {}
    for (const [key, value] of Object.entries(node2Level)) {
        if (nodeTree[value] === undefined) {
            nodeTree[value] = []
        }
        nodeTree[value].push(key);
    }
    return nodeTree;
}

/**
* generate sub tree based on filter dictionary
* use case - calculate position of the each filtered node
* @param {*} distionary
* @param {*} nodeTree
*/
export const generateSubTree = (dictionary, nodeTree) => {
    const nodes = Object.keys(dictionary);
    const subtree = {};
    let nextLevel = 0;
    for (const [key, value] of Object.entries(nodeTree)) {
       const existingNodes = value.filter((item) => nodes.includes(item));
       if (existingNodes.length > 0){
         subtree[nextLevel] = existingNodes;
         nextLevel += 1;
       }
    }
    return subtree;
}

/**
 * Calculates the node position based on node level
 * 
 * @param {*} dictionary - filtered dictionary
 * @param {*} nodeTree - complete tree
 * @param {*} tabViewWidth - calculate the position
 * @returns postion of the nodes
 * 
 */
export const getNodePosition = ({
    dictionary,
    nodeTree,
    tabViewWidth,
    xInterval = 250,
    yInterval = 90,
}) => {
    const subtree = generateSubTree(dictionary, nodeTree);
    const position = {};
    let x = tabViewWidth/2;
    for (const [level, nodes] of Object.entries(subtree)) {
        const { length } = nodes;
        /**
         * single node in a level
         * assign position to the middle of the graph horizontally (x)
         * set vertical position based on tree level
         * yIntervel to adjust the distance between each level
         */
        const y  = (Number(level)) * yInterval;
        if (length === 1){
            position[nodes[0]] = [x, y];
        } else {
            let xMin = x - (xInterval * length)/2;
            let interval = xInterval;
            /**
             * adjusted for icdc data model
             */
            if (length < 3) {
                xMin = x - (xInterval * (length + 1))
                interval = 2 * xInterval
            }
            nodes.forEach((node, index) => {
              const adjustedX = xMin + interval * (index + 1);
              position[node] = [adjustedX, y];
            });
        }
    }
    return position;
}
