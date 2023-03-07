import React from 'react';
import { Button } from '@material-ui/core';

export const CustomLinkView = (props) => {
  const onClickHandler = () => {
    console.log('custom link 1');
    console.log(props);
  };

  const { label } = props;
  return (
    <>
      <Button onClick={onClickHandler}>
        {label}
      </Button>
    </>
  );
};

export const otherCOmponents = '';
