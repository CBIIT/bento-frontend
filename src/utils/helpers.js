/* eslint-disable no-param-reassign */

export default function manipultateLinks(tableData) {
  tableData.forEach((column, index) => {
    if ((column.link !== undefined && column.link !== null)) {
      const linkKey = column.link.substring(
        column.link.lastIndexOf('{') + 1,
        column.link.lastIndexOf('}'),
      );
      const linktext = column.link.split('{')[0];
      if (linktext.startsWith('/')) {
        tableData[index].internalLink = true;
      } else {
        tableData[index].externalLink = true;
      }
      const arrayIndex = tableData.findIndex((p) => p.field === linkKey);
      tableData[index].actualLink = linktext;
      tableData[index].actualLinkId = arrayIndex;
    }
  });
  return tableData;
}
