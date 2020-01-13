import React from 'react';
import ProgramSunburstView from './ProgramSunburstView';

const ProgramSunburstController = ({
  data, ...props
}) => <ProgramSunburstView data={data} {...props} />;

export default ProgramSunburstController;
