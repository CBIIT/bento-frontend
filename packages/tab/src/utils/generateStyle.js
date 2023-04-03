import tabsStyle from '../tabsStyle';

const generateStyle = (customStyle = {}) => {
  const style = { ...tabsStyle };

  if (customStyle.tabsContainer) {
    style.tabsContainer = { ...style.tabsContainer, ...customStyle.tabsContainer };
  }

  if (customStyle.tabsLabel) {
    style.tabsLabel = { ...style.tabsLabel, ...customStyle.tabsLabel };
  }

  if (customStyle.tabsPanel) {
    style.tabsPanel = { ...style.tabsPanel, ...customStyle.tabsPanel };
  }

  if (customStyle.muiTabs) {
    style.muiTabs = { ...style.muiTabs, ...customStyle.muiTabs };
  }

  if (customStyle.muiTab) {
    style.muiTab = { ...style.muiTab, ...customStyle.muiTab };
  }

  return style;
};

export default generateStyle;
