import React from 'react';
import DonutView from './CustomActiveDonutView';

const DonutController = ({
  data, ...props
}) => <DonutView data={data} {...props} />;

export default DonutController;
