import React from 'react';
import {
  Button,
  withStyles,
} from '@material-ui/core';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import CenterIcon from '../../assets/about/Model-Buttons-Center.svg';
import ZoomInIcon from '../../assets/about/Model-Buttons-ZoomIn.svg';
import ZoomOutIcon from '../../assets/about/Model-Buttons-ZoomOut.svg';

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
              <img src="https://cbiit.github.io/ctdc-model/model-desc/ctdc-model.svg" alt="ICDC schema" className={classes.img} />
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
    maxWidth: '1440px',
    margin: '-67px auto 60px auto',
    textAlign: 'center',
  },
});

export default withStyles(styles, { withTheme: true })(ModelPage);
