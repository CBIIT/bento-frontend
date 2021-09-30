import React from 'react';
import ReactDOM from 'react-dom';
// import { isTSAnyKeyword } from '@babel/types';
import CustomIcon from '../CustomIconView';

it('render without crashing', () => {
  const iconFileViewer = '';
  const div = document.createElement('div');
  ReactDOM.render(<CustomIcon imgSrc={iconFileViewer} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
