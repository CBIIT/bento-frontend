import React from 'react';
import {
  Button,
  withStyles,
  Link,
} from '@material-ui/core';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import Stats from '../../components/Stats/AllStatsController';
import Header from '../../components/About/HeaderView';
import l9dg from '../../assets/about/Photo-About_ICDC_model.jpg';
import CenterIcon from '../../assets/about/Model-Buttons-Center.svg';
import ZoomInIcon from '../../assets/about/Model-Buttons-ZoomIn.svg';
import ZoomOutIcon from '../../assets/about/Model-Buttons-ZoomOut.svg';
import linkIcon from '../../assets/about/About-ExternalLink.svg';
import Body from '../../components/About/BodyView';


const limitToBounds = false;
const panningEnabled = true;
const transformEnabled = true;
const pinchEnabled = true;
const limitToWrapperBounds = false;
const disabled = false;
const dbClickEnabled = true;
const lockAxisX = false;
const lockAxisY = false;
const velocityEqualToMove = false;
const enableWheel = true;
const enableTouchPadPinch = true;
const enableVelocity = true;
const disableLimitsOnWheel = true;

const ModelPage = ({ classes }) => (
  <>
    <Stats />
    <Header title="ICDC Data and Model" />
    <Body data={{
      img: l9dg,
      body: (
        <div className={classes.schema}>
          <p className={classes.title}>Harmonization/Integration:</p>
          {' '}
The ICDC functions best for the research community when the
data is integrated. Once a project is accepted into the ICDC,
 the ICDC data team will work with the submitter to review the
  data looking at data structure, data values, data quality as
  well as identifying any standards that were utilized. Based
   on that review, a plan for how to submit the data will be
   agreed upon between ICDC and the submitter.


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
            src={linkIcon}
            alt="outbounnd web site icon "
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


          <p className={classes.title}>Data Model:</p>
The ICDC data model is a representation of how all the
constituent data are arranged relative to each other.

  Given the number of studies, the range of study types and
  the multiple data types that the ICDC needs to support, the
  data model will need to adapt to the needs of the science.
  The data model is not static and is expected to change as
  new needs are identified.
          <br />
          <br />

The SVG graphic below represents the current ICDC data model consisting of data
nodes, node properties, and relationships (edges).   It provides a comprehensive
mapping of the system data, part of which may be viewed in the application interface
 and UI.   In other words, additional nodes and properties are available for
 inspection and querying beyond those presented on the front-end.
          <br />
          <br />
Additionally, the ICDC Data Model serves as a template for similar initiatives and
data structures, including graph-based database schemas.  The model will continue to
 evolve as data needs are further discerned.
          <br />
          <br />

The tool used to generate this visual may be sourced on Github at:

          <br />
          <Link href="https://github.com/CBIIT/icdc-model-tool" color="inherit" className={classes.link} target="_blank">
            {' '}
 https://github.com/CBIIT/icdc-model-tool
            {' '}
          </Link>
          <br />
          <br />
        </div>
      ),
    }}
    />

    <TransformWrapper
      defaultScale={1}
      options={{ limitToBounds, transformEnabled, disabled }}
      pan={{
        disabled: !panningEnabled,
        limitToWrapperBounds,
        lockAxisX,
        lockAxisY,
        velocityEqualToMove,
        velocity: enableVelocity,
      }}
      pinch={{ disabled: !pinchEnabled }}
      doubleClick={{ disabled: !dbClickEnabled }}
      wheel={{
        wheelEnabled: enableWheel,
        touchPadEnabled: enableTouchPadPinch,
        disableLimitsOnWheel,
      }}
    >
      {({
        zoomIn,
        zoomOut,
        resetTransform,
      }) => (
        <div className={classes.modelContainer}>
          <div className={classes.tools}>
            <Button onClick={zoomIn} className={classes.button}>
              <img src={ZoomInIcon} alt="Zoom In" />
            </Button>
            <Button onClick={zoomOut} className={classes.button}>
              <img src={ZoomOutIcon} alt="Zoom Out" />
            </Button>
            <Button onClick={resetTransform} className={classes.button}>
              <img src={CenterIcon} alt="Center " />
            </Button>
          </div>
          <div className={classes.imgSection}>
            <TransformComponent>
              <img src="https://cbiit.github.io/icdc-model-tool/model-desc/icdc-model.svg" alt="ICDC schema" className={classes.img} />
            </TransformComponent>
          </div>
        </div>
      )}
    </TransformWrapper>
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
  button: {
    margin: '10px 2px',
    color: 'white',
    '& img': {
      width: '50px',
    },
  },
  container: {
    maxWidth: '1440px',
    margin: 'auto',
  },
  tool: {
    margin: '20px auto',
  },
  schema: {
    overflowX: 'hidden',
    overflowY: 'hidden',
    width: '100%',
    margin: 'auto',

  },
  imgSection: {
    width: '100%',
    border: '2px solid #0296C9',
    borderRadius: '23px',
    marginBottom: '20px',
    height: '800px',
    maxHeight: '800px',
    overflow: 'hidden',
    '& .react-transform-element': {
      display: '-webkit-box !important',
    },
  },
  img: {
    width: '100%',
    padding: '20px',
  },
  modelContainer: {
    maxWidth: '1440px',
    margin: '-67px auto 60px auto',
    textAlign: 'center',
  },
});

export default withStyles(styles, { withTheme: true })(ModelPage);
