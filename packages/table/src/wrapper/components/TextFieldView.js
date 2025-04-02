import React, { useContext, useEffect, useState } from 'react';
import {
  CartContext,
  onCommentChange,
} from '@bento-core/cart';

const TextFieldView = ({
  clsName,
  placeholder,
}) => {
  const [text, setText] = useState('');
  const cartContext = useContext(CartContext);
  const { context } = cartContext;
  const {
    dispatch,
  } = context;
  useEffect(() => {
    dispatch(onCommentChange(text));
  }, [text]);
  return (
    <textarea
      onChange={(e) => {
        setText(`${e.target.value}`);
      }}
      className={clsName}
      placeholder={placeholder}
      id="multiline-user-coments"
    />
  );
};

export default TextFieldView;
