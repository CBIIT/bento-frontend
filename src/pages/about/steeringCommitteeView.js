import React from 'react';
import { withStyles, Link } from '@material-ui/core';
import Stats from '../../components/Stats/AllStatsController';
import Header from '../../components/About/HeaderView';
import l9dg from '../../assets/about/Photo-About_SteeringCommittee.jpg';
import Body from '../../components/About/BodyView';
import submissionGuide from '../../assets/footer/ICDC_DGAB_Guidelines.pdf';

const SteeringCommitteeView = ({ classes }) => (
  <>
    <Stats />
    <Header title="Steering Committee" />
    <Body data={{
      img: l9dg,
      body: (
        <div>
          <div>
            {' '}
The ICDC is community driven and built with input and collaboration from
 many groups to foster a diversity of ideas and to ensure needs are identified
 across the broad research community. To achieve this collaboration, the ICDC Steering Committee
 was formed to advise the NCI and FNLCR on the ICDC. The Steering Committee is
 composed of 11 members from the non-NIH research community, 7 from NCI, 1 from
  NHGRI and 1 from NCATS. There is also 1 observer from the NCI and 4 ex-officio
  members who are FNLCR staff. The chairperson is from the non-NIH research community.
            <br />
            <br />
The Steering Committee has two sub-committees; Data Governance Advisory Board
 (DGAB) and the Best Practices Sub-Committee (BPSC).
            <br />
            <br />
The DGAB consists of 4 external members (all from ICDC Steering Committee), 2
 NIH members (1 of whom is from CBIIT) and is supported by FNLCR staff. When
 researchers request their data (

            <Link target="_blank" className={classes.link} href={submissionGuide}>
            submission guide [PDF]
            </Link>
) to be added to the ICDC to be  shared with the
 community, the role of the DGAB is to advise the NCI on the suitability of
 request. The NCI makes the final decision on the request. The DGAB is chaired
 by a non-NIH member of ICDC Steering Committee. The DGAB meets at least
 quarterly to review and prioritize all open and complete requests.
            <br />
            <br />
The BPSC consists of 7 external members (all from ICDC Steering Committee),
3 NCI staff, 1 NHGRI staff and is supported by FNLCR staff. The overall goal
of the BPSC is to streamline and standardize data collection and management
for canine studies. The BPSC examines past and planned studies and  recommends
  prospective standards for data collection and management in four main areas;
imaging, clinical/pathology, immunology and genomic/sequencing data.
            <br />
            <br />
          </div>
          <div className={classes.tableDiv}>
            <table className={classes.table}>
              <thead className={classes.tableHeader}>
                <tr className={classes.tableBodyRow}>
                  <th className={classes.headerCell} aria-label="Index" />
                  <th className={classes.headerCell}>Name</th>
                  <th className={classes.headerCell}>Institution</th>
                  <th className={classes.headerCell}>Affiliation</th>
                  <th className={classes.headerCell}>SubCommitee(s)</th>
                </tr>
              </thead>
              <tbody>
                <tr className={classes.tableBodyRow}>
                  <td className={classes.tableCell}>1</td>
                  <td className={classes.tableCell}>Matthew Breen</td>
                  <td className={classes.tableCell}>North Carolina State University</td>
                  <td className={classes.tableCell}>External</td>
                  <td className={classes.tableCell}>DGAB</td>
                </tr>
                <tr className={classes.tableBodyRow}>
                  <td className={classes.tableCell}>2</td>
                  <td className={classes.tableCell}>M.R. Chambers</td>
                  <td className={classes.tableCell}>University of Alabama at Birmingham</td>
                  <td className={classes.tableCell}>External</td>
                  <td className={classes.tableCell}>BPSC</td>
                </tr>
                <tr className={classes.tableBodyRow}>
                  <td className={classes.tableCell}>3</td>
                  <td className={classes.tableCell}>Dawn Duval</td>
                  <td className={classes.tableCell}>Colorado State University</td>
                  <td className={classes.tableCell}>External</td>
                  <td className={classes.tableCell}>BPSC</td>
                </tr>
                <tr className={classes.tableBodyRow}>
                  <td className={classes.tableCell}>4</td>
                  <td className={classes.tableCell}>Allison Heath</td>
                  <td className={classes.tableCell}>Children’s Hospital of Phildelphia</td>
                  <td className={classes.tableCell}>External</td>
                  <td className={classes.tableCell}>BPSC</td>
                </tr>
                <tr className={classes.tableBodyRow}>
                  <td className={classes.tableCell}>5</td>
                  <td className={classes.tableCell}>Will Hendricks</td>
                  <td className={classes.tableCell}>
                      Translational Genomics Research Institute (TGen)
                  </td>
                  <td className={classes.tableCell}>External</td>
                  <td className={classes.tableCell}>DGAB</td>
                </tr>
                <tr className={classes.tableBodyRow}>
                  <td className={classes.tableCell}>6</td>
                  <td className={classes.tableCell}>Warren Kibbe</td>
                  <td className={classes.tableCell}>Duke University</td>
                  <td className={classes.tableCell}>External</td>
                  <td className={classes.tableCell}>DGAB</td>
                </tr>
                <tr className={classes.tableBodyRow}>
                  <td className={classes.tableCell}>7</td>
                  <td className={classes.tableCell}>Deborah Knapp</td>
                  <td className={classes.tableCell}>Purdue University</td>
                  <td className={classes.tableCell}>External</td>
                  <td className={classes.tableCell}>BPSC</td>
                </tr>
                <tr className={classes.tableBodyRow}>
                  <td className={classes.tableCell}>8</td>
                  <td className={classes.tableCell}>Cheryl London</td>
                  <td className={classes.tableCell}>Tufts University</td>
                  <td className={classes.tableCell}>External</td>
                  <td className={classes.tableCell}>BPSC</td>
                </tr>
                <tr className={classes.tableBodyRow}>
                  <td className={classes.tableCell}>9</td>
                  <td className={classes.tableCell}>Roel Verhaak</td>
                  <td className={classes.tableCell}>The Jackson Laboratory</td>
                  <td className={classes.tableCell}>External</td>
                  <td className={classes.tableCell}>DGAB</td>
                </tr>
                <tr className={classes.tableBodyRow}>
                  <td className={classes.tableCell}>10</td>
                  <td className={classes.tableCell}>Jeff Trent</td>
                  <td className={classes.tableCell}>
                      Translational Genomics Research Institute (TGen)
                  </td>
                  <td className={classes.tableCell}>External</td>
                  <td className={classes.tableCell}>BPSC</td>
                </tr>
                <tr className={classes.tableBodyRow}>
                  <td className={classes.tableCell}>11</td>
                  <td className={classes.tableCell}>Shaying Zhao</td>
                  <td className={classes.tableCell}>University of Georgia</td>
                  <td className={classes.tableCell}>External</td>
                  <td className={classes.tableCell}>BPSC</td>
                </tr>
                <tr className={classes.tableBodyRow}>
                  <td className={classes.tableCell}>12</td>
                  <td className={classes.tableCell}>Toby Hecht</td>
                  <td className={classes.tableCell}>DCTD/NCI</td>
                  <td className={classes.tableCell}>NIH</td>
                  <td className={classes.tableCell}>BPSC</td>
                </tr>
                <tr className={classes.tableBodyRow}>
                  <td className={classes.tableCell}>13</td>
                  <td className={classes.tableCell}>Paula Jacobs</td>
                  <td className={classes.tableCell}>CIP/DCTD/NCI</td>
                  <td className={classes.tableCell}>NIH</td>
                  <td className={classes.tableCell}>BPSC</td>
                </tr>
                <tr className={classes.tableBodyRow}>
                  <td className={classes.tableCell}>14</td>
                  <td className={classes.tableCell}>Tony Kerlavage</td>
                  <td className={classes.tableCell}>CBIIT/NCI</td>
                  <td className={classes.tableCell}>NIH</td>
                  <td className={classes.tableCell}>-</td>
                </tr>
                <tr className={classes.tableBodyRow}>
                  <td className={classes.tableCell}>15</td>
                  <td className={classes.tableCell}>Erika Kim</td>
                  <td className={classes.tableCell}>CBIIT/NCI</td>
                  <td className={classes.tableCell}>NIH</td>
                  <td className={classes.tableCell}>DGAB, BPSC</td>
                </tr>
                <tr className={classes.tableBodyRow}>
                  <td className={classes.tableCell}>16</td>
                  <td className={classes.tableCell}>Amy LeBlanc</td>
                  <td className={classes.tableCell}>COP/CCR/NCI</td>
                  <td className={classes.tableCell}>NIH</td>
                  <td className={classes.tableCell}>DGAB</td>
                </tr>
                <tr className={classes.tableBodyRow}>
                  <td className={classes.tableCell}>17</td>
                  <td className={classes.tableCell}>Christina Mazcko</td>
                  <td className={classes.tableCell}>COP/CCR/NCI</td>
                  <td className={classes.tableCell}>NIH</td>
                  <td className={classes.tableCell}>-</td>
                </tr>
                <tr className={classes.tableBodyRow}>
                  <td className={classes.tableCell}>18</td>
                  <td className={classes.tableCell}>Elaine Ostrander</td>
                  <td className={classes.tableCell}>CGCGB/NHGRI</td>
                  <td className={classes.tableCell}>NIH</td>
                  <td className={classes.tableCell}>BPSC</td>
                </tr>
                <tr className={classes.tableBodyRow}>
                  <td className={classes.tableCell}>19</td>
                  <td className={classes.tableCell}>Connie Sommers</td>
                  <td className={classes.tableCell}>IOB/DTP/DCTD/NCI</td>
                  <td className={classes.tableCell}>NIH</td>
                  <td className={classes.tableCell}>DGAB, BPSC</td>
                </tr>
                <tr className={classes.tableBodyRow}>
                  <td className={classes.tableCell}>20</td>
                  <td className={classes.tableCell}>Greg Tawa</td>
                  <td className={classes.tableCell}>TRNDP/NCATS</td>
                  <td className={classes.tableCell}>NIH</td>
                  <td className={classes.tableCell}>DGAB</td>
                </tr>
                <tr className={classes.tableBodyRow}>
                  <td className={classes.tableCell}>21</td>
                  <td className={classes.tableCell}>Allen Dearry</td>
                  <td className={classes.tableCell}>CBIIT/NCI</td>
                  <td className={classes.tableCell}>NIH</td>
                  <td className={classes.tableCell}>-</td>
                </tr>
                <tr className={classes.tableBodyRow}>
                  <td className={classes.tableCell}>22</td>
                  <td className={classes.tableCell}>Matthew Beyers</td>
                  <td className={classes.tableCell}>FNLCR</td>
                  <td className={classes.tableCell}>FNL</td>
                  <td className={classes.tableCell}>DGAB, BPSC</td>
                </tr>
                <tr className={classes.tableBodyRow}>
                  <td className={classes.tableCell}>23</td>
                  <td className={classes.tableCell}>Philip Musk</td>
                  <td className={classes.tableCell}>FNLCR</td>
                  <td className={classes.tableCell}>FNL</td>
                  <td className={classes.tableCell}>DGAB</td>
                </tr>
                <tr className={classes.tableBodyRow}>
                  <td className={classes.tableCell}>24</td>
                  <td className={classes.tableCell}>John Otridge</td>
                  <td className={classes.tableCell}>FNLCR</td>
                  <td className={classes.tableCell}>FNL</td>
                  <td className={classes.tableCell}>-</td>
                </tr>
                <tr className={classes.tableBodyRow}>
                  <td className={classes.tableCell}>25</td>
                  <td className={classes.tableCell}>Ralph Parchment</td>
                  <td className={classes.tableCell}>FNLCR</td>
                  <td className={classes.tableCell}>FNL</td>
                  <td className={classes.tableCell}>-</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>),
    }}
    />
  </>
);

const styles = () => ({
  linkIcon: {
    width: '20px',
    verticalAlign: 'sub',
    margin: '0px',
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
  tableDiv: {
    marginTop: '45px',
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
    fontFamily: 'Raleway',
    color: '#194563',
    textTransform: 'uppercase',

  },
  tableBodyRow: {
    borderSpacing: '0',
    borderCollapse: 'collapse',
    '&:nth-child(even)': {
      color: '#3B607D',
    },
    '&:nth-child(odd)': {
      color: '#3E7AAA',
    },
  },
  tableCell: {
    fontFamily: '"Open Sans"',
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

});


export default withStyles(styles, { withTheme: true })(SteeringCommitteeView);
