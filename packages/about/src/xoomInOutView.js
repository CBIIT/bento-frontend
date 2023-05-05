import React from 'react';
import {
  Button, withStyles,
} from '@material-ui/core';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import CenterIcon from './assets/Model-Buttons-Center.svg';
import ZoomInIcon from './assets/Model-Buttons-ZoomIn.svg';
import ZoomOutIcon from './assets/Model-Buttons-ZoomOut.svg';

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

const ModelPage = ({ classes, children }) => (
  <>
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
              {children}
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
    color: 'white',
    '& img': {
      width: '40px',
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
    border: '2px solid #7D92AE',
    borderRadius: '23px',
    marginBottom: '20px',
    height: 'auto',
    overflow: 'hidden',
    '& .react-transform-element': {
      display: '-webkit-box !important',
    },
  },
  img: {
    width: '100%',
  },
  modelContainer: {
    display: 'flex',
    maxWidth: '1440px',
    margin: '-67px 40px 60px 40px',
    textAlign: 'center',
    '@media (min-width: 1400px)': {
      margin: '-67px auto 60px auto',
    },
  },
  tools: {
    maxWidth: '60px',
    height: '168px',
    padding: '4px',
    marginTop: '100px',
    background: '#7D92AE',
    borderRadius: '23px 0px 0px 23px',
  },
});

export default withStyles(styles)(ModelPage);
