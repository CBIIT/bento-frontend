# PROFILE PAGE COMPONENT DESIGN

### Bento core Profile page:
```
import { ProfileView as BentoProfileView } from '@bento-core/profile';
<BentoProfileView
  data={data}
  imageMap={imageMap}
  changeUserBasicInfo={changeUserBasicInfo}
  editTool={editTool}
  ignoredArms={ignoredArms}
  profileArmsTable={profileArmsTable}
  tblThemeConfig={themeConfig}
/>
```

**Paginated Table Init State TABLE-1**
| Config | Required | description   | Configuration |
| :---        |    :----:|    :----:     |     ----: |
| data | TRUE |  getMyUser (User Info)| refer bento-frontend ProfileController.js |
| imageMap | TRUE | member: userIcon, 'non-member': inactiveUserIcon, admin: adminIcon, | image src, alt |
| changeUserBasicInfo | TRUE |   graphQL query |  refer updateMyUser bento-frontend profileData.js|
| editTool | TRUE |   edit icon | image src, alt |
| ignoredArms | TRUE | status | ['revoked', 'rejected'] |
| profileArmsTable | TRUE | table configuration | view bento-frontend profileData.js |
| tblThemeConfig | FALSE | table theme configuration | view bento-frontend profile/tblThemeConfig.js |



