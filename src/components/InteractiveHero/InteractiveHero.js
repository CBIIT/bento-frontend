import React from 'react';
import { withStyles } from '@material-ui/core';
import HorseShoe from './HorseShoe';
import ActiveCases from '../../assets/landing/animation/CasesActive.png';
import InActiveCases from '../../assets/landing/animation/CasesInActive.png';
import WhispInActive from '../../assets/landing/animation/Whisp-All_Active.png';
import ActiveFiles from '../../assets/landing/animation/FilesActive.png';
import InActiveFiles from '../../assets/landing/animation/FilesInActive.png';
import ActiveTrials from '../../assets/landing/animation/TrialsActive.png';
import InActiveTrials from '../../assets/landing/animation/TrialsInActive.png';
import CircularIcon from './CircularIcon';
import FacingDown from '../../assets/landing/animation/Dial_facing_down.svg';
import FacingLeft from '../../assets/landing/animation/Dial_facing_left.svg';
import FacingUp from '../../assets/landing/animation/Dial_facing_up.svg';
import FacingRight from '../../assets/landing/animation/Dial_facing_right.svg';

const CasesInActiveText = ({ classes, heroData }) => (
  <div className={classes.inActiveTextBG}>
    <div className={classes.whiteTextInactive}>
      {heroData ? heroData.numberOfCases : 'NA'}
      {' '}
CASES
    </div>
  </div>
);

const CasesActiveText = ({ classes, heroData }) => (
  <div className={classes.activeTextBG}>
    <div className={classes.whiteText}>
      {heroData ? heroData.numberOfCases : 'NA'}
      {' '}
      CASES
    </div>
    <div className={classes.blueText}>
  from
      {' '}
      {heroData ? heroData.numberOfTrials : 'NA'}
      {' '}
TRIAL
    </div>
    <div className={classes.blueText}>
  from
      {' '}
      {heroData ? heroData.numberOfArms : 'NA'}
      {' '}
ARMs
    </div>
  </div>
);

const TrialsInActiveText = ({ classes, heroData }) => (
  <div className={classes.inActiveTextBG}>
    <div className={classes.whiteTextInactive}>
      {heroData ? heroData.numberOfDiagnoses : 'NA'}
      {' '}
      DIAGNOSES
    </div>
  </div>
);

const TrialsActiveText = ({ classes, heroData }) => {
  const sortedDiagnosis = heroData.diagnosisCountByArm.sort((a, b) => a.diagnoses > b.diagnoses);
  return (
    <div className={classes.inActiveTextBG}>
      <div className={classes.whiteText}>
        {heroData ? heroData.numberOfDiagnoses : 'NA'}
        {' '}
      DIAGNOSES
        <span className={classes.whiteSmallText}>&nbsp;&nbsp; from 2 ARMS:</span>
      </div>
      <div className={classes.blueText}>
        {sortedDiagnosis[0] && sortedDiagnosis[0].diagnoses}
        {' '}
Diagnoses from ARM
        {' '}
        {sortedDiagnosis[0] && sortedDiagnosis[0].arm_id}
      </div>
      <div className={classes.blueText}>
        {sortedDiagnosis[1] && sortedDiagnosis[1].diagnoses}
        {' '}
Diagnoses from ARM
        {' '}
        {sortedDiagnosis[1] && sortedDiagnosis[1].arm_id}
      </div>
    </div>
  );
};


const FilesInActiveText = ({ classes, heroData }) => (
  <div className={classes.inActiveTextBG}>
    <div className={classes.whiteTextInactive}>
      {heroData ? heroData.numberOfFiles : 'NA'}
      {' '}
FILES
    </div>
  </div>
);

const FilesActiveText = ({ classes, heroData }) => (
  <div className={classes.inActiveTextBG}>
    <div className={classes.whiteText}>
      {heroData ? heroData.numberOfFiles : 'NA'}
      {' '}
      FILES
    </div>
    <div className={classes.blueText}>
  from
      {' '}
      {heroData ? heroData.numberOfFileTypes : 'NA'}
      {' '}
      File Types
    </div>
  </div>
);

const InteractiveHero = ({ classes, heroData }) => {
  const [activeState, setActiveState] = React.useState({
    isActive: '',
    transformedHorseShoe: FacingLeft,
  });
  return (
    <div className={classes.animationWrapper}>
      <div className={classes.casesIcon} onMouseEnter={() => { setActiveState({ isActive: 'cases', transformedHorseShoe: FacingUp }); }} onMouseLeave={() => { setActiveState({ isActive: '', transformedHorseShoe: FacingLeft }); }}>
        <CircularIcon isActive={activeState.isActive === 'cases'} InactiveImage={InActiveCases} activeImage={ActiveCases} />
      </div>
      <div className={classes.casesText}>
        {activeState.isActive === 'cases' ? <CasesActiveText heroData={heroData} classes={classes} /> : <CasesInActiveText heroData={heroData} classes={classes} />}
      </div>
      <HorseShoe transformedHorseShoe={activeState.transformedHorseShoe} />
      <div className={classes.filesIcon} onMouseEnter={() => { setActiveState({ isActive: 'files', transformedHorseShoe: FacingRight }); }} onMouseLeave={() => { setActiveState({ isActive: '', transformedHorseShoe: FacingLeft }); }}>
        <CircularIcon isActive={activeState.isActive === 'files'} InactiveImage={InActiveFiles} activeImage={ActiveFiles} />
      </div>
      <div className={classes.filesText}>
        {activeState.isActive === 'files' ? <FilesActiveText heroData={heroData} classes={classes} /> : <FilesInActiveText heroData={heroData} classes={classes} />}
      </div>
      <div className={classes.trialsIcon} onMouseEnter={() => { setActiveState({ isActive: 'trials', transformedHorseShoe: FacingDown }); }} onMouseLeave={() => { setActiveState({ isActive: '', transformedHorseShoe: FacingLeft }); }}>
        <CircularIcon isActive={activeState.isActive === 'trials'} InactiveImage={InActiveTrials} activeImage={ActiveTrials} />
      </div>
      <div className={classes.trialsText}>
        {activeState.isActive === 'trials' ? <TrialsActiveText heroData={heroData} classes={classes} /> : <TrialsInActiveText heroData={heroData} classes={classes} />}
      </div>
    </div>
  );
};

const styles = () => ({
  animationWrapper: {
    left: '0px',
    position: 'absolute',
    '@media (min-width: 800px)': {
      left: 'calc(50%)',
    },
    '@media (min-width: 1200px)': {
      left: 'calc(60%)',
    },
    '@media (min-width: 1600px)': {
      left: 'calc(70%)',
    },
  },
  casesIcon: {
    left: '48px',
    float: 'left',
    width: 100,
    position: 'absolute',
    marginTop: 16,
  },
  casesText: {
    position: 'absolute',
    float: 'left',
    marginTop: '52px',
    left: '200px',
    width: '150px',
    // color: '#FFFFFF',
    // fontFamily: 'Oswald',
    // fontSize: 16,
    // fontWeight: 500,
    color: '#FEFFFF',
    fontFamily: 'Oswald',
    fontSize: 18,
    fontWeight: 600,
    letterSpacing: 0,
    textAlign: 'center',
    // background: `url(${background})`,
  },
  filesIcon: {
    left: '300px',
    position: 'absolute',
    float: 'left',
    marginTop: '225px',
  },
  filesText: {
    position: 'absolute',
    float: 'left',
    marginTop: '370px',
    left: '300px',
    width: '150px',
    color: '#FFFFFF',
    fontFamily: 'Oswald',
    fontSize: 16,
    fontWeight: 500,
  },
  trialsIcon: {
    marginTop: '450px',
    position: 'absolute',
    float: 'left',
    left: '48px',
  },
  trialsText: {
    position: 'absolute',
    float: 'left',
    marginTop: '480px',
    left: '200px',
    width: '180px',
    color: '#FFFFFF',
    fontFamily: 'Oswald',
    fontSize: 16,
    fontWeight: 500,
  },
  hide: {
    display: 'none',
  },
  whiteText: {
    color: '#FEFFFF',
    fontFamily: 'Oswald',
    fontSize: 18,
    fontWeight: 600,
    letterSpacing: 0,
    textAlign: 'center',
  },
  whiteSmallText: {
    color: '#FEFFFF',
    fontFamily: 'Oswald',
    fontSize: 12,
    fontWeight: 500,
    letterSpacing: 0,
    textAlign: 'center',
  },
  whiteTextInactive: {
    color: '#FEFFFF',
    fontFamily: 'Oswald',
    fontSize: 18,
    fontWeight: 600,
    letterSpacing: 0,
    textAlign: 'center',
  },
  blueText: {
    color: '#A8DAF1',
    fontFamily: 'Oswald',
    fontSize: 14,
    fontWeight: 500,
    letterSpacing: 0,
    textAlign: 'center',
  },
  inActiveTextBG: {
    background: `url(${WhispInActive})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100% 100%',
    paddingTop: '10px',
    paddingBottom: '10px',
  },
  activeTextBG: {
    background: `url(${WhispInActive})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100% 100%',
    paddingTop: '10px',
    paddingBottom: '10px',
  },
});


export default withStyles(styles)(InteractiveHero);
