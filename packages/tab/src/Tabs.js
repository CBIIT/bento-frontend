import React, { useState } from 'react';
import { Tab,
  Tabs,
  createTheme, 
  ThemeProvider,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import generateStyle from './utils/generateStyle';
import TabThemeProvider from './TabThemeProvider';

/* Tabs coponenent */
// function Tabs({
//   tabData,
//   onChange,
//   styles,
//   themes,
//   overrides
// }) {
//   /* styles */
//   const generatedStyle = generateStyle(styles);
//   const useStyles = makeStyles(generatedStyle);
//   const classes = useStyles();


//   /* tab headers and specific style generator */
//   const getSpecificTabStyle = (currentSelectedTab, index, tabHeaderStyle = undefined) => {
//     let style = {};
//     if (tabHeaderStyle) {
//       style = tabHeaderStyle.root ? { ...tabHeaderStyle.root } : {};
//       if (currentSelectedTab === index && tabHeaderStyle.selected) {
//         style = { ...style, ...tabHeaderStyle.selected };
//       }
//     }
//     return style;
//   };

//   const TabHeader = tabData.map((tab, index) => {
//     const specificTabStyle = getSpecificTabStyle(currentTab, index, tab.label.style);
//     return (
//       <MuiTab
//         key={index}
//         className={classes.tabsLabel}
//         label={tab.label.content}
//         style={specificTabStyle}
//         disableRipple
//       />
//     );
//   });

//   /* event handlers */
//   const handleChange = (event, newValue) => {
//     setCurrentTab(newValue);

//     if (onChange) {
//       onChange(newValue);
//     }
//   };

//   return (
//     <div className={classes.tabsContainer}>
//       <TabThemeProvider
//         muiTabTheme={generatedStyle.muiTab}
//         muiTabsTheme={generatedStyle.muiTabs}
//         themes={themes}
//         overrides={overrides}
//       >
//         <MuiTabs value={currentTab} onChange={handleChange}>
//           {TabHeader}
//         </MuiTabs>

//         {tabData.map((tab, index) => (
//           <Typography key={index} component="div" className={classes.tabsPanel} hidden={currentTab !== index}>
//             {tab.panel}
//           </Typography>
//         ))}

//       </TabThemeProvider>
//     </div>
//   );
// }

// export default Tabs;
const defaultTheme = {
  defaultStyle: {
    fontFamily: 'Open Sans',
    textTransform: 'none',
    fontSize: '17px',
  },
  flexContainer: {
    flexDirection: 'column',
  },
  indicator: {
    display: 'none',
  },
  tabHighlightColor: {
    color: '#6d9eba',
  },
  tabs: {
    paddingLeft: '10px',
  },
  MuiTab: {
    root: {
      fontFamily: 'Open Sans',
      textTransform: 'none',
      fontSize: '17px',
    },
  },
};

const TabItems = ({
  tabItems,
  handleTabChange,
  currentTab,
  orientation,
  customTheme = {},
}) => {
  const getTabLalbel = ({ name, count, clsName }) => (
    <>
      <span>
        {name}
        {count && (
          <span className={`${clsName}_count`}>{count}</span>
        )}
      </span>
    </>
  );

  /* Component states */
  // const [currentTab, setCurrentTab] = useState(0);
  // const handleChange = (event, newValue) => {
  //   setCurrentTab(newValue);
  // };

  const TABs = tabItems.map((tab, index) => (
    <Tab
      index={index}
      label={
        getTabLalbel(tab)
      }
      key={index}
      className={tab.clsName}
      disableRipple
    />
  ));

  const themeConfig = createTheme({ overrides: { ...defaultTheme, ...customTheme } });
  return (
    <ThemeProvider theme={themeConfig}>
      <Tabs
        onChange={(event, value) => handleTabChange(event, value)}
        value={currentTab}
        TabIndicatorProps={{ style: { background: 'none' } }}
        orientation={orientation}
      >
        {TABs}
      </Tabs>
    </ThemeProvider>
  );
};

export default TabItems;
