### Configure Navigator component
## 1 Import NavaigatorLayoutView
* refer DemoNavigator.js (public/DemoNavigator.js)

**NavaigatorLayoutView Configuration TABLE-1**
| Component Param | Required | description   | type |
| :---        |    :----:|    :----:     |     ----: |
| nodesYamlFilePath | TRUE | Model YMAL file url | string |
| propertiesYamlFilePath | TRUE | Properties YMAL file url | string |
| readMeConfig | TRUE | documentation content for model | refer DemoNavigator.js |
| graphConfig | FALSE | canvas specific configuration | refer DemoNavigator.js |
| nodeTree | FALSE | canvas specific configuration | refer DemoNavigator.js |
| node2DPosition | FALSE | 2D array to position node | 2D array **(must contain for all the nodes)** |

## 2 For code changes as per bento specific requirement and demo - Set up demo project
```
npm i
npm run dev
npm publish --tag=bento-project
```
