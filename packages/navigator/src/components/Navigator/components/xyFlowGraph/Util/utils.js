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
/* eslint-disable comma-spacing */
/* eslint-disable consistent-return */
/* eslint-disable no-console */
/* eslint-disable arrow-body-style */
/* eslint-disable no-else-return */
/* eslint-disable padded-blocks */

import studyIcon from '../Canvas/assets/study.svg';
import caseIcon from '../Canvas/assets/case.svg';
import clinicalTrialIcon from '../Canvas/assets/clinical_trial.svg';
import adminIcon from '../Canvas/assets/administrative.svg';
import biospecimenIcon from '../Canvas/assets/biospecimen.svg';
import analysisIcon from '../Canvas/assets/analysis.svg';
import dataFileIcon from '../Canvas/assets/data_file.svg';
import clinicalIcon from '../Canvas/assets/clinical.svg';

const graphIcons = {
  administrative: adminIcon,
  study: studyIcon,
  case: caseIcon,
  clinical_trial: clinicalTrialIcon,
  biospecimen: biospecimenIcon,
  analysis: analysisIcon,
  data_file: dataFileIcon,
  clinical: clinicalIcon,
};

const graphIconColors = {
  administrative: '#9b2e20',
  study: '#9875ff',
  case: '#ff7f16',
  clinical_trial: '#02a1bb',
  biospecimen: '#00785a',
  analysis: '#b533a9',
  data_file: '#00ad0c',
  clinical: '#1b75bc',
};
/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
/**
 * Get subgroup links from link
 * @param {object} link - array of links
 * @param {object} nameToNode - key (node name) value (node object) map
 * @param {string} sourceId - source id for subgroup links
 * This function traverse links recursively and return all nested subgroup lnks
 */
const getSubgroupLinks = (link, nameToNode, sourceId) => {
  let subgroupLinks = [];
  if (link.subgroup) {
    link.subgroup.forEach((sgLink) => {
      if (sgLink.subgroup) {
        subgroupLinks = subgroupLinks.concat(
          getSubgroupLinks(sgLink, nameToNode, sourceId)
        );
      } else {
        subgroupLinks.push({
          source: nameToNode[sourceId],
          target: nameToNode[sgLink.target_type],
          exists: 1,
          ...sgLink,
        });
      }
    });
  }
  return subgroupLinks;
};

/**
 * reactflow node details 
 * @param {*} nodes 
 * @returns 
 */
const generateNodes = (nodes) => {
  const generatedNodes = nodes.map((node, index) => {
    const { inclusionCount } = node;
    return {
      type: 'custom',
      position: { x: 0, y: 0 },
      id: `${node.id}`,
      category: `${node.category}`,
      data: {
        label: node.title,
        icon: graphIcons[node.category],
        iconColor: graphIconColors[node.category],
        category: `${node.category}`,
        summary: {
          Assignment: `${node.assignment}`,
          Class: `${node.class}`,
          Required_Properties: inclusionCount?.required || 0,
          Preferred_Properties: inclusionCount?.preferred || 0,
          Optional_Properties: inclusionCount?.optional || 0,
        }
      },
    };
  });
  // console.log(generatedNodes);

  return generatedNodes;
};

/**
 * reactflow edge details 
 * @param {*} nodes 
 * @returns 
 */
const generateEdges = (edges) => {
  // type: 'custom',
  const DEFAULT_EDGE_TYPE = {
    type: 'custom',
    animated: false,
  };

  const generatedEdges = edges.map((edge, index) => {
    return {
      ...DEFAULT_EDGE_TYPE,
      id: `${edge.source}->${edge.target}`,
      source: `${edge.source}`,
      target: `${edge.target}`,
    };
  });

  return generatedEdges;
};

const generateFlowData = (nodes, edges) => {
  return {
    nodes: generateNodes(nodes),
    edges: generateEdges(edges),
  };
};

/**
 * @method createNodesAndEdges
 *
 */
export function createNodesAndEdges(
  dictionary,
) {
  const nodes = Object.keys(dictionary)
    .map((nodeName) => dictionary[nodeName]);
  
  const edges = Object.keys(dictionary)
    .reduce((acc, node) => {
      const links = dictionary[node].links || [];
      acc = [...acc, ...links];
      return acc;
    }, []);
  
  // assignNodePositions
  return generateFlowData(nodes, edges);
}
