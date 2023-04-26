import React from 'react';
import RouteLinks from './RouteLinks';

/**
 prepareLinks function find all "link" and "labelLink" properties,
 and replace place holders like {program_id} with actual value in data[program_id]
 It return a new properties array with new values
 */
export function prepareLinks(properties, data) {
  return properties.map((prop) => {
    const newProp = { ...prop };
    const pattern = /{(.*)}/;
    if (prop.link) {
      newProp.link = prop.link.replace(pattern, (match, p1) => data[p1]);
    }
    if (prop.labelLink) {
      newProp.labelLink = prop.labelLink.replace(pattern, (match, p1) => data[p1]);
    }
    return newProp;
  });
}

/**
 * Anchor component create internal links as well as external links
 * External links must contain URL scheme, such as "https://"
 * Other links will be treated as React internal links
 * @param link: link URL or path
 * @param text: test for the link
 * @param classes: style object, must contain styles for class "link"
 * @returns React component contains the link
 * @constructor
 */
export const Anchor = ({ link, text, classes }) => (
  link.match(/\w+:\/\//)
    ? <a href={link} target="_blank" rel="noopener noreferrer" className={classes.link}>{text}</a>
    : (
      <RouteLinks to={link} className={classes.link}>{text}</RouteLinks>
    )
);
