import React from 'react';
import { withStyles, Link } from '@material-ui/core';
import Stats from '../../components/Stats/AllStatsController';
import Header from '../../components/About/HeaderView';
import l9dg from '../../assets/about/About_Support.jpg';
import Body from '../../components/About/BodyView';

const SupportView = ({ classes }) => (
  <>
    <Stats />
    <Header title="Support" />
    <Body data={{
      img: l9dg,
      body: (
        <div>
          {' '}
If you have any questions,
        please contact us at
          <Link href="mailto: ICDCHelpDesk@mail.nih.gov" color="inherit" className={classes.link}>
            {' '}
            ICDCHelpDesk@mail.nih.gov
            {' '}
          </Link>
          .
        </div>),
    }}
    />
  </>
);

const styles = () => ({
  linkIcon: {
    width: '20px',
    verticalAlign: 'sub',
    margin: '0px 0px 0px 2px',
  },
  link: {
    color: '#0296C9',
    fontWeight: 'bolder',
    '&:hover': {
      color: '#0296C9',
      fontWeight: 'bolder',
      textDecoration: 'none',
    },
  },
  title: {
    color: '#0B3556',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
});


export default withStyles(styles, { withTheme: true })(SupportView);
