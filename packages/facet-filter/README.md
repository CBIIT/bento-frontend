# SIDEBAR COMPONENT DESIGN

### Bento core sidebar design:

* Use of local state for all the click events
* Use of global redux limited to store active filters
* Limit use of props drilling
* Core layout defined by Bento Core Sidebar component
* Use of generator function to create and configure components (generator funtion is not used for configuring all the sidebar components due to local state issue) 
* Simple configuration to maximize the customization of sideBar component
* Apply SOLID principles in react (https://konstantinlebedev.com/solid-in-react/)

## 1 Redux stores active filters value and configuration

### Generate and integrate redux dispatch actions
```
import { sideBarReducerGenerator } from 'bento-core';
const { statusReducer } = sideBarReducerGenerator();

const reducers = {  statusReducer, ..., otherReducers };
const loggerMiddleware = createLogger();
const store = createStore( 
  combineReducers(reducers), 
  composeWithDevTools (applyMiddleware(ReduxThunk, loggerMiddleware)),
);
```
### Check Global redux store for all active filters 
```
// active filter json structure
statusReducer:
  filterState:
    pr_status:
     {
       Not Reported: true
     },
     rc_scores: {
       11-15: true,
       21-25: true
     }
     tumor_grades: {}
     tumor_sizes: {(1,2]: true} 
```
#### (Note: Bento core sideBar provides method to override the redux filter events/ actions.)

## 2 Importing Component and Configuration
```
import FacetFilter from 'bento-core';

<FacetFilterThemeProvider>
  <OtherComponent />
  <FacetFilter
    data={searchData}
    facetSectionConfig={facetSectionVariables}
    facetsConfig={facetsConfig}
    CustomFacetSection={CustomFacetSection}
    CustomFacetView={CustomFacetView}
  />
</FacetFilterThemeProvider>
```

## 3 Dashboard Data
***searchData*** Pass Dashboard Data. (DASHBOARD_QUERY response)
```
 <FacetFilter
    data={searchData}
    ...
 />
```

## 4 FacetsConfigs

```
import { InputTypes } from 'bento-core';

export const facetsConfig = [{ 
  section: CASES,
  label: 'Program', 
  apiForFiltering: 'filterSubjectCountByProgram', 
  datafield: 'programs', 
  field: GROUP, 
  type: InputTypes.CHECKBOX, 
  sort_type: sortType.ALPHABET,
  show: true, 
}, {
   section: CASES,
   label: 'Age',
    apiForFiltering: 'filterSubjectCountByAge',
    datafield: 'age_at_index',
    ApiLowerBoundName: 'lowerBound',    
    ApiUpperBoundName: 'upperBound',
    show: true,    
    slider: true,    
    type: InputTypes.SLIDER,
    sort_type: 'none',   
    minLowerBound: 0,  
    maxUpperBound: 100,   
    quantifier: 'Years',
    CustomLowerUpperBound: CustomLowerUpperBound, // Custom component for displaying lower and upper bounds
    CustomSliderValue: CustomSliderValue, // Custom component for displaying slider value
].
```
1. **apiForFiltering** refers to object key for retrieving name and subjects count from query response (DASHBOARD_QUERY)
2. **dataField** field for global redux store to track active filter item
3. **Type** indicates the type of input (checkbox or slider) 
4. **sort_type** attribute used by Bento core sidebar local state to sorting of facet values
5. **section** refers to name of the facet section
6. **show** attribute must to be true to display facet on the Bento core Side bar component

Configuration varies based on the input types like checkbox or slider

#### (NOTE - SLIDER requires additional attributes)

## 5 facetSectionConfig
```
export const facetSectionVariables = { 
Cases: { 
  isExpanded: true,
},  
Samples: {
  isExpanded: true,
},  
Files: {
  isExpanded: true,
}};
```
Facet section defines the number of sections that will be displayed on Bento core sidebar component. **isExpanded** attribute set default state for the section i.e if true then facet section expand if false facet section collapse.

## 6 CustomFacetSection
Bento Core sidebar component provides view customization to some component like FacetSection and Face component.
```
const CustomFacetSection = ({ section }) => { 
  return (
    <>
     <CustomExpansionPanelSummary>
       <div className={classes.sectionSummaryTextContainer}>
         {section.name} 
       </div>
      </CustomExpansionPanelSummary>
    </> );
}; 

// provide as props
<FacetFilter
  data={searchData}
  facetSectionConfig={facetSectionVariables}
  facetsConfig={facetsConfig}
  CustomFacetSection={CustomFacetSection}
  CustomFacetView={CustomFacetView}
/>
```

## 7 CustomFacetView
```
const CustomFacetView = ({ facet, facetClasses }) => {   
   return (
     <>        
       <CustomExpansionPanelSummary>          
         <div 
           className={clsx(classes.sectionSummaryText, classes[facetClasses])}
          >            
           {facet.label}
         </div>        
       </CustomExpansionPanelSummary>      
    </>    
)};

// provide as props
<FacetFilter
  data={searchData}
  facetSectionConfig={facetSectionVariables}
  facetsConfig={facetsConfig}
  CustomFacetSection={CustomFacetSection}
  CustomFacetView={CustomFacetView}
/>
```

## 8 FacetFilterThemeProvider
Bento Core Sidebar assigns classes dynamically to its components ***(Mui component)*** based on local state of the component, **FacetsConfigs** and **facetSectionConfig**. Bento Core sidebar uses Mui Components widely so ***ThemeProvider*** can be used to override styles for each of the components in Bento Core Sidebar. This approach is similar to react ***useContext***, to prevent props drilling.

```
const theme = {
overrides: {
 MuiListItem:
root: {        
  '&.casesCheckedEven': {
    //refer to class name table 
    ..//styles 
  }
  '&.casesCheckedOdd' :{
    //refer to class name table 
    ..//styles 
  },
  '&.samplesCheckedEven': { 
    //refer to class name table 
  ..//styles 
  }
  '&.samplesCheckedOdd' :{
  ..//styles 
  },
   MuiSvgIcon: {
  root: {
  '&.casesCheckedIcon': {
    //refer to class name table 
    ..//styles 
  }
  '&.samplesCheckedIcon': {
    ..//styles
  }
}

import FacetFilter from 'bento-core';
<ThemeProvider theme={computedTheme}>
   <FacetFilter />
</ThemeProvider>
```
**NOTE: These are example class name and it is based on the configuration so for different configuration this classes may not apply)**

**CheckBox Component CLASS NAMES TABLE**
| Sidebar Component | Child Component | Mui     | ClassName | Condition |
| :---              |    :----:       | :----:  |   :----:  |  ----:    |
| Facet Value | Check box Button | ListItem | {***checkedSection***}Checked{***indexType***} | active |
| Facet Value | Checkbox Input | CheckboxIcon | {***checkedSection***}CheckedIcon | active |
| Facet Value | Name | Typography | {***checkedSection***}NameUnChecked | inactive |
| Facet Value | Name | Typography | {***checkedSection***}NameChecked | active |
| Facet Value | Subject | Typography | {***checkedSection***}SubjectUnChecked | active |
| Facet Value | Subject | Typography | {***checkedSection***}SubjectChecked | inactive |

Follows in order of parent to child components <br>
**bold** text indicates variables <br>
active - when input type is checked <br>
**{indexType}** = 'Even' /'Odd' based on index of the facet values <br>
**{checkedSection}** = section name (attribute of facetsConfig) (like Cases, Sample, Files)

**Slider Component** <br>
**{type}** -min or max (slider input type)
| Sidebar Component | Child Component | Mui     | ClassName | Condition |
| :---              |    :----:       | :----:  |   :----:  |  ----:    |
| Facet Value | Input Min/Max | Input | slider_{***type***} | active    |

## 9. Styling Non Mui Custom Components
Classes provided by Bento Core Sidebar can be applied to the Custom elements.
```
className={clsx(classes.sectionSummaryText, classes[facetClasses])}
```

## 10  CLearAllFilterButton Component
Bento Core provides 1. function to clear all active filters, 2. disable flag (true incase of no active filters). Client is responsible for defining view (custom html).
```
import { ClearAllFiltersBtn, FacetFilter } from '@bento-core/facet-filter';
import { getFilters } from '@bento-core/facet-filter';

const CustomClearAllFiltersBtn = ({ onClearAllFilters, disable }) => {
    //...custom component 1. bind onClearFilters fn
    // 2. disable flag to disable button
} 
  // get filter data
  // filterState: state.statusReducer.filterState, (from reducer)
  // const activeFilters = getFilters(filterState) // formating

  <ClearAllFiltersBtn
    Component={CustomClearAllFiltersBtn}
    activeFilters={activeFilters}
  />  
```

## 11  Facet Value Component
```
// response 
// filterCaseCountByProgram: [{group: "COP", subjects: 301}]
const {
  name,
  customName,
  subjects,
  customSubjects,
  tooltip,
} = checkboxItem;

// 1. by default facet value component display group ("COP")
// 2. set customName to display customize value
// 3. by default facet value component display subjects (301)
// 4. set customSubjects to display customize value or adjust correct field for subject count
// 5. tooltip - provide text value to tooltip text

 /**
   * Add Bento frontend filter count/subjects
   * Add tootip text
   */
  const filterData = facetsConfig.reduce((acc, item) => {
    const facetValues = searchData[item.apiPath];
    if (!facetValues) {
      return acc;
    }
    const subjectCounts = [...facetValues].map((checkbox) => {
      const text = tooltipText[item.tooltipKey];
      return {
        ...checkbox,
        customSubjects: checkbox.count,
        tooltip: text ? text[checkbox.group] : undefined,
      };
    });
    return { ...acc, [item.apiPath]: [...subjectCounts] };
  }, {});

  <FacetFilter
    data={filterData}
    facetSectionConfig={facetSectionVariables}
    facetsConfig={facetsConfig}
    CustomFacetSection={CustomFacetSection}
    CustomFacetView={CustomFacetView}
  />
```