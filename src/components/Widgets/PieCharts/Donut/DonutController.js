import React from 'react';
import DonutView from './DonutView';

const DonutController = ({
  data, ...props
}) => <DonutView data={data} {...props} />;

export default DonutController;
