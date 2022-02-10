import React from 'react';
import CaseCard from './cards/subjectCard';
import SampleCard from './cards/sampleCard';
import StudyCard from './cards/studyCard';
import FileCard from './cards/fileCard';
import ProgamCard from './cards/progamCard';
import ValueCard from './cards/valueCard';
import AboutCard from './cards/aboutCard';

const Components = {
  subject: CaseCard,
  sample: SampleCard,
  study: StudyCard,
  file: FileCard,
  program: ProgamCard,
  node: ValueCard,
  value: ValueCard,
  property: ValueCard,
  about: AboutCard,
};

export default ({
  searchText, data, classes, index,
}) => {
  if (typeof Components[data.type] !== 'undefined') {
    return React.createElement(Components[data.type], {
      data, classes, index, searchText,
    });
  }
  return React.createElement(
    () => (
      <div>
        The component
        {' '}
        {data.type}
        {' '}
        has not been created yet.
      </div>
    ),
  );
};
