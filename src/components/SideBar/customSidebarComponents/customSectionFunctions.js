/* eslint-disable no-useless-constructor */
import { SectionsFunctions } from 'bento-components';
import _ from 'lodash';

class customSectionFunctions extends SectionsFunctions {
  constructor(props) {
    super(props);
  }

  handleGroupsChange = (panel) => (event, isExpanded) => {
    const { groupsExpanded } = this.state;
    const groups = _.cloneDeep(groupsExpanded);
    if (isExpanded) {
      groups.push(panel);
    } else {
      const index = groups.indexOf(panel);
      if (index > -1) {
        groups.splice(index, 1);
      }
    }
    console.log('Custom Logic');
    this.setState({ groupsExpanded: groups });
  };
}

export default customSectionFunctions;
