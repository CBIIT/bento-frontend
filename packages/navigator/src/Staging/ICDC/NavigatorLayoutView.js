import React,
{
  useLayoutEffect,
  useRef,
  useState,
  useEffect,
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
  StyledTabs,
} from './Navigator.styled';
import GraphPanelView from './GraphPanelView';
import TablePanelView from './TablePanelView';
import SideBarView from '../../Navigator/components/Sidebar/SidebarView';

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

const NavigatorLayoutView = ({
  dictionary,
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
    window.addEventListener('resize', setCanvasWidth);
    return () => {
      window.removeEventListener('resize', setCanvasWidth);
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
      <StyledTabContainer>
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
        <StyledTabPanelOuterContainer>
          <StyledTabPanelContainer>
            <TabPanel value={value} index={0}>
              <GraphPanelView
                dictionary={dictionary}
                tabViewWidth={tabViewWidth}
              />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <TablePanelView dictionary={dictionary} />
            </TabPanel>
          </StyledTabPanelContainer>
        </StyledTabPanelOuterContainer>
      </StyledTabContainer>
    </StyledContainer>
  );
};

export default NavigatorLayoutView;
