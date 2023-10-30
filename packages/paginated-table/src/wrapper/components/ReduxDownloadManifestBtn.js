import React from 'react';
import { connect } from 'react-redux';
import DownloadManifestView from './DownloadManifestBtn';

const DownloadManifestRedux = (props) => <DownloadManifestView {...props} />;

const mapStateToProps = (state) => ({
  cartFiles: state.cartReducer && state.cartReducer.filesId,
});

export default connect(mapStateToProps)(DownloadManifestRedux);
