import { compose, lifecycle } from 'recompose';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import NavBarView from './NavBarView';
import { toggleSidebar } from '../Layout/LayoutState';
import { initCart } from '../../pages/fileCentricCart/store/cart';

export default compose(
  withRouter,
  connect(
    (state) => ({
      isSidebarOpened: state.layout.isSidebarOpened,
      cartFieldIds: state.cart.fileIds,
    }),
    { toggleSidebar },
  ),
  lifecycle({
    componentDidMount() {
      initCart();
    },
    shouldComponentUpdate({ location: nextLocation }) {
      const pathName = this.props.location.pathname;
      return (
        pathName !== nextLocation || false // if the path is same don't update
      );
    },
  }),
)(NavBarView);
