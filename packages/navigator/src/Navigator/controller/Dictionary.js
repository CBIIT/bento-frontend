/* eslint-disable import/prefer-default-export */
/* eslint-disable no-param-reassign */
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
  return null;
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
  const results = Object.keys(properties).reduce((acc, key) => {
    const { inclusion } = properties[key];
    if (!acc[inclusion]) {
      acc[inclusion] = 0;
    }
    acc[inclusion] += 1;
    return acc;
  }, {});
  return results;
};

// set required propertyType
const getPropertyType = (required) => {
  if (required) {
    const req = `${required}`.toLowerCase();
    if (req === isPropertyRequired.YES || req === 'true') {
      return propertyRequiredType.REQUIRED;
    }
    if (req === propertyRequiredType.PREFERRED) {
      return propertyRequiredType.PREFERRED;
    }
  }
  return propertyRequiredType.OPTIONAL;
};

// isIncludedInTemplate
const isIncludedInTemplate = (value) => (`${value}`.toLowerCase() === 'yes');

// assign property details
const getNodePropertyDetails = (nodeName, yamlPropertyDetails) => ({
  node: nodeName,
  description: yamlPropertyDetails.Desc,
  type: yamlPropertyDetails.Type || yamlPropertyDetails.Enum,
  enum: yamlPropertyDetails?.Enum || yamlPropertyDetails?.Type?.Enum,
  key: yamlPropertyDetails?.Key,
  Term: yamlPropertyDetails?.Term,
  source: yamlPropertyDetails?.Src || '',
  propertyType: getPropertyType(yamlPropertyDetails.Req),
  inclusion: getPropertyType(yamlPropertyDetails.Req),
  display: (yamlPropertyDetails.Tags && yamlPropertyDetails.Tags.Labeled)
    ? isPropertyRequired.YES : isPropertyRequired.NO,
  isIncludedInTemplate: isIncludedInTemplate(yamlPropertyDetails?.Tags?.Template),
});

const getCdeMap = (property, node) => {
  const { Term, propertyName } = property;
  const caDSRTerm = Term?.find((term) => term?.Origin?.toLowerCase()?.indexOf('cadsr') !== -1);
  if (caDSRTerm) {
    const key = `${node}.${propertyName};${caDSRTerm?.Code}.${caDSRTerm.Version}`;
    const value = {
      CDEFullName: caDSRTerm?.CDEFullName,
      CDECode: caDSRTerm?.Code,
      CDEVersion: caDSRTerm?.Version,
      CDEOrigin: caDSRTerm?.Origin,
    };
    return [key, value];
  }
  return null;
};

/**
* compute relations
* @param {*} relationships
* @returns
*/
const generateRelations = (relationships) => {
  // crate links
  const nodeReationships = {};
  Object.keys(relationships).forEach((node) => {
    /* CAUTION
    * Dst - node/point where edge originates (source)
    * Src - node/point where edge ends (target)
    */
    const nodeRelations = relationships[node] || {};
    const { Ends, Mul } = nodeRelations;
    Ends.forEach((item) => {
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
  });
  return nodeReationships;
};

export async function getModelData(
  nodesYamlFilePath,
  propertiesYamlFilePath,
) {
  const {
    Nodes: nodesDetails,
    Relationships,
    Version: version = '',
  } = await getYAMLFileContent(nodesYamlFilePath);
  const {
    PropDefinitions: yamlPropertiesDetails,
  } = await getYAMLFileContent(propertiesYamlFilePath);

  // read YMAL file and format data value
  const nodeReationships = generateRelations(Relationships);
  const modelData = {};
  const cdeMap = new Map();

  Object.entries(nodesDetails).forEach(([key, value]) => {
    // validate YAML content / node - limited to runtime
    validateProps(
      NodeSchema,
      value,
      validateObjects.YAML_NODE,
    );

    // construct data model
    // set node view configurations
    const item = {};
    item.id = key;
    item.title = key;
    item.category = getCategoryTag(value);
    item.assignment = value.Tags?.Assignment || '';
    item.class = value.Tags?.Class || '';
    item.desc = value?.Desc || '';
    item.description = item.desc || '';
    item.template = value.Tags?.Template || '';
    item.isTemplate = value.Tags?.Template === 'Yes' || false;

    // add node properties
    if (value.Props !== null && value.Props.length > 0) {
      const propertiesName = value.Props;
      const properties = propertiesName
        .reduce((acc, name) => {
          // add property details
          if (yamlPropertiesDetails[name]) {
            const propertyDetail = getNodePropertyDetails(
              key,
              yamlPropertiesDetails[name],
            );
            acc[name] = propertyDetail;
            acc[name].propertyName = name;
            acc[name].propertyId = `${key}_${name}`;
            const cdeMapValue = getCdeMap(propertyDetail, key);
            if (cdeMapValue) {
              cdeMap.set(cdeMapValue[0], cdeMapValue[1]);
            }
          }
          return acc;
        }, {});

      item.properties = properties;
      item.inclusionCount = getInclusionCount(properties);
      item.propertyCount = Object.keys(properties).length;
    }
    // assign links
    item.links = nodeReationships[key];
    modelData[key] = item;
  });
  console.log(cdeMap);
  // model version info
  return {
    dictionary: modelData,
    versionInfo: {
      version,
    },
  };
}

export const getDictionary = (
  nodesYamlFilePath,
  propertiesYamlFilePath,
) => {
  // resolve promise and retrive data
  const [dictionary, setDictionary] = useState(null);
  useEffect(() => {
    const controller = new AbortController();
    getModelData(nodesYamlFilePath, propertiesYamlFilePath).then((result) => {
      setDictionary(result);
    });
    return () => {
      // cancel the request before component unmounts
      controller.abort();
    };
  }, []);
  return { dictionary };
};
