/* eslint-disable no-undef */
/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-continue */
/* eslint-disable no-console */
import _ from 'lodash';
import React from 'react';
import FileSaver, { saveAs } from 'file-saver';
import PropTypes from 'prop-types';
import JSZip from 'jszip';
import { pdf } from '@react-pdf/renderer';
import logo from '../components/PDF/assets/icdc_nih_logo.png';
import LandscapePDFDoc from '../components/PDF/landscape/Pdf';

const tsvMiddleware = (node) => {
  let line = 'type';
  const { links } = node;

  if (links && links.length) {
    links.forEach((c) => {
      if (c.targetId && String(c.generatedType).toLowerCase() !== 'loader-generated') {
        line += `${'\t'} ${c.target_type}.${c.targetId}`;
      }
    });
  }
  return line;
};

export const convertToTSV = (node) => {
  let line = tsvMiddleware(node);
  const propertyKeys = Object.keys(node.properties || {});
  propertyKeys.forEach((key) => {
    line += ('\t').concat(`${key}`);
  });
  const text = `${line}\r\n${node.title}`;
  return text;
};

export const downloadTSV = (
  node,
  fileName = '',
) => {
  let line = tsvMiddleware(node);
  Object.keys(node.properties).forEach((key) => {
    line += ('\t').concat(`${key}`);
  });
  const text = `${line}\r\n${node.title}`;
  const exportData = new Blob([text], { type: 'data:text/tab-separated-values' });
  saveAs(exportData, `${fileName}.tsv`);
};

const dataDictionaryTemplatePath = 'FIXME';
const appname = 'Data Dictionary Vizualizations';

export function createFileName(fileName, filePreFix, modelVersion = undefined, isTemplate = false) {
  const date = new Date();
  const yyyy = date.getFullYear();
  let dd = date.getDate();
  let mm = (date.getMonth() + 1);
  if (dd < 10) { dd = `0${dd}`; }

  if (mm < 10) { mm = `0${mm}`; }

  const todaysDate = `${yyyy}-${mm}-${dd}`;

  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();

  if (hours < 10) { hours = `0${hours}`; }

  if (minutes < 10) { minutes = `0${minutes}`; }

  if (seconds < 10) { seconds = `0${seconds}`; }

  if (isTemplate && modelVersion) {
    return filePreFix ? `${filePreFix}Data_Loading_Template_${fileName}_${modelVersion}`
      : `${fileName}_${modelVersion}`;
  }

  return filePreFix ? `${filePreFix}${fileName}${modelVersion ? `_${modelVersion}` : `${todaysDate} ${hours}-${minutes}-${seconds}`}`
    : `${fileName}${modelVersion ? `_${modelVersion}` : `${todaysDate} ${hours}-${minutes}-${seconds}`}`;
}

export const generatePdfDocument = async (
  nodes,
  fileName = '',
  iconSrc = logo,
) => {
  const PdfView = LandscapePDFDoc;
  const blob = await pdf((
    <PdfView
      nodes={nodes}
      pdfDownloadConfig={{
        iconSrc,
      }}
    />
  )).toBlob();
  const pdfFileName = createFileName(fileName);
  saveAs(blob, `${pdfFileName}.pdf`);
  return true;
};

const concatTwoWords = (w1, w2) => {
  if (w1.length === 0) return w2;
  if (w2.length === 0) return w1;
  return `${w1} ${w2}`;
};

export const truncateLines = (str, maxCharInRow = 10, breakwordMinLength = 12) => {
  const wordsList = str.split(' ');
  const res = [];
  let currentLine = '';
  for (let i = 0; i < wordsList.length; i += 1) {
    // if adding a new word will make the current line too long
    if (concatTwoWords(currentLine, wordsList[i]).length > maxCharInRow) {
      // if the new word itself is too long, break it
      if (wordsList[i].length > breakwordMinLength) {
        let breakPos = maxCharInRow - currentLine.length - 1;
        if (currentLine.length > 0) breakPos -= 1; // 1 more for space
        res.push(`${concatTwoWords(currentLine, wordsList[i].substring(0, breakPos))}-`);

        // break the rest of the new word if it's still too long
        while (breakPos + maxCharInRow < wordsList[i].length) {
          const nextBreakPos = (breakPos + maxCharInRow) - 1;
          res.push(`${wordsList[i].substring(breakPos, nextBreakPos)}-`);
          breakPos = nextBreakPos;
        }
        currentLine = wordsList[i].substring(breakPos);
      } else { // else, end current line and create a new line
        if (currentLine.length > 0) { // avoid adding first empty line
          res.push(currentLine);
        }
        currentLine = wordsList[i];
      }
    } else { // else, just add the new word to current line
      currentLine = concatTwoWords(currentLine, wordsList[i]);
    }
  }
  res.push(currentLine);
  return res;
};

/**
 * Filters out properties that should not be included in the template.
 *
 * @param {Object} node DMN node object.
 * @returns {Object} Property object with properties that should not be in the template removed.
 */
export const filterProperties = (node) => {
  const { properties } = node;
  const filteredProperties = {};

  for (const key in properties) {
    if (!properties[key].isIncludedInTemplate) {
      continue;
    }
    filteredProperties[key] = properties[key];
  }

  return filteredProperties;
};

/**
 * Little helper to extract the type for some dictionary node property.
 * Export just for testing.
 * @param {Object} property one of the properties of a dictionary node
 * @return {String|Array<String>} string for scalar types, array for enums
 *                   and other listish types or 'UNDEFINED' if no
 *                   type information availabale
 */
export const getType = (property) => {
  let type = 'UNDEFINED';
  if ('type' in property) {
    if (typeof property.type === 'string') {
      type = property.type;
    } else {
      type = property.type;
    }
  } else if ('enum' in property) {
    type = property.enum;
  } else if ('oneOf' in property) {
    // oneOf has nested type list - we want to flatten nested enums out here ...
    type = property.oneOf
      .map((item) => getType(item))
      .reduce(
        (flatList, it) => {
          if (Array.isArray(it)) {
            return flatList.concat(it);
          }
          flatList.push(it);
          return flatList;
        }, [],
      );
  } else if ('anyOf' in property) {
    // anyOf has nested type list
    type = property.anyOf
      .map((item) => getType(item))
      .reduce(
        (flatList, it) => {
          if (Array.isArray(it)) {
            return flatList.concat(it);
          }
          flatList.push(it);
          return flatList;
        }, [],
      );
  } else {
    type = 'UNDEFINED';
  }

  return type;
};

export function capitalizeFirstLetter(str) {
  const res = str.replace(/_/gi, ' ');
  return res.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
}

export const downloadTemplate = (format, nodeId) => {
  if (format === 'tsv' || format === 'json') {
    const templatePath = `${dataDictionaryTemplatePath}${nodeId}?format=${format}`;
    window.open(templatePath);
  }
};

export const downloadAllTemplates = (fullDictionary, prefix = 'ICDC_') => {
  // eslint-disable-next-line no-unused-vars
  const fullDictionaryTemplates = Object.fromEntries(Object.entries(fullDictionary));
  const nodesValueArray = Object.values(fullDictionaryTemplates);
  const nodesKeyArray = Object.keys(fullDictionaryTemplates);
  const nodesTSV = nodesValueArray.map(
    (elem) => ({
      type: 'template',
      content: convertToTSV(elem),
    }),
  );

  const zip = new JSZip();
  const titlePrefix = (nodeTSV) => (nodeTSV.type === 'file-manifest'
    ? prefix.concat('File_Transfer_Manifest') : prefix.concat('Data_Loading_Template-'));
  const nodeName = (name) => (name === 'file' ? '' : name);
  nodesTSV.forEach((nodeTSV, index) => zip.file(`${createFileName(nodeName(nodesKeyArray[index]), titlePrefix(nodeTSV))}.tsv`, nodeTSV.content));

  zip.generateAsync({ type: 'blob' }).then((thisContent) => {
    saveAs(thisContent, createFileName('', `${prefix}Data_Loading_Templates`));
  });
};

export const downloadMultiTemplate = (
  format,
  nodesToDownload,
  allRoutes,
  clickingNodeName,
  dictionaryVersion,
) => {
  if (format !== 'tsv' && format !== 'json') {
    return;
  }
  const zip = new JSZip();
  Promise.all(Object.keys(nodesToDownload).map((nodeID) => {
    const fileUrl = `${dataDictionaryTemplatePath}${nodeID}?format=${format}`;
    const saveAsFileName = nodesToDownload[nodeID];
    return fetch(fileUrl).then((response) => {
      if (response.ok) {
        return response.text();
      }
      throw new Error(`cannot download template for node '${nodeID}'`);
    }).then((responseText) => {
      zip.file(saveAsFileName, responseText);
    }).catch(() => {
      throw new Error(`cannot download template for node '${nodeID}'`);
    });
  })).then(() => {
    const time = new Date();
    const startingNodeName = 'Project';
    let readmeContent = `The following ${format.toUpperCase()} templates were downloaded from ${appname} on ${time.toLocaleDateString()} ${time.toLocaleTimeString()}. The following are all possible paths from '${startingNodeName}' node to '${clickingNodeName}' using data dictionary version ${dictionaryVersion}. The downloaded ${format.toUpperCase()} files need to be submitted in the order shown in the chosen path(s) below:\n`;
    readmeContent = readmeContent.concat(
      allRoutes.map((nodeIDsInRoute, routeIndex) => `${routeIndex + 1}. ${nodeIDsInRoute.join(',')}`).join('\n'),
    );
    zip.file('README.txt', readmeContent);
    zip.generateAsync({ type: 'blob' })
      .then((content) => {
        FileSaver.saveAs(content, `templates-${format}.zip`);
      });
  });
};

export const graphStyleConfig = {
  nodeTextFontSize: 10,
  nodeTextLineGap: 4,
  nodeContentPadding: 20,
  nodeIconRadius: 10,
};

export const parseDictionaryNodes = (dictionary) => Object.keys(dictionary).filter(
  (id) => id.charAt(0) !== '_' && id === dictionary[id].id,
).map(
  (id) => {
    const originNode = dictionary[id];
    return originNode;
  },
).filter(
  (node) => node.id,
);

export const getPropertyDescription = (property) => {
  let description;
  if ('description' in property) {
    description = property.description;
  }
  if ('term' in property) {
    description = property.term.description;
  }
  return description;
};

const searchHistoryLocalStorageKey = 'datadictionary:searchHistory';
/**
 * @typedef {Object} SearchHistoryItem
 * @property {string} keywordStr - keywordStr of this item
 * @property {integer} matchedCount - matched count for this keyword
 */

/**
 * Get search history items from localStorage
 * @returns {SearchHistoryItem[]} array of search history items
 */
export const getSearchHistoryItems = () => {
  const items = JSON.parse(localStorage.getItem(searchHistoryLocalStorageKey));
  return items;
};

/**
 * Add search history item to localStorage
 * @params {SearchHistoryItem} searchHistoryItem - item to add into localStorage
 * @returns {SearchHistoryItem[]} array of new search history items
 */
export const addSearchHistoryItems = (searchHistoryItem) => {
  const { keywordStr } = searchHistoryItem;
  if (!keywordStr || keywordStr.length === 0) return getSearchHistoryItems();
  const prevHistory = JSON.parse(localStorage.getItem(searchHistoryLocalStorageKey));
  let newHistory = [];
  if (prevHistory) newHistory = prevHistory.slice(0); // clone array

  // if item already exists, need to remove item before adding to the beginning
  if (prevHistory && prevHistory.find((item) => item.keywordStr === keywordStr)) {
    const index = prevHistory.findIndex((item) => item.keywordStr === keywordStr);
    newHistory = prevHistory.slice(0);
    newHistory.splice(index, 1); // remove item
  }
  newHistory.unshift(searchHistoryItem); // add to the beginning
  localStorage.setItem(searchHistoryLocalStorageKey, JSON.stringify(newHistory));
  return newHistory;
};

/**
 * Clear search history item in localStorage
 * @returns {SearchHistoryItem[]} empty array as new search history items
 */
export const clearSearchHistoryItems = () => {
  const newHistory = [];
  localStorage.setItem(searchHistoryLocalStorageKey, JSON.stringify(newHistory));
  return newHistory;
};

export const MatchedIndicesShape = PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number));

export const MatchedItemShape = PropTypes.shape({
  indices: MatchedIndicesShape,
  arrayIndex: PropTypes.number,
  key: PropTypes.string,
  value: PropTypes.string,
});

export const SearchItemPropertyShape = PropTypes.shape({
  name: PropTypes.string,
  description: PropTypes.string,
  type: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.string), PropTypes.string]),
});

export const SearchItemShape = PropTypes.shape({
  id: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  properties: PropTypes.arrayOf(SearchItemPropertyShape),
});

export const SearchResultItemShape = PropTypes.shape({
  item: SearchItemShape,
  matches: PropTypes.arrayOf(MatchedItemShape),
});

// reactflow graph events
export const onViewChange = (payload) => {
  localStorage.setItem('reactflowGraphView', JSON.stringify(payload));
  return payload;
};

export const onCnavasWidthChange = ({ canvasWidth, graphViewConfig }) => {
  const updateGraphViewConfig = _.cloneDeep(graphViewConfig);
  if (updateGraphViewConfig) {
    updateGraphViewConfig.canvas.width = canvasWidth;
  }
  return updateGraphViewConfig;
};

export const highlightParentNodes = (edges = [], childIds = []) => {
  const childEdges = edges.filter((edge) => childIds.includes(edge.target));
  const highLevelParentNodes = childEdges.map((node) => node.source);
  const remamingEdges = edges.filter((edge) => !childIds.includes(edge.target));
  childIds.push(...highLevelParentNodes);
  if (highLevelParentNodes.length > 0) {
    highlightParentNodes(remamingEdges, childIds);
  }
  return childIds;
};

/**
 * Formats the node's property type for visual display.
 *
 * @param {*} property
 * @returns {string} The formatted property type.
 */
export const formatPropertyType = (property) => {
  const { type } = property || {};

  if (!type) {
    return 'Unknown';
  }

  if (typeof type === 'string') {
    return type;
  }

  if (Array.isArray(type)) {
    return 'string';
  }

  if (
    typeof type === 'object'
      && typeof type.value_type === 'string'
      && type.value_type === 'list'
  ) {
    return 'list';
  }

  if (typeof type === 'object') {
    return JSON.stringify(type);
  }

  return 'Unknown';
};

/**
 * Escapes problematic characters for TSV.
 *
 * @param {string} text The text to escape.
 * @returns {string} The escaped text.
 */
export const escapeForTSV = (text) => {
  if (typeof text !== 'string' || !text) {
    return '';
  }

  return text
    .replace(/\t/g, '')
    .replace(/\r\n/g, '')
    .replace(/\n/g, '')
    .replace(/\r/g, '')
    .replace(/"/g, '""');
};

/**
 * Creates a TSV of properties for a node.
 *
 * The properties it will extract are:
 * - title (Label: Node)
 * - property
 * - $.type
 * - $.CDEFullName
 * - $.CDEVersion
 * - $.CDECode
 * - $.CDEOrigin
 * - $.enum (Label: Acceptable Values)
 * - $.propertyType (Label: required)
 * - $.description
 * - $.src
 * - $.key (Label: Key Property)
 *
 * @param {*} node The node to generate a TSV for.
 * @param {boolean} headerLine Whether to include the header line.
 * @param {boolean} onlyRequired Whether to only include required properties.
 * @returns {string} The TSV for the node.
 */
export const generateNodeTSV = (node, headerLine = true, onlyRequired = false) => {
  let tsv = '';

  if (headerLine) {
    tsv += 'Node\tProperty\tType\tCDEFullName\tCDEVersion\tCDECode\tCDEOrigin\tAcceptable Values\tRequired\tDescription\tSrc\tKey Property\n';
  }

  Object.keys(node.properties).forEach((key) => {
    const property = node.properties[key];
    if (onlyRequired && !node?.required?.includes(key)) {
      return;
    }

    tsv += `${node.title || ''}\t`;
    tsv += `${key}\t`;
    tsv += `${formatPropertyType(property)}\t`;
    tsv += `${property.CDEFullName || ''}\t`;
    tsv += `${property.CDEVersion || ''}\t`;
    tsv += `${property.CDECode || ''}\t`;
    tsv += `${property.CDEOrigin || ''}\t`;
    tsv += `${property.enum ? JSON.stringify(property?.enum?.map((v) => escapeForTSV(v))) : ''}\t`;
    tsv += `${property.propertyType || ''}\t`;
    tsv += `${escapeForTSV(property.description) || ''}\t`;
    tsv += `${property.src || ''}\t`;
    tsv += `${property.key || 'FALSE'}\n`;
  });

  return tsv;
};

/**
 * Generates a JSON object for a node.
 *
 * @see generateNodeTSV For the TSV variant of this utility.
 * @param {*} node The node to generate a TSV for.
 * @param {boolean} onlyRequired Whether to only include required properties.
 * @returns {Array<Object>} An array of JSON objects for the node,
 * where each object represents a property.
 */
export const generateNodeJSON = (node, onlyRequired = false) => {
  const properties = [];

  Object.keys(node.properties).forEach((key) => {
    const property = node.properties[key];
    if (onlyRequired && !node?.required?.includes(key)) {
      return;
    }

    properties.push({
      Node: node.title || '',
      Property: key,
      Type: formatPropertyType(property),
      CDEFullName: property.CDEFullName || '',
      CDEVersion: property.CDEVersion || '',
      CDECode: property.CDECode || '',
      CDEOrigin: property.CDEOrigin || '',
      'Acceptable Values': property.enum ? property.enum : '',
      Required: property.propertyType || '',
      Description: escapeForTSV(property.description) || '',
      Src: property.src || '',
      'Key Property': property.key || false,
    });
  });

  return properties;
};

/**
* Convert a File node to a TSV data loading template.
*
* @param {*} node The node to convert to a TSV template.
* @returns {string} The TSV template for the `file` node type.
*/
export const generateFileManifest = (node) => {
  let line = tsvMiddleware(node);
  const filteredNode = filterProperties(node);

  const arr = Object.entries(filteredNode);
  const mergedArr = arr.concat(fileManifestDownload);
  mergedArr.forEach(([key, value]) => {
    if (value.isIncludedInTemplate) {
      line += ('\t').concat(`${key}`);
    }
  });

  const text = `${line}\r\n${node.title}`;
  return text;
};

export const isFileManifest = (node) => node.id === 'file';

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

export const generateVocabFullDownload = (fullDictionary, format, prefix = 'ICDC_') => {
  const c2nl = category2NodeList(fullDictionary);
  const enumArr = [];
  const zip = new JSZip();

  Object.keys(c2nl).forEach((category) => {
    const nodes = c2nl[category];
    nodes.forEach(({ title, properties }) => {
      const propertyKeyList = Object.keys(properties);
      propertyKeyList.forEach((propertyKey) => {
        const property = properties[propertyKey];
        if (property.enum) {
          enumArr.push({ title, enums: property.enum, propertyKey });
        }
      });
    });
  });

  const zipFileName = createFileName(prefix.concat('Controlled_Vocabularies'), '');
  const getFileName = (title, propertyKey, fileFormat) => `${createFileName(`${title}-${propertyKey}`, prefix.concat('Controlled_Vocabulary-'))}.${fileFormat}`;
  switch (format) {
    case 'TSV': {
      const vocabTSVArr = enumArr.map(({ enums, title, propertyKey }) => {
        let content = '';
        if (enums && enums.length) {
          enums.forEach((item, index) => {
            content += (index === 0) ? item : `${'\n'}${item}`;
          });
        }
        return { content, title, propertyKey };
      });

      vocabTSVArr.forEach(({ title, propertyKey, content }) => zip.file(getFileName(title, propertyKey, 'tsv'), content));
      zip.generateAsync({ type: 'blob' }).then((thisContent) => {
        saveAs(thisContent, zipFileName);
      });
    }
      break;
    // eslint-disable-next-line no-lone-blocks
    case 'JSON': {
      enumArr.forEach(({ title, enums, propertyKey }) => zip.file(getFileName(title, propertyKey, 'json'), JSON.stringify(enums)));
      zip.generateAsync({ type: 'blob' }).then((thisContent) => {
        saveAs(thisContent, zipFileName);
      });
    }
      break;
    default:
      break;
  }
};

export const generateLoadingExample = async (configUrl = 'https://raw.githubusercontent.com/CBIIT/icdc-data-loading-example-sets/main/config.json') => {
  const zip = new JSZip();

  // fetch config
  const { loadingExamples, title } = await (await Axios.get(configUrl)).data;
  try {
    const titleArr = Object.keys(loadingExamples);
    const res = await Promise.all(Object.values(loadingExamples)
      .map((example) => Axios.get(example)));
    const data = res.map((respose, index) => ({
      title: titleArr[index],
      content: respose.data,
      format: titleArr[index].split('.')[1],
    }));

    data.forEach(({ title1, content, format }) => { zip.file(`${createFileName(title1)}.${format}`, content); });
    zip.generateAsync({ type: 'blob' }).then((thisContent) => {
      saveAs(thisContent, createFileName(title));
    });
  } catch {
    throw Error('Failed to fetch example files');
  }
};

export const downloadLoadingExample = async (zipUrl = '') => {
  window.open(zipUrl, '_blank');
};

/**
 * Generates a Data Dictionary file name.
 *
 * @param {string} prefix The prefix for the file name. Usually a Model name. (e.g. "ICDC_")
 * @param {string|null} nodeName The name of the node to generate the file name for.
 * If null, it's omitted
 * @param {boolean} onlyRequired Whether the download included only required properties.
 * @param {string|number|undefined} modelVersion The version of the model to
 * include in the file name. If undefined, it's omitted.
 */
export const getDictionaryFilename = (prefix, nodeName, onlyRequired, modelVersion) => {
  let filename = `${prefix || ''}Dictionary`;
  if (nodeName) {
    filename += `_${nodeName}`;
  }
  if (onlyRequired) {
    filename += '_Required';
  } else {
    filename += '_All';
  }
  if (modelVersion) {
    filename += `_${modelVersion}`;
  }

  return filename;
};

export function safeClone(obj) {
  let cloneObj = {};
  try {
    cloneObj = structuredClone(obj);
  } catch (error) {
    console.warn('structuredClone failed, using fallback', error);
    cloneObj = cloneDeep(obj); // Use Lodash fallback
  }
  return cloneObj;
}

export const getNodePropertyCount = (dictionary) => {
  const res = parseDictionaryNodes(dictionary)
    .reduce((acc, node) => {
      acc.nodesCount += 1;
      acc.propertiesCount += Object.keys(node.properties).length;
      return acc;
    }, {
      nodesCount: 0,
      propertiesCount: 0,
    });
  return {
    nodesCount: res.nodesCount,
    propertiesCount: res.propertiesCount,
  };
};

export function sortByCategory(c2nl, dictionary) {
  const keys = Object.keys(c2nl);
  return Object.values(dictionary).sort((a, b) => keys.indexOf(`${a.category}`) - keys.indexOf(`${b.category}`));
}
