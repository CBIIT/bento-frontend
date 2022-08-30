import { NODE_LABEL, NODE_LEVEL_ACCESS } from '../bento/siteWideConfig';

const custodianUtils = {
  getNodeLevelLabel: () => {
    const limit = 30;

    return NODE_LEVEL_ACCESS ? NODE_LABEL.substring(0, limit) : NODE_LABEL;
  },
};

export default custodianUtils;
