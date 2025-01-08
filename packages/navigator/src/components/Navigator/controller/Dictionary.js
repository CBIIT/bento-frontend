import React, { useEffect, useState } from 'react';
import axios from 'axios';
import yaml from 'js-yaml';
import { validateObjects, validateProps } from '../validation/ValidateSchema';
import { NodeSchema } from '../validation/NodeSchema';
import { Required as isPropertyRequired, Tag, propertyType as propertyRequiredType } from '../constant/model';

const DATA_MODEL = "https://raw.githubusercontent.com/CBIIT/icdc-model-tool/master/model-desc/icdc-model.yml";
const DATA_MODEL_PROPS = "https://raw.githubusercontent.com/CBIIT/icdc-model-tool/master/model-desc/icdc-model-props.yml";

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
  } else if (Tag.CATEGORY in value) {
    return (value.Category && value.Category.length > 0)
      ? value.Category : undefined;   
  } else {
    return undefined;
  }
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
              acc[name] = getNodePropertyDetails(key, yamlPropertiesDetails[name], acc[name]);
              acc[name].propertyName = name;
            }
            return acc;
          }, {});
        item.properties = properties;
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
