/**
 prepareLinks function find all "link" and "labelLink" properties,
 and replace place holders like {program_id} with actual value in data[program_id]
 It return a new properties array with new values
 */
export default function prepareLinks(properties, data) {
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
