import React from 'react';
import CanvasView from './Canvas/CanvasController';
import { useModelContext } from '../../state/NavContextProvider';

const GraphView = ({
  dictionary,
  tabViewWidth
}) => {
    const { context = {}} = useModelContext();
    const { filterDictionary } = context;
    return (
      <>
        <CanvasView
          dictionary={filterDictionary || dictionary}
          tabViewWidth={tabViewWidth}
        />
      </>
    );
} 

export default GraphView;
