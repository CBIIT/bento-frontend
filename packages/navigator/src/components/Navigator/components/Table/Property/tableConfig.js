export const field = {
  PROPERTY_NAME: 'propertyName',
  TYPE: 'type',
  ENUM: 'enum',
  DESC: 'description',
  INCLUSION: 'inclusion'
};

export const label = {
  PROPERTY: 'Property',
  TYPE: 'Type', 
  INCLUSION: 'Required',
  DESC: 'Description'
}

export const columns = [
  { field: field.PROPERTY_NAME, name: label.PROPERTY},
  { field: field.TYPE, name: label.TYPE},
  { field: field.INCLUSION, name: label.INCLUSION},
  { field: field.DESC, name: label.DESC },
];
