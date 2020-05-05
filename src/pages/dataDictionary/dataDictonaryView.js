import React, { useState, useEffect, useRef } from 'react';
import { animateScroll as scroll } from 'react-scroll';
import { withStyles, Divider } from '@material-ui/core';
import scrollUp from '../../assets/icons/ScrollUpButton.svg';
import scrollUpHover from '../../assets/icons/ScrollUpHoverButton.svg';

import AboutHeader from '../about/aboutHeaderView';
import Stats from '../../components/Stats/AllStatsController';
import AlphabetBar from './alphabetComponent';
import Section from './attributeComponent';

const DataDictonaryView = ({ classes, data }) => {
  const prevScrollY = useRef(0);

  const [scrollUpHovered, setScrollUpHovered] = useState(false);
  const [scrollingDown, setScrollingDown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (prevScrollY.current < currentScrollY && !scrollingDown) {
        setScrollingDown(true);
      }
      if (currentScrollY < 10 && scrollingDown) {
        setScrollingDown(false);
      }

      prevScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollingDown]);

  // scroll to top function
  const scrollToTop = () => {
    scroll.scrollToTop();
  };

  // Sorting the Attr data alphabetical

  const sortedAttributeData = data.attribute && data.attribute.sort(
    (a, b) => a.row[0].localeCompare(b.row[0]),
  );

  // FirstAlphabets Array of Attribute Name
  const firstAlphabetsArr = sortedAttributeData && sortedAttributeData.map(
    (diagnosis) => diagnosis.row[0].charAt(0).toUpperCase(),
  );

  // Removing duplicatesFirstAlphabets Array

  const uniqueAlphabets = [...new Set(firstAlphabetsArr)];

  // A-Z alphabets obj with alphabet and status as key

  const alphabets = [...Array(26)].map(
    (val, i) => ({ alphabet: String.fromCharCode(i + 65), status: false }),
  );

  // setting status key to true for existing alphabets

  const alphabetsData = uniqueAlphabets !== null && alphabets.map(
    (e) => ({
      status: uniqueAlphabets.find(
        (a) => e.alphabet === a,
      ) !== undefined,
      alphabet: e.alphabet,
    }),
  );

  return (
    <>
      <Stats />
      <AboutHeader title={data.title} />
      <div className={classes.container}>
        <AlphabetBar alphabetsData={alphabetsData} />
        <Divider variant="middle" classes={{ root: classes.dividerRoot }} />
        <div className={classes.sectionContainer}>
          <div className={classes.sectionTitle}>Introduction</div>
          <div className={classes.introText}>{data.introduction}</div>
        </div>
        <Divider variant="middle" classes={{ root: classes.dividerRoot }} />
        <div className={classes.sectionContainer}>
          <div className={classes.sectionTitle}>CTDC Node Types</div>
          { data.nodeTypes && data.nodeTypes.map((nodeType) => (
            <div className={classes.nodeTypeContainer}>
              <div className={classes.numberCircle}>{nodeType.nodeTypeNUmber}</div>
              <div className={classes.nodeTypeTextContainer}>
                <div className={classes.nodeTypeTitle}>{nodeType.nodeTypeTitle}</div>
                <div className={classes.nodeTypeDesc}>{nodeType.nodeTypeDescription}</div>
                <div className={classes.nodeTypeDesc}>
                  {nodeType.nodeTypeDescriptionParagraphTwo}
                </div>
                {nodeType.nodeTypeSubList
                && (nodeType.nodeTypeSubList.map((sublist) => (
                  <div className={classes.nodeTypeSubListContainer}>
                    <div className={classes.nodeTypeTitle}>{sublist.nodeTypeSubListTitle}</div>
                    <div className={classes.nodeTypeDesc}>{sublist.nodeTypeSubListDescription}</div>
                  </div>
                ))
                )}
              </div>
            </div>
          ))}

          {data.nodeTypeRelationShipTable && (
          <>
            <div className={classes.tableNoteContainer}>
              <span className={classes.tableBoldNote}>
              Table 1.0. Relationships among CTDC node types.&nbsp;
              </span>
              <span className={classes.tableRegNote}>
Listed are relationships that connect node types in the CTDC
           conceptual data model, the source and destination nodes for each relationship, and the
            multiplicity of each relationship.
              </span>
            </div>
            <div className={classes.tableDiv}>
              <table className={classes.table}>
                <thead className={classes.tableHeader}>
                  <tr className={classes.tableBodyRow}>
                    <th className={classes.headerCell} aria-label="Index" />
                    { data.nodeTypeRelationShipTable[0].head.map((rowObj) => (
                      <>
                        <th className={classes.headerCell}>{rowObj}</th>
                      </>
                    )) }
                  </tr>
                </thead>
                <tbody>
                  { data.nodeTypeRelationShipTable[1].body.map((rowObj, index) => (
                    <>
                      <tr className={classes.tableBodyRow}>
                        <td className={classes.tableCell}>{index + 1}</td>
                        { rowObj.row.map(
                          (rowValue) => <td className={classes.tableCell}>{rowValue}</td>,
                        )}
                      </tr>
                    </>
                  )) }
                </tbody>
              </table>
            </div>
          </>
          )}

        </div>
        <Divider variant="middle" classes={{ root: classes.dividerRoot }} />
        <div className={classes.sectionContainer}>
          <div className={classes.sectionTitle}>Document Conventions</div>
          <div className={classes.nodeTypeTitle}>{data.documentConventionsTitle}</div>
          <div className={classes.nodeTypeDesc}>{data.documentConventionsDescription}</div>
          <div className={classes.marginBottom} />
          {data.documentConventions
                && (data.documentConventions.map((sublist) => (
                  <div className={classes.nodeTypeSubListContainer}>
                    <div className={classes.documentConventionsTitle}>
                      {sublist.attributeName}
                      <span className={classes.documentConventionsDesc}>
                        {sublist.attributeConventions}
                      </span>
                    </div>
                  </div>
                ))
                )}
        </div>
      </div>
      <div className={classes.attributeSectionContainer}>
        <div className={classes.container}>
          <AlphabetBar alphabetsData={alphabetsData} />
          <Divider variant="middle" classes={{ root: classes.dividerRoot }} />
          <div className={classes.sectionContainer}>
            {sortedAttributeData ? sortedAttributeData.map((row) => (
              <Section
                data={row}
              />
            )) : ''}
          </div>
        </div>
        <Divider variant="middle" classes={{ root: classes.dividerRoot }} />
        {scrollingDown && (
        <div
          className={classes.scrollUpContainer}
          onClick={scrollToTop}
          onMouseEnter={() => setScrollUpHovered(true)}
          onMouseLeave={() => setScrollUpHovered(false)}
        >
          <img
            className={classes.scrollUp}
            src={scrollUpHovered ? scrollUpHover : scrollUp}
            alt="scrol to top"
          />
        </div>
        )}
      </div>
    </>
  );
};

const styles = (theme) => ({

  container: {
    margin: 'auto',
    maxWidth: '1440px',
    paddingLeft: '36px',
    paddingRight: '36px',
  },
  sectionContainer: {
    padding: '36px',
  },
  dividerRoot: {
    backgroundColor: '#B0CFE1',
    height: '3px',
  },
  introText: {
    color: '#1C849A',
    fontFamily: 'Raleway',
    fontSize: '1em',
    lineHeight: '2em',
  },
  sectionTitle: {
    paddingBottom: '32px',
    color: '#2F2F2F',
    fontFamily: 'Lato',
    fontSize: 21,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  nodeTypeTitle: {
    color: '#358DBA',
    fontFamily: 'Lato',
    paddingTop: '2.5px',
    fontSize: 21,
    fontWeight: 'bold',
  },
  nodeTypeDesc: {
    fontFamily: 'Raleway',
    color: '#022B43',
    fontSize: '1em',
    fontWeight: 500,
    lineHeight: '1.5em',
    marginTop: '8px',
  },
  documentConventionsTitle: {
    color: '#358DBA',
    fontFamily: 'Lato',
    fontSize: '17px',
    fontWeight: 'bold',
  },
  documentConventionsDesc: {
    color: '#022B43',
    fontFamily: 'Raleway',
    fontSize: '17px',
    fontWeight: 500,
    lineHeight: '1.5em',
    marginTop: '8px',
  },
  numberCircle: {
    float: 'left',
    borderRadius: '50%',
    width: 36,
    height: 36,
    paddingTop: '5px',
    background: '#3FB0D5',
    color: '#fff',
    fontWeight: 600,
    textAlign: 'center',
    fontFamily: 'Oswald',
  },
  nodeTypeTextContainer: {
    marginLeft: '50px',
    marginTop: '8px',
  },
  nodeTypeContainer: {
    margin: '8px',
  },
  nodeTypeSubListContainer: {
    marginLeft: '80px',
    padding: '10px',
  },
  tableDiv: {
    marginLeft: '58px',
    marginTop: '18px',
  },
  table: {
    borderSpacing: '0',
    borderCollapse: 'collapse',
    fontSize: '12px',
    fontWeight: 'bold',
    letterSpacing: '0.025em',
    lineHeight: '30px',
    textAlign: 'left',
    width: '100%',
  },
  tableHeader: {
    fontFamily: theme.custom.fontFamily,
    color: '#194563',
    textTransform: 'uppercase',

  },
  tableBodyRow: {
    borderSpacing: '0',
    borderCollapse: 'collapse',
    color: '#3E7AAA',
  },
  tableCell: {
    fontFamily: theme.custom.fontFamily,
    fontSize: '14px',
    padding: '8px 15px 8px 0px',
    borderBottom: '0.66px solid #087CA5',
  },
  headerCell: {
    borderBottom: '4px solid #087CA5',
    borderSpacing: '0',
    borderCollapse: 'collapse',
    fontWeight: 'bolder',
  },
  attributeSectionContainer: {
    background: 'white',
  },
  scrollUpContainer: {
    position: 'fixed',
    bottom: 30,
    right: 120,
    width: 'auto',
    height: 'auto',
    zIndex: 999999,
    overflow: 'hidden',
    borderRadius: 6,
  },
  scrollUp: {
    height: 60,
    width: 60,
  },
  marginBottom: {
    marginBottom: '10px',
  },
  tableBoldNote: {
    color: '#0B3556',
    fontWeight: 'bold',
    fontFamily: 'sans-serif',
  },
  tableRegNote: {
    color: '#000000',
    fontFamily: theme.custom.fontFamily,
    fontSize: '15px',
    lineHeight: '22px',
  },
  tableNoteContainer: {
    marginLeft: '58px',
    marginTop: '24px',
  },
});

DataDictonaryView.defaultProps = {
  classes: {},
  data: {
    content: [],
  },
};

export default withStyles(styles)(DataDictonaryView);
