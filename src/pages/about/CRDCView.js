import React from 'react';
import { withStyles, Link } from '@material-ui/core';
import Stats from '../../components/Stats/AllStatsController';
import Header from '../../components/About/HeaderView';
import l9dg from '../../assets/about/Photo-About_CRDC.jpg';
import Body from '../../components/About/BodyView';
import externalIcon from '../../assets/about/About-ExternalLink.svg';

const CRDC = ({ classes }) => (
  <>
    <Stats />
    <Header title="Cancer Research Data Commons (CRDC) and Analysis" />
    <Body data={{
      img: l9dg,
      body: (
        <div>
          {' '}
          <p className={classes.title}>CRDC:</p>

          {' '}

          <Link
            title="Cancer Research DataCommons"
            target="_blank"
            rel="noreferrer"
            href="https://datascience.cancer.gov/data-commons"
            color="inherit"
            className={classes.link}
          >
            {' '}

            {' '}
The Cancer Research DataCommons
          </Link>
          <img
            src={externalIcon}
            alt="outbounnd web site icon"
            className={classes.linkIcon}
          />
          {' '}
is an initiative from NCI’s Center for Biomedical Informatics & Information Technology


       (
          {' '}
          <Link
            title="CBIIT"
            target="_blank"
            rel="noreferrer"
            href="https://datascience.cancer.gov/"
            color="inherit"
            className={classes.link}
          >
            {' '}

            {' '}
 CBIIT
          </Link>
          <img
            src={externalIcon}
            alt="outbounnd web site icon"
            className={classes.linkIcon}
          />
).
          {' '}
CBIIT’s vision for the project consists of a virtual,
expandable infrastructure that provides secure access to
many different data types across scientific domains,
allowing users to analyze, share, and store results,
leveraging the storage and elastic compute, or ability to
 easily scale resources, of the cloud.
 The ability to combine diverse data types
 and perform cross-domain analysis of large data sets
 can lead to new discoveries in cancer prevention, treatment
 and diagnosis, and supports the goals of precision medicine and
  the Cancer Moonshot℠.
          <br />
          <br />

          <p className={classes.title}> Cloud Resources:</p>
The CRDC has three

          <Link
            title="Cloud Resources"
            target="_blank"
            rel="noreferrer"
            href="https://datascience.cancer.gov/data-commons/cloud-resources"
            color="inherit"
            className={classes.link}
          >
            {' '}

            {' '}
Cloud Resources
          </Link>
          <img
            src={externalIcon}
            alt="outbounnd web site icon"
            className={classes.linkIcon}
          />
          {' '}
options
(

          <Link
            title="Seven Bridges Cancer Genomics Cloud"
            target="_blank"
            rel="noreferrer"
            href="http://www.cancergenomicscloud.org/"
            color="inherit"
            className={classes.link}
          >
            {' '}

           Seven Bridges Cancer Genomics Cloud
          </Link>
          <img
            src={externalIcon}
            alt="outbounnd web site icon"
            className={classes.linkIcon2}
          />
,

          <Link
            title="ISB Cancer Genomics Cloud"
            target="_blank"
            rel="noreferrer"
            href="https://isb-cgc.appspot.com/"
            color="inherit"
            className={classes.link}
          >
            {' '}

            {' '}
            ISB Cancer Genomics Cloud
          </Link>
          <img
            src={externalIcon}
            alt="outbounnd web site icon"
            className={classes.linkIcon}
          />
,

          <Link
            title="Terra"
            target="_blank"
            rel="noreferrer"
            href="https://terra.bio/"
            color="inherit"
            className={classes.link}
          >
            {' '}

            {' '}
 Terra

          </Link>
          <img
            src={externalIcon}
            alt="outbounnd web site icon"
            className={classes.linkIcon}
          />
          ), each providing analysis platforms for
the community to use when working with Data Commons data.
          <br />
          <br />
          These cloud-based platforms eliminate the need for researchers to download and
store extremely large data sets by allowing them to bring analysis tools to the
 data in the cloud, instead of the traditional process of bringing the data to
 the tools on local hardware. The Cloud Resources also provide access to on-demand
  computational capacity to analyze these data. The Cloud Resources allow users to
  run best practice tools and pipelines already implemented or upload their own
  data or analysis methods to workspaces.
          <br />
          <br />
All three Cloud Resources provide support for data access through a web-based
user interface in addition to programmatic access to analytic tools and workflows,
 and the capability of sharing results with collaborators. Each Cloud Resource is
 continually developing new functionality to improve the user experience and add
 new tools for researchers.
          <br />
          <br />


          <span className={classes.title}>Seven Bridges Cancer Genomics Cloud (SBG)  </span>
 is hosted on Amazon Web Services and has a rich
user interface that allows researchers to find data of interest and combine it with
 their own private data. Data can be analyzed using more than 200 preinstalled,
 curated bioinformatics tools and workflows. Researchers can also extend the
 functionality of the platform by adding their own data and tools via an intuitive
  software development kit.
          <br />
          <br />
          <span className={classes.title}>
          Institute for Systems Biology Cancer Genomics Cloud (ISB-CGC)
            {' '}
          </span>
          {' '}
leveraging many aspects of the Google Cloud Platform,
 allows scientists to interactively define and compare cohorts, examine underlying
 molecular data for specific genes and pathways, and share insights with
 collaborators. For computational users, Application Program Interfaces (APIs) and
 Google Cloud Platform (GCP) resources such as BigQuery and Google Pipeline service,
 allow complex queries from R or Python scripts, or Dockerized workflows to run on
 data available in the Google Cloud Storage.
          <br />
          <br />

          <span className={classes.title}>Broad Institute Terra </span>
is an open, standards-based platform for performing production-scale data
 analysis in the cloud. Built on the Google Cloud Platform, Terra empowers

 analysts, tool developers, and production managers to run large-scale analysis and
  to share results with collaborators. Users can upload their own analysis methods
  and data to workspaces or run the Broad’s best practice tools and pipelines.
          <br />
          <br />
          <p className={classes.title}> From ICDC to Cloud Resources:</p>

Researchers find cases/cohorts in ICDC and then identify the files they would like
to use for analysis. This list of files is called a Manifest. The user will
download the Manifest and then upload the Manifest into SBG where the files will be available
for analysis.
The user will need a SBG account. The Manifest file is a text file consisting of CRDC
Identifiers and, on uploading to SBG, the user will be able to access the relevant
 data files and see some basic case information.

          <br />
          <br />
This Cloud Resource analysis model eliminates the need for researchers to download
 and store extremely large data sets by allowing them to bring analysis tools to the
  data in the cloud, instead of the traditional process of bringing the data to the
  tools on local hardware. The Cloud Resources also provide access to on-demand
  computational capacity to analyze these data, allow users to run best practice
  tools and pipelines already implemented, and upload their own data or analysis
  methods to workspaces.

          <br />
          <br />
All three Cloud Resources provide support for data access through a web-based user
 interface in addition to programmatic access to analytic tools and workflows, and
 the capability of sharing results with collaborators. Each Cloud Resource is
 continually developing new functionality to improve the user experience and add new
 tools for researchers.

          <br />
          <br />
Currently the ICDC supports analysis via the SBG Cloud Resource.

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
  linkIcon2: {
    width: '20px',
    verticalAlign: 'sub',
    margin: '0px 0px 0px 0px',
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


export default withStyles(styles, { withTheme: true })(CRDC);
