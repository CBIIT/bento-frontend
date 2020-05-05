import React from 'react';
import { Link } from 'react-scroll';
import { withStyles } from '@material-ui/core';

const AlphabetComponent = ({ classes, alphabetsData }) => (
  <div className={classes.alphabetContainer}>
    <div className={classes.centerContent}>
      <div className={classes.dictText}>DATA&nbsp;DICTIONARY</div>
      <span className={classes.alphabetText}>
        {alphabetsData && alphabetsData.map((alphabetNode) => (
          alphabetNode.status ? (
            <span>
|&nbsp;
              <Link
                activeClass={classes.activeLink}
                to={alphabetNode.alphabet}
                spy
                smooth
                offset={-180}
                duration={500}
              >

                <span className={classes.alphabetExists}>{alphabetNode.alphabet}</span>
              </Link>
&nbsp;
            </span>
          ) : (
            <span>
|&nbsp;
              {alphabetNode.alphabet}
&nbsp;
            </span>
          )))}

      </span>
    </div>
  </div>
);
const styles = () => ({
  dictText: {
    display: 'inline',
    color: '#71959f',
    fontFamily: 'Lato',
    letterSpacing: '1px',
    fontSize: '17px',
  },
  alphabetText: {
    paddingLeft: '32px',
    letterSpacing: '1.5px',
    fontFamily: 'Poppins',
    fontSize: '14px',
    color: '#929292',
    display: 'block',
    '@media (min-width: 1000px)': {
      display: 'inline',
    },
  },
  alphabetContainer: {
    padding: '32px',
  },
  centerContent: {
    maxWidth: '950px',
    marginLeft: 'auto',
    marginRight: 'auto',
    textAlign: 'center',
    background: 'white',
    borderRadius: '18px',
    lineHeight: '2em',
  },
  alphabetExists: {
    textDecoration: 'underline',
    color: '#06849E',
    '&:hover': {
      cursor: 'pointer',
      fontFamily: 'Poppins',
      fontWeight: 'bold',
      textDecoration: 'none',
    },
  },
  activeLink: {
    fontFamily: 'Poppins',
    fontWeight: 'bold',
    background: '#28cde5',
  },
});

export default withStyles(styles)(AlphabetComponent);
