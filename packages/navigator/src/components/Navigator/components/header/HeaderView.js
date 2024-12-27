import React, { useState } from 'react';
import DropDownView from './dropdown/DropdownView';
// import { useModelContext } from '../../state/NavContextProvider';

const HeaderView = ({

}) => {
  const [displayReadMe, setDisplayReadMe] = useState(false);
  const [content, setContent] = useState(undefined);

  /**
  * use context access data model state
  */
  // const { context } = useModelContext();
  // console.log(context.readMeConfig);
  return (
    <>
      <h2>header</h2>
      <DropDownView />
    </>
  );
}

export default HeaderView;
