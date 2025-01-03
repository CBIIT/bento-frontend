import React from 'react';
import { parseInt } from 'lodash';
import {
  Svg,
  G,
  Circle,
  Path,
  Rect,
  Polygon,
  Ellipse,
} from '@react-pdf/renderer';

const numericAttrs = ['height', 'width', 'rx', 'y', 'cx', 'cy', 'ry'];

const getSvgAttributes = (node) => {
  const objects = {};
  Array.from(node.attributes).forEach((attr) => {
    /** prevent svg transformation */
    if (attr.nodeName !== 'transform') {
      if (numericAttrs.includes(attr.nodeName)) {
        if (node.tagName === 'svg'
          && (attr.nodeName === 'height' || attr.nodeName === 'width')) {
          objects[`${attr.nodeName}`] = parseInt(30, 10);
        } else {
          objects[`${attr.nodeName}`] = parseInt(attr.nodeValue, 10);
        }
      } else {
        objects[`${attr.nodeName}`] = attr.nodeValue;
      }
    }
  });
  return objects;
};

const renderSvgElement = (node) => {
  let Component = null;
  const componentProps = getSvgAttributes(node);
  switch (node.tagName) {
    case 'svg':
      Component = Svg;
      break;
    case 'g':
      Component = G;
      break;
    case 'circle':
      Component = Circle;
      break;
    case 'path':
      Component = Path;
      break;
    case 'rect':
      Component = Rect;
      break;
    case 'polygon':
      Component = Polygon;
      break;
    case 'ellipse':
      Component = Ellipse;
      break;
    default:
      Component = G;
      break;
  }
  if (node.children) {
    return (
      <Component {...componentProps}>
        {Array.from(node.children).map(renderSvgElement)}
      </Component>
    );
  }
  return (
    <Component {...componentProps} />
  );
};

export default renderSvgElement;
