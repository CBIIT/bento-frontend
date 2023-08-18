
### 1 Use bento-core/paginated-table package version publish by ICDC
Alternative configuration for ORANGE button
```
// 1.0.1-icdc.3
npm i @bento-core/paginated-table@1.0.1-icdc.3

or in package.json
{
    @bento-core/paginated-table: '1.0.1-icdc.3'
}
```

**Assuming table component is imported from bento-core/paginated-table**

### 2 Configure Add_All_Button Or BLUE Button in Dashboard

```
import React, { useCallback } from 'react';
import { ButtonView, btnTypes } from '@bento-core/paginated-table';

const AddSelectedFilesOrangeButton = useCallback(() => (
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
  ), []);
```

**Add All Button Component or Configuration Properties**
| Component Props | Required | description   | Configuration |
| :---        |    :----:|    :----:     |     ----: |
| btnType | TRUE | Determines the role of the button, add all files (blue) or add selected files (orange) | btnTypes.ADD_ALL_FILES, btnTypes.ADD_SELECTED_FILES or btnTypes.DOWNLOAD_MANIFEST |
| title | TRUE | text for the button | 'Add Selected files' |
| clsName | TRUE | configure theme with themeprovider | |
| addFileQuery | TRUE | query to retrive files or file ids | graphQL query |
| responseKeys | TRUE | Keys to access file_ids reponse provided by addFileQuery, provided as list to access the nested respose object or list (max depth upto 2) | ['caseOverview', 'files'] |
| classes | TRUE | provide class for toltips to override the style |  tooltip: classes.customTooltip, arrow: classes.customArrow
| tooltipCofig | FALSE | displays tooltip if provided, configuration for arrow, clsName, icon, tooltipText | graphQL query |
| dataKey | TRUE | Attribute used for getting selected rows in a table | case_id, file_name or any other column with distinct values |


### 3 Configure Add_All_Button Or BLUE Button in Dashboard

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
      <Container>
        <AddSelectedFilesOrangeButton /> // from step 2
      </Container>
    </ThemeProvider>
```