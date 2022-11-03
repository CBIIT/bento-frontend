import React from 'react';
import { withStyles, CssBaseline } from '@material-ui/core';
import { HashRouter, Route, Switch } from 'react-router-dom';
import aboutPageRoutes from '../../bento/aboutPagesRoutes';
import Header from '../Header/HeaderView';
import NavBar from '../NavBar/NavBarContainer';
import Footer from '../Footer/FooterView';
import Error from '../../pages/error/Error';
import Dashboard from '../../pages/dashboardTab/dashboardController';
import CaseDetail from '../../pages/caseDetail/caseDetailController';
import ArmDetail from '../../pages/armDetail/armDetailController';
import modelPage from '../../pages/modelPage/modelPageView';
import table from '../../pages/table/tableView';
import Home from '../../pages/landing/landingController';
import About from '../../pages/about/aboutController';
import DataDictonary from '../../pages/dataDictionary/dataDictonaryController';
import Programs from '../../pages/programs/programsController';
import ProgramDetail from '../../pages/programDetail/programDetailController';
import GraphqlClient from '../GraphqlClient/GraphqlView';
import fileCentricCart from '../../pages/fileCentricCart/cartController';
// import JBrowse from '../JBrowse/JBrowseView';
import JBrowseDetail from '../../pages/jbrowseDetail/jbrowseDetailController';
import GlobalSearch from '../../pages/search/searchView';
import GlobalSearchController from '../../pages/search/searchViewController';
import adminController from '../../pages/admin/adminController';
import reviewRequestController from '../../pages/admin/reviewPendingDAR/reviewRequestController';
import Login from '../../pages/accessManagment/login';
import RequestAccess from '../../pages/requestAccess/requestAccessController';
import SysInfoView from '../../pages/sysInfo/view';
import ProfileController from '../../pages/profile/profileController';
import editUserController from '../../pages/admin/userDetails/editUserController';
import viewUserController from '../../pages/admin/userDetails/viewUserController';
import InActivityDialog from '../InActivityDialog';

import fakeAdminView from '../../pages/fakeAdmin';

// Access control imports
import PrivateRoute, { LoginRoute, AdminRoute, MixedRoute } from './privateRoute';

import Notifactions from '../Notifications/NotifactionView';

const ScrollToTop = () => {
  window.scrollTo(0, 0);
  return null;
};

const Layout = ({ classes, isSidebarOpened }) => (
  <>
    <CssBaseline />
    <HashRouter>
      <>
        <Notifactions />
        <InActivityDialog />
        <Header />
        <NavBar />
        {/* Reminder: Ajay need to replace the ICDC with env variable and
          change build npm to read env variable */}
        <div
          className={classes.content}
        >
          <Route component={ScrollToTop} />
          <Switch>
            <MixedRoute exact path="/" component={Home} />
            <MixedRoute exact path="/home" component={Home} />

            {/* START: Private Routes */}
            {/* SECTION: Non-Member & Member only Path */}
            <PrivateRoute path="/request" requiuredSignIn access={['member', 'non-member']} component={RequestAccess} />
            <PrivateRoute path="/profile" requiuredSignIn access={['member', 'non-member', 'admin']} component={ProfileController} />
            {/* END SECTION */}

            {/* SECTION: Member & Admin only Path */}
            <PrivateRoute path="/explore" access={['admin', 'member']} component={Dashboard} />
            <PrivateRoute path="/programs" access={['admin', 'member']} component={Programs} />
            <PrivateRoute path="/model" access={['admin', 'member']} component={modelPage} />
            <PrivateRoute path="/fileCentricCart" access={['admin', 'member']} component={fileCentricCart} />
            <PrivateRoute path="/program/:id" access={['admin', 'member']} component={ProgramDetail} />
            <PrivateRoute path="/case/:id" access={['admin', 'member']} component={CaseDetail} />
            <PrivateRoute path="/arm/:id" access={['admin', 'member']} component={ArmDetail} />
            <PrivateRoute path="/fileViewer/:id" requiuredSignIn access={['admin', 'member']} component={JBrowseDetail} />
            {/* END SECTION */}

            {/* SECTION: Admin only Path */}
            <AdminRoute path="/adminportal" requiuredSignIn access={['admin']} component={fakeAdminView} />
            <AdminRoute path="/admin/edit/:id" requiuredSignIn access={['admin']} component={editUserController} />
            <AdminRoute path="/admin/view/:id" requiuredSignIn access={['admin']} component={viewUserController} />
            <AdminRoute path="/admin/review/:id" requiuredSignIn access={['admin']} component={reviewRequestController} />
            <AdminRoute path="/admin" access={['admin']} requiuredSignIn component={adminController} />
            {/* END SECTION */}

            {/* NOTE: Please check these below paths. if no longer needed please remove it */}
            {/* <PrivateRoute path="/JBrowse"
            access={['admin', 'member']} component={JBrowse} /> */}
            <PrivateRoute path="/table" component={table} />
            {/* END NOTE */}

            {/* Psuedo Private routes where minor
            functionality can be accessed my unauthorized users */}
            <Route exact path="/search" access={['admin', 'member', 'non-member']} component={GlobalSearch} />
            <Route path="/search/:id" access={['admin', 'member', 'non-member']} component={GlobalSearchController} />

            {/* END: Private Routes */}

            {aboutPageRoutes.map(
              (aboutPageRoute, index) => (
                <Route
                  key={index}
                  path={aboutPageRoute}
                  component={About}
                />
              ),
            )}
            <Route path="/data-dictionary" component={DataDictonary} />
            <Route path="/graphql" component={GraphqlClient} />
            <LoginRoute path="/login" component={Login} />
            <Route path="/sysinfo" component={SysInfoView} />
            <Route component={Error} />
          </Switch>
          <Footer data={{ isSidebarOpened }} />
        </div>
      </>
    </HashRouter>
  </>
);

const styles = (theme) => ({
  root: {
    display: 'flex',
    maxWidth: '100vw',
    overflowX: 'hidden',
  },
  content: {
    flexGrow: 1,
    // width: `calc(100vw - 240px)`,   // Ajay need to add this on addung side bar
    width: 'calc(100%)', // Remove this on adding sidebar
    background: theme.custom.bodyBackGround,
    marginTop: '185px',
  },
  '@global': {
    '*::-webkit-scrollbar': {
      width: '0.5em',
      height: '0.4em',
    },
    '*::-webkit-scrollbar-track': {
      '-webkit-box-shadow': 'inset 0 0 6px #ccc',
      borderRadius: '0px',
      backgroundColor: '#FFFFFF',
    },
    '*::-webkit-scrollbar-thumb': {
      backgroundColor: '#97b0c0',
      outline: '1px solid slategrey',
      borderRadius: '0px',
    },
  },
});

export default withStyles(styles)(Layout);
