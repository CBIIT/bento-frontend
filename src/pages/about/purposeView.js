import React from 'react';
import { withStyles, Link } from '@material-ui/core';
import Stats from '../../components/Stats/AllStatsController';
import Header from '../../components/About/HeaderView';
import l9dg from '../../assets/about/Photo-About_Purpose.jpg';
import Body from '../../components/About/BodyView';
import externalIcon from '../../assets/about/About-ExternalLink.svg';

const PurposeView = ({ classes }) => (
  <>
    <Stats />
    <Header title="Purpose" />
    <Body data={{
      img: l9dg,
      body: (
        <div>
          {' '}
NCI's Division of Cancer Treatment and Diagnosis (DCTD) charged
the Frederick National Laboratory for Cancer Research (FNLCR) to
build the Integrated Canine Data Commons (ICDC), a cloud-based repository
of canine cancer data. ICDC was established to further research
on human cancers by enabling comparative
analysis with canine cancer. The data in the ICDC is sourced
from multiple different programs and projects; all focused on
the canine subjects.


   The data is harmonized
  into an integrated data model and then made available to the research community.
   The ICDC is part of the Cancer Research Data Commons (CRDC), an initiative
   from NCI’s Center for Biomedical Informatics and Information Technology (CBIIT).
   Bioinformatic analysis of the ICDC data is accomplished using the CRDC’s

          <Link
            title="Cloud Resources."
            target="_blank"
            rel="noreferrer"
            href="https://datascience.cancer.gov/data-commons/cloud-resources"
            color="inherit"
            className={classes.link}
          >
            {' '}
            {' '}
Cloud
   Resources
          </Link>
          <img
            src={externalIcon}
            alt="outbounnd web site icon"
            className={classes.linkIcon}
          />
.
          <br />
          <br />
Within the FNLCR, the Biomedical Informatics and Data Science (BIDS) Directorate is
focused on software engineering and data handling.  The Applied and Developmental
Research Directorate (ADRD) is managing the ICDC Steering Committee and providing
 one of the data sources for the ICDC. Finally, there is also an ICDC Steering
 Committee (composed of external members, FNLCR and NCI staff) that provides advice
  to DCTD on the ICDC.
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


export default withStyles(styles, { withTheme: true })(PurposeView);
