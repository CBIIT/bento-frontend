import React, { useState } from 'react';
import {
  Tab,
  Tabs,
  createTheme,
  ThemeProvider,
  Button,
  Popover,
  List,
  ListItem,
} from '@material-ui/core';
import ToolTip from '@bento-core/tool-tip';
import { defaultTheme } from './defaultTheme';

const TabItems = ({
  tabItems,
  handleTabChange,
  currentTab,
  orientation,
  customTheme = {},
  maxVisibleTabs = 6,
  enableGrouping = false,
}) => {
  const [currentGroup, setCurrentGroup] = useState(0);
  const [showMorePopup, setShowMorePopup] = useState(false);
  const [moreButtonAnchor, setMoreButtonAnchor] = useState(null);

  // Grouping logic
  const tabLimit = enableGrouping ? 2 : maxVisibleTabs; // Phase 1: hardcode to 3
  const shouldShowMoreButton = enableGrouping && tabItems.length > tabLimit;

  // Calculate which group the current active tab belongs to
  const activeTabGroup = Math.floor(currentTab / tabLimit);

  // Update current group when active tab changes to different group
  React.useEffect(() => {
    if (enableGrouping && activeTabGroup !== currentGroup) {
      setCurrentGroup(activeTabGroup);
    }
  }, [currentTab, activeTabGroup, currentGroup, enableGrouping]);

  // Get visible tabs for current group
  const getVisibleTabs = () => {
    if (!enableGrouping) {
      return tabItems;
    }
    const startIndex = currentGroup * tabLimit;
    const endIndex = Math.min(startIndex + tabLimit, tabItems.length);
    return tabItems.slice(startIndex, endIndex);
  };

  // Get popup tabs with wrap-around logic
  const getPopupTabs = () => {
    if (!enableGrouping || !shouldShowMoreButton) {
      return [];
    }

    const allTabs = [...tabItems];
    const visibleStart = currentGroup * tabLimit;
    const visibleEnd = Math.min(visibleStart + tabLimit, allTabs.length);

    // Remove currently visible tabs
    const hiddenTabs = [
      ...allTabs.slice(visibleEnd),
      ...allTabs.slice(0, visibleStart),
    ];

    return hiddenTabs;
  };

  const handleMoreButtonClick = (event) => {
    setMoreButtonAnchor(event.currentTarget);
    setShowMorePopup(true);
  };

  const handlePopupClose = () => {
    setShowMorePopup(false);
    setMoreButtonAnchor(null);
  };

  const handlePopupTabClick = (tabIndex) => {
    const newGroup = Math.floor(tabIndex / tabLimit);
    setCurrentGroup(newGroup);
    handleTabChange(null, tabIndex);
    handlePopupClose();
  };

  const getTabLalbel = ({
    name, count, clsName, index,
  }) => (
    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
      <span style={{ display: 'flex', flexDirection: 'column' }}>
        {name.split(' ').map((word, index2) => (
          <span key={index2}>{word}</span>
        ))}
      </span>
      {count && (
        <span
          className={`index_${index} ${clsName}_count`}
          style={{ paddingLeft: '4px' }}
        >
          {count}
        </span>
      )}
    </div>
  );

  const visibleTabs = getVisibleTabs();
  const popupTabs = getPopupTabs();

  const TABs = visibleTabs.map((tab, visibleIndex) => {
    // Calculate the actual tab index in the full tabItems array
    const actualIndex = enableGrouping
      ? (currentGroup * tabLimit) + visibleIndex
      : visibleIndex;

    return tab.hasToolTip
      ? (
        <ToolTip {...tab.tooltipStyles} title={tab.toolTipText || '.'} arrow placement="top" key={actualIndex}>
          <Tab
            index={actualIndex}
            label={getTabLalbel({ ...tab, index: actualIndex })}
            className={tab.clsName}
            disableRipple
          />
        </ToolTip>
      )
      : (
        <Tab
          index={actualIndex}
          label={getTabLalbel({ ...tab, index: actualIndex })}
          key={actualIndex}
          className={tab.clsName}
          disableRipple
        />
      );
  });

  // Add More button if needed
  if (shouldShowMoreButton) {
    TABs.push(
      <Button
        key="more-button"
        onClick={handleMoreButtonClick}
        className="more-button"
      >
        More
      </Button>,
    );
  }

  // Adjust currentTab value for visible tabs when grouping is enabled
  const adjustedCurrentTab = enableGrouping
    ? currentTab - (currentGroup * tabLimit)
    : currentTab;

  const themeConfig = createTheme({ overrides: { ...defaultTheme(), ...customTheme } });
  return (
    <ThemeProvider theme={themeConfig}>
      <div style={{ position: 'relative' }}>
        <Tabs
          onChange={(event, value) => handleTabChange(event, value)}
          value={adjustedCurrentTab}
          TabIndicatorProps={{ style: { background: 'none' } }}
          orientation={orientation}
        >
          {TABs}
        </Tabs>

        {/* More button popup */}
        {shouldShowMoreButton && (
          <Popover
            open={showMorePopup}
            anchorEl={moreButtonAnchor}
            onClose={handlePopupClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
          >
            <List className="popover-list">
              {popupTabs.map((tab) => {
                const originalIndex = tabItems.findIndex((item) => item === tab);
                return (
                  <ListItem
                    key={originalIndex}
                    button
                    onClick={() => handlePopupTabClick(originalIndex)}
                    className="popover-list-item"
                  >
                    <span className="popover-tab-name">
                      {tab.name}
                    </span>
                    <span className="popover-tab-count">
                      {tab.count || ''}
                    </span>
                  </ListItem>
                );
              })}
            </List>
          </Popover>
        )}
      </div>
    </ThemeProvider>
  );
};

export default TabItems;
