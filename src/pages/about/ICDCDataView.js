import React from 'react';
import { withStyles, Link } from '@material-ui/core';
import Stats from '../../components/Stats/AllStatsController';
import Header from '../../components/About/HeaderView';
import l9dg from '../../assets/about/Photo-About_ICDC_model.jpg';
import Body from '../../components/About/BodyView';
import externalIcon from '../../assets/about/About-ExternalLink.svg';

const ICDCData = ({ classes }) => (
  <>
    <Stats />
    <Header title="ICDC Data" />
    <Body data={{
      img: l9dg,
      body: (
        <div>
          <p className={classes.title}>Harmonization/Integration:</p>
          {' '}
The ICDC functions best for the research community when the
data is integrated. Once a project is accepted into the ICDC,
 the ICDC data team will work with the submitter to review the
  data looking at data structure, data values, data quality as
  well as identifying any standards that were utilized. Based
   on that review, a plan for how to submit the data will be
   agreed upon between ICDC and the submitter.
          <p className={classes.title}>Data Model:</p>

The ICDC data model is a representation of how all the
constituent data are arranged relative to each other.
The current data model is available for viewing on CBIIT’s
 Github repository (

          <Link
            title="icdc-model-tool"
            target="_blank"
            rel="noreferrer"
            href="https://cbiit.github.io/icdc-model-tool/"
            color="inherit"
            className={classes.link}
          >
            {' '}

            {' '}
https://cbiit.github.io/icdc-model-tool/
          </Link>
          <img
            src={externalIcon}
            alt="outbounnd web site icon"
            className={classes.linkIcon}
          />
).
  Given the number of studies, the range of study types and
  the multiple data types that the ICDC needs to support, the
  data model will need to adapt to the needs of the science.
  The data model is not static and is expected to change as
  new needs are identified.


          <p className={classes.title}>FAIR and citing:</p>
The ICDC will adhere to
          <Link
            title="FAIR"
            target="_blank"
            rel="noreferrer"
            href="https://www.go-fair.org/fair-principles/"
            color="inherit"
            className={classes.link}
          >
            {' '}
FAIR
          </Link>
          <img
            src={externalIcon}
            alt="outbounnd web site icon"
            className={classes.linkIcon}
          />
          {' '}


 principles of data stewardship:
 Findable, Accessible, Interoperable, and Reusable.
Please credit the ICDC in your manuscript. When citing
individual projects, please refer to the attribution policies
of the project when available.


          <p className={classes.title}>License:</p>

Data made available through the ICDC is for research purposes only.
The ICDC provides researchers with access to data from canine cancer
 studies to enable exploratory analysis that cannot be considered
 definitive for outcomes.
All data is publicly available.

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


export default withStyles(styles, { withTheme: true })(ICDCData);
