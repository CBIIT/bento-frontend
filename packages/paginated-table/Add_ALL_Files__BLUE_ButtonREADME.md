**NOTE: Create a new dashboard page using bento-core components before removing old dashboard page**
<br>
<span style="color:yellow">
Assuming New Dashboard page have Filter component and table component from bento-core
</span>.

### 1 Configure Add_All_Button Or BLUE Button in Dashboard

```
import React, { useCallback } from 'react';
import { ButtonView, btnTypes, TableContextProvider } from '@bento-core/paginated-table';

<ButtonView
  btnType={btnTypes.ADD_ALL_FILES}
  title="Add all files Btn"
  clsName="add_all_button"
  maxFileLimit={10000}
  activeFilters={activeFilters}
  addFileQuery={GET_ALL_FILEIDS_CASESTAB_FOR_SELECT_ALL}
  responseKeys={['caseOverview', 'files']}
  classes={classes}
  section="toolTipText"
  tooltipCofig={{
    arrow: true,
    clsName: 'addAllTooltip',
    toolTipText: 'Add filtered files associated with all cases',
    icon: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/icdc/images/svgs/Tooltip.SpeechBubble.svg',
    }}
/>
```

**Add All Button Component or Configuration Properties**
| Component Props | Required | description   | Configuration |
| :---        |    :----:|    :----:     |     ----: |
| btnType | TRUE | Determines the role of the button, add all files (blue) or add selected files (orange) | btnTypes.ADD_ALL_FILES, btnTypes.ADD_SELECTED_FILES or btnTypes.DOWNLOAD_MANIFEST |
| title | TRUE | text for the button | 'Add all files' |
| clsName | TRUE | configure theme with themeprovider | |
| maxFileLimit | FALSE | limits no of files that can be added to myCart | 0 - 10000 (by default 1000) |
| addFileQuery | TRUE | query to retrive files or file ids | graphQL query |
| responseKeys | TRUE | Keys to access file_ids reponse provided by addFileQuery, provided as list to access the nested respose object or list (max depth upto 2) | ['caseOverview', 'files'] |
| section | TRUE | This key is used for accessing the tootip text provided in tooltipCofig | section="toolTipText" |
| classes | TRUE | provide class for toltips to override the style |  tooltip: classes.customTooltip, arrow: classes.customArrow
| tooltipCofig | FALSE | displays tooltip if provided, configuration for arrow, clsName, icon, tooltipText | graphQL query |
| activeFilters | TRUE | filtes the case or sample based on the active filters | graphQL query |


### 2 Configure Add_All_Button Or BLUE Button in Dashboard

```
    const customTheme = {
      MuiContainer: {
        root: {
          '& img': {
            width: '17px',
            '&.addAllTooltip': {
                verticalAlign: 'top',
                marginTop: '8px',
            },
          },
        },
      },
    };

    const btnTheme = createTheme({ overrides: { ...customTheme } });
      <ThemeProvider theme={btnTheme}>
        <Container
          maxWidth="xl"
        >
          <ButtonView
            btnType={btnTypes.ADD_ALL_FILES}
            title="Add all files Btn"
            clsName="add_all_button"
            maxFileLimit={10000}
            activeFilters={activeFilters}
            addFileQuery={GET_ALL_FILEIDS_CASESTAB_FOR_SELECT_ALL}
            responseKeys={['caseOverview', 'files']}
            classes={classes}
            section="toolTipText"
            tooltipCofig={{
              arrow: true,
              clsName: 'addAllTooltip',
              toolTipText: 'Add filtered files associated with all cases',
              icon: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/icdc/images/svgs/Tooltip.SpeechBubble.svg',
            }}
          />
          <ButtonView
            btnType={btnTypes.ADD_SELECTED_FILES}
            title="ADD SELECTED FILES Btn"
            clsName="add_selected_button"
            dataKey="case_ids"
            addFileQuery={GET_ALL_FILEIDS_CASESTAB_FOR_SELECT_ALL}
            responseKeys={['caseOverview', 'files']}
            classes={classes}
            tooltipCofig={{
              arrow: true,
              clsName: 'addSelectedFileTooltip',
              tooltipText: 'Add files associated selected cases',
              icon: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/icdc/images/svgs/Tooltip.SpeechBubble.svg',
            }}
          />
        </Container>
      </ThemeProvider>

      <Grid container>
        <Grid item xs={12} id={config.tableID}>
          <TableView
            initState={initTblState}
            ...
          />
        </Grid>
      </Grid>
```