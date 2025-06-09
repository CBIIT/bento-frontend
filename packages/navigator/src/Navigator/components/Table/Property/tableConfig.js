export const field = {
  PROPERTY_NAME: 'propertyName',
  TYPE: 'type',
  ENUM: 'enum',
  DESC: 'description',
  INCLUSION: 'inclusion',
  CUSTOMVIEW: 'CUSTOMVIEW',
  CDEInfo: 'CDEInfo',
  Source: 'source',
};

export const label = {
  PROPERTY: 'Property',
  TYPE: 'Type',
  INCLUSION: 'Required',
  DESC: 'Description',
  CDEInfo: 'CDE Info',
  Source: 'Source',
};

export const defaultColumnsConfig = [
  { field: field.PROPERTY_NAME, name: label.PROPERTY },
  { field: field.TYPE, name: label.TYPE },
  { field: field.CDEInfo, name: label.CDEInfo },
  { field: field.INCLUSION, name: label.INCLUSION },
  { field: field.DESC, name: label.DESC },
  { field: field.Source, name: label.Source },
];
