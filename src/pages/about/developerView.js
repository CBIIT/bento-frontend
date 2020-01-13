import React from 'react';
import { withStyles, Link } from '@material-ui/core';
import Stats from '../../components/Stats/AllStatsController';
import Header from '../../components/About/HeaderView';
import l9dg from '../../assets/about/Photo-About_Developer.jpg';
import Body from '../../components/About/BodyView';
import externalIcon from '../../assets/about/About-ExternalLink.svg';

const Developers = ({ classes }) => (
  <>
    <Stats />
    <Header title="Developers" />
    <Body data={{
      img: l9dg,
      body: (
        <div>
          {' '}
The ICDC System features two read-only API’s that are available
 for public consumption:  GraphQL and REST:
          <br />
          <br />

http://caninecommons.cancer.gov/v1/graphql/
          <br />
          <br />
http://caninecommons.cancer.gov/v1/REST
          <br />
          <br />
Users do not require authentication to the system - the data is public.
          <br />
          <br />
These APIs are provided   “as is”; there are no warranties
or conditions arising out of usage of these services.
          <br />
          <br />
          <br />
          <hr />
          <br />
          <br />
          <p className={classes.title}> GitHub:</p>
As a resource for the public and cancer research,
          {' '}
          <Link
            title=" ICDC GitHub Repository"
            target="_blank"
            rel="noreferrer"
            href="https://github.com/CBIIT/icdc-codebase"
            color="inherit"
            className={classes.link}
          >
            {' '}

            {' '}
             The ICDC GitHub repo
          </Link>
          <img
            src={externalIcon}
            alt="outbounnd web site icon"
            className={classes.linkIcon}
          />
          {' '}
is available for research,
 usage, forking, and pull requests.

 The codebase is intended for sharing and building
 frameworks for related initiatives and projects.

          The ICDC GitHub repo
           has documentation about how to access the system,
 including endpoints and recommendations for tools and example queries.

 Both the project and documentation are currently maintained and updated.
          <br />
          <br />
 ICDC is based on a Graph database, and features a GraphQL API (Java),
 a REST API (Java) and a React front-end (JavaScript).
  Each tier in the application stack is designed to be modular
  and adaptable for a variety of use-cases and scenarios.

          <br />
          <br />
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


export default withStyles(styles, { withTheme: true })(Developers);
