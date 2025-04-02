import React from 'react';
import { connect } from 'react-redux';
import SnackbarView from './Snackbar';

const ReduxSnackbar = ((props) => <SnackbarView {...props} />);

const mapStateToProps = (state) => ({
  count: state.cartReducer.count,
});

export default connect(mapStateToProps, null)(ReduxSnackbar);
