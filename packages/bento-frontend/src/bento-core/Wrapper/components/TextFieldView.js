import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../Cart/ContextProvider';
import { onCommentChange } from '../../Cart/state/actions';

const TextFieldView = ({
  clsName,
  placeholder,
}) => {
  const [text, setText] = useState('');
  const cartContext = useContext(CartContext);
  const {
    dispatch,
  } = cartContext.context;
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
