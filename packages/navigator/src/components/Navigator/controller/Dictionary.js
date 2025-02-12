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

import {
  useEffect,
  useState,
} from 'react';
import axios from 'axios';
import yaml from 'js-yaml';
import {
  validateObjects,
  validateProps,
} from '../validation/ValidateSchema';
import { NodeSchema } from '../validation/NodeSchema';
import {
  Required as isPropertyRequired,
  Tag,
  propertyType as propertyRequiredType,
} from '../constant/model';

const DATA_MODEL = 'https://raw.githubusercontent.com/CBIIT/icdc-model-tool/master/model-desc/icdc-model.yml';
const DATA_MODEL_PROPS = 'https://raw.githubusercontent.com/CBIIT/icdc-model-tool/master/model-desc/icdc-model-props.yml';

/**
 * http call - retive YAML file content
 * @param {*} url
 * @returns
 */
const getYAMLFileContent = async (url) => {
  try {
    const response = await axios.get(url);
    const data = yaml.load(response.data);
    return data;
  } catch (error) {
    console.error(`model Url http error \n ${error}`);
  }
};

// set category value
const getCategoryTag = (value) => {
  if (value.Tags && Tag.CATEGORY in value.Tags) {
    return value.Tags.Category;
  }
  if (Tag.CATEGORY in value) {
    return (value.Category && value.Category.length > 0)
      ? value.Category : undefined;
  }
  return undefined;
};

/**
 *
 * @param {*} properties
 * @returns
 */
const getInclusionCount = (properties = {}) => {
  return Object.keys(properties).reduce((acc, key) => {
    const { inclusion } = properties[key];
      if (!acc[inclusion]) {
        acc[inclusion] = 0;
      }
      acc[inclusion] += 1;
      return acc;
    }, {});
}

// set required propertyType
const getPropertyType = (required) => {
  const req = `${required}`.toLowerCase(); 
  if (req === isPropertyRequired.YES) {
    return propertyRequiredType.REQUIRED;
  } else if (req === propertyRequiredType.PREFERRED) {
    return propertyRequiredType.PREFERRED;
  } else {
    return propertyRequiredType.OPTIONAL;
  }
};

// assign property details
const getNodePropertyDetails = (nodeName, yamlPropertyDetails, propertyItem) => {
  // initialize empty object
  if (!propertyItem) {
    propertyItem = {};
  }
  propertyItem.node = nodeName;
  propertyItem.description = yamlPropertyDetails.Desc;
  propertyItem.type = yamlPropertyDetails.Type || yamlPropertyDetails.Enum;
  propertyItem.enum = yamlPropertyDetails?.Enum || yamlPropertyDetails?.Type?.Enum;
  propertyItem.key = yamlPropertyDetails?.Key;
  propertyItem.propertyType = getPropertyType(yamlPropertyDetails.Req);
  propertyItem.inclusion = propertyItem.propertyType;
  propertyItem.display = (yamlPropertyDetails.Tags && yamlPropertyDetails.Tags.Labeled) 
    ? isPropertyRequired.YES : isPropertyRequired.NO;

  return propertyItem;
};

/**
* compute relations
* @param {*} relationships 
* @returns 
*/
const generateRelations = (relationships) => {
  // crate links
  const nodeReationships = {};
  for (const node in relationships) {
    /* CAUTION
    * Dst - node/point where edge originates (source)
    * Src - node/point where edge ends (target)
    */
    const nodeRelations = relationships[node] || [];
    const { Ends, Mul } = nodeRelations;
    Ends.forEach((item, index) => {
      const linkItem = {};
      const source = item.Dst;
      const target = item.Src;
      linkItem.source = source;
      linkItem.target = target;
      linkItem.relationType = Mul;
      if (!nodeReationships[source]) {
        nodeReationships[source] = [];
      }
      nodeReationships[source].push(linkItem);
    });
  }
  return nodeReationships;
}

export const getDictionary = (
  dataModelUrl = DATA_MODEL,
  dataModePropsUrl = DATA_MODEL_PROPS,
) => {

  async function getModelData() {
    const { Nodes: nodesDetails, Relationships } = await getYAMLFileContent(dataModelUrl);
    const { PropDefinitions: yamlPropertiesDetails } = await getYAMLFileContent(dataModePropsUrl);
    // read YMAL file and format data value
    const nodeReationships = generateRelations(Relationships);
    const modelData = {};
    for (const [key, value] of Object.entries(nodesDetails)) {
      // validate YAML content / node - limited to runtime
      validateProps(
        NodeSchema,
        value,
        validateObjects.YAML_NODE
      );

      // construct data model
      const item = {};
      item.id = key;
      item.title = key;
      item.category = getCategoryTag(value);
      item.assignment = value.Tags?.Assignment || '';
      item.class = value.Tags?.Class || '';
      item.desc = value?.Desc || '';
      item.description = item.desc || '';
      item.template = value.Tags?.Template || '';

      // add node properties
      if (value.Props !== null && value.Props.length > 0) {
        const propertiesName = value.Props;
        const properties = propertiesName
          .reduce((acc, name, index) => {
            // add property details
            if (yamlPropertiesDetails[name]) {
              const propertyDetail = getNodePropertyDetails(key, yamlPropertiesDetails[name], acc[name]);
              acc[name] = propertyDetail;
              acc[name].propertyName = name;
            }
            
            return acc;
          }, {});
        item.properties = properties;
        item.inclusionCount = getInclusionCount(properties);
      }
      // assign links
      item.links = nodeReationships[key];
      modelData[key] = item;
    }
    return modelData;
  }

  // resolve promise and retrive data
  const [dictionary, setDictionary] = useState(null);
  useEffect(() => {
    const controller = new AbortController();
    getModelData().then((result) => {
      setDictionary(result);
    });
    return () => {
      // cancel the request before component unmounts
      controller.abort();
    };
  }, []);

  return { dictionary };
}
