import React from 'react';
import {
  withStyles,
} from '@material-ui/core';
import Styles from './cartFooter.style';

const CartHeader = ({
  classes: {
    textField,
  },
  placeholder,
}, ref) => {
  const [commentText, setcommentText] = React.useState('');
  const onChange = ({ target: { value } }) => setcommentText(value);

  React.useImperativeHandle(ref, () => ({
    getValue() {
      return commentText;
    },
  }));

  return (
    <textarea
      onChange={onChange}
      value={commentText}
      className={textField}
      placeholder={placeholder}
      id="multiline-user-coments"
    />
  );
};

const forwardCartHeader = React.forwardRef(CartHeader);
export default withStyles(Styles, { withTheme: true })(forwardCartHeader);
