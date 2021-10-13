import React from 'react';
import {
  withStyles,
} from '@material-ui/core';
import Styles from './cartFooter.style';

const CartHeader = React.forwardRef(({
  classes,
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
    <div className={classes.manifestTextarea}>
      <textarea
        onChange={onChange}
        value={commentText}
        placeholder={placeholder}
        id="multiline-user-coments"
        className={classes.textField}
      />
    </div>
  );
});

export default withStyles(Styles, { withTheme: true })(CartHeader);
