import React, { useState, useEffect } from 'react';
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
import MoreVerticalIcon from './assets/icons/more-vertical.svg';

const TabItems = ({
  tabItems,
  handleTabChange,
  currentTab,
  orientation,
  customTheme = {},
  maxVisibleTabs = 6,
  enableGrouping = false,
  responsiveBreakpoints = null,
}) => {
  const [currentGroup, setCurrentGroup] = useState(0);
  const [showMorePopup, setShowMorePopup] = useState(false);
  const [moreButtonAnchor, setMoreButtonAnchor] = useState(null);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1465);

  // Calculate tab limit based on screen width breakpoints
  const getTabLimitByWidth = (width) => {
    if (!responsiveBreakpoints) {
      // Fallback to original hardcoded values if no config provided
      if (width < 1250) return 2;
      if (width < 1400) return 3;
      if (width < 1550) return 4;
      if (width < 1700) return 5;
      return 6; // >= 1700px
    }

    // Use configuration-based breakpoints
    for (let i = 0; i < responsiveBreakpoints.breakpoints.length; i += 1) {
      const breakpoint = responsiveBreakpoints.breakpoints[i];
      if (width <= breakpoint.maxWidth) {
        return breakpoint.tabLimit;
      }
    }
    return responsiveBreakpoints.defaultTabLimit;
  };

  // Grouping logic with responsive breakpoints
  const tabLimit = enableGrouping ? getTabLimitByWidth(windowWidth) : maxVisibleTabs;
  const shouldShowMoreButton = enableGrouping && tabItems.length > tabLimit;

  // Window resize listener for responsive breakpoints
  useEffect(() => {
    if (!enableGrouping || typeof window === 'undefined') {
      return undefined;
    }

    const handleResize = () => {
      const newWidth = window.innerWidth;
      setWindowWidth(newWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [enableGrouping]);

  // Consolidated effect: handle tab limit changes and active tab group recalculation
  useEffect(() => {
    if (!enableGrouping) {
      return;
    }

    const newActiveTabGroup = Math.floor(currentTab / tabLimit);
    if (newActiveTabGroup !== currentGroup) {
      setCurrentGroup(newActiveTabGroup);
    }
  }, [tabLimit, currentTab, currentGroup, enableGrouping]);

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

    const visibleStart = currentGroup * tabLimit;
    const visibleEnd = Math.min(visibleStart + tabLimit, tabItems.length);

    // Create hidden tabs with their original indices to avoid O(n²) findIndex
    const hiddenTabsWithIndex = [];

    // Add tabs after visible range
    for (let i = visibleEnd; i < tabItems.length; i += 1) {
      hiddenTabsWithIndex.push({ tab: tabItems[i], originalIndex: i });
    }

    // Add tabs before visible range (wrap-around)
    for (let i = 0; i < visibleStart; i += 1) {
      hiddenTabsWithIndex.push({ tab: tabItems[i], originalIndex: i });
    }

    return hiddenTabsWithIndex;
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

  const getTabLabel = ({
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
            label={getTabLabel({ ...tab, index: actualIndex })}
            className={tab.clsName}
            disableRipple
          />
        </ToolTip>
      )
      : (
        <Tab
          index={actualIndex}
          label={getTabLabel({ ...tab, index: actualIndex })}
          key={actualIndex}
          className={tab.clsName}
          disableRipple
        />
      );
  });

  // Add More button if needed
  if (shouldShowMoreButton) {
    const hiddenTabsCount = popupTabs.length;
    TABs.push(
      <Button
        key="more-button"
        onClick={handleMoreButtonClick}
        className="more-button"
      >
        <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <img src={MoreVerticalIcon} alt="More options" style={{ height: '15px' }} />
          {`More(${hiddenTabsCount})`}
        </span>
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
          onChange={(event, value) => {
            // Convert relative position to actual tab index when grouping is enabled
            const actualTabIndex = enableGrouping
              ? (currentGroup * tabLimit) + value
              : value;
            handleTabChange(event, actualTabIndex);
          }}
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
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
            style={{ marginTop: '10px' }}
          >
            <List className="popover-list">
              {popupTabs.map(({ tab, originalIndex }) => (
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
              ))}
            </List>
          </Popover>
        )}
      </div>
    </ThemeProvider>
  );
};

export default TabItems;
