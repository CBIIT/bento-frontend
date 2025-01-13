import React,
{
  useLayoutEffect,
  useRef,
  useState,
  useEffect
} from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import {
  StyledContainer,
  StyledSideBarContrainer,
  StyledTabBtnContainer,
  StyledTabContainer,
  StyledTabPanelContainer,
  StyledTabPanelOuterContainer,
  TabPanelContrainer
} from './Navigator.styled';
import SearchAndFilterView from './components/Sidebar/SidebarController';

const TabPanel = (props) => {
  const { children, value, index } = props;

  return (
    <TabPanelContrainer
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
    >
      {value === index && (<>{children}</>)}
    </TabPanelContrainer>
  );
};

const NavigatorView = ({
  dictionary,
  NavGraphView,
  NavTableView
}) => {
  // garph tab / table tab
  const [value, setValue] = useState(0);
  
  const handleChange = (event, tabIndex) => {
    setValue(tabIndex);
  };

  /**
   * get witdh of the tab to position nodes in the graph view
   */
  const ref = useRef(null);
  const [tabViewWidth, setTabViewWidth] = useState(0);

  const setCanvasWidth = () => {
    setTabViewWidth(ref.current.offsetWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", setCanvasWidth);
    return () => {
      window.removeEventListener("resize", setCanvasWidth);
    };
  }, []);

  useLayoutEffect(() => {
    setTabViewWidth(ref.current.offsetWidth);
  }, []);

  return (
    <StyledContainer ref={ref}>
      <StyledSideBarContrainer>
        <SearchAndFilterView />
      </StyledSideBarContrainer>
      <StyledTabContainer >
        <StyledTabBtnContainer>
          <Tabs value={value} onChange={handleChange} aria-label="nav_tabs">
            <Tab label="Graph View"  />
            <Tab label="Table View" />
          </Tabs>
        </StyledTabBtnContainer>
        <StyledTabPanelOuterContainer >
          <StyledTabPanelContainer>
            <TabPanel value={value} index={0}>
              <NavGraphView
                dictionary={dictionary}
                tabViewWidth={tabViewWidth}
              />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <NavTableView dictionary={dictionary} />
            </TabPanel>
          </StyledTabPanelContainer>
        </StyledTabPanelOuterContainer>
    </StyledTabContainer>
  </StyledContainer>
  );
}

export default NavigatorView;
