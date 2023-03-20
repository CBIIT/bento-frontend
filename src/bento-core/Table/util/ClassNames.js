export const tableCls = {
  HEADER: 'header',
  BODY: 'body',
  ROW: '_row',
  COL: '_col',
  CHECKBOX: '_checkbox',
  CHECKBOX_ACTIVE: '_checkbox_active',
  CHECKBOX_INACTIVE: '_checkbox_in_active',
  TOOLTIP: '_tooltip',
};

export const getClsName = (prefix, postfix) => {
  const className = `${prefix}`
    .replace(' ', '_')
    .toLowerCase().concat(`_${postfix}`);
  return className;
};
