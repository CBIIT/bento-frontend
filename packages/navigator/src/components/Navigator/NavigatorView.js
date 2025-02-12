/* eslint-disable guard-for-in */
/* eslint-disable no-var */
/* eslint-disable vars-on-top */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-param-reassign */
/* eslint-disable space-infix-ops */
/* eslint-disable prefer-template */
/* eslint-disable import/no-unresolved */
/* eslint-disable quotes */
/* eslint-disable import/extension */
/* eslint-disable no-undef */
/* eslint-disable no-shadow */
/* eslint-disable semi */
/* eslint-disable object-curly-spacing */
/* eslint-disable import/no-cycle */
/* eslint-disable no-multiple-empty-lines */
import React,
{
  useLayoutEffect,
  useRef,
  useState,
  useEffect
} from 'react';
import {
  StyledContainer,
  StyledSideBarContrainer,
  StyledTabBtnContainer,
  StyledTabContainer,
  StyledTabPanelContainer,
  StyledTabPanelOuterContainer,
  TabPanelContrainer,
  StyledTabView,
  StyledTabs
} from './Navigator.styled';
import SideBarView from './components/Sidebar/SidebarController';

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
        <SideBarView />
      </StyledSideBarContrainer>
      <StyledTabContainer >
        <StyledTabBtnContainer>
          <StyledTabs
            value={value}
            onChange={handleChange}
            aria-label="nav_tabs"
          >
            <StyledTabView label="Graph View" />
            <StyledTabView label="Table View" />
          </StyledTabs>
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
