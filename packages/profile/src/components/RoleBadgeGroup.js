import React from 'react';
import { Chip, withStyles } from '@material-ui/core';

const badgeProps = {
  'non-member': {
    label: 'Non-Member',
    class: 'nonmember',
  },
  member: {
    label: 'Member',
    class: 'member',
  },
  admin: {
    label: 'Admin',
    class: 'admin',
  },
  inactive: {
    label: 'Inactive',
    class: 'inactive',
  },
  active: {
    label: 'Active',
    class: 'active',
  },
};

const getBadges = (badgeData, classes) => {
  let badges;
  const badgeComp = [];
  if (!badgeData || (Array.isArray(badgeData) && !badgeData.length)) {
    badges = [badgeProps.default];
  } else {
    badges = badgeData.map((badge) => badgeProps[badge]);
  }

  badges.forEach((element) => {
    if (element) {
      const classValue = `${classes.badge} ${classes[element.class]}`;
      badgeComp.push(<Chip className={classValue} label={element.label} />);
    }
  });

  return badgeComp;
};

const processRoleData = (data) => [data.role, data.userStatus];

function RoleBadgeGroup({ data, classes }) {
  const roleData = processRoleData(data);
  const badgeInfo = getBadges(roleData, classes);
  return (
    <>
      <div className={classes.badgeGroup}>
        {badgeInfo}
      </div>
    </>
  );
}

const styles = () => ({
  badgeGroup: {
    display: 'flex',
    flexDirection: 'row',
    boxSizing: 'border-box',
    margin: '10px',
  },
  badge: {
    borderRadius: '5px',
    height: '20px',
    border: '1px solid #a0a2b1',
    margin: '0 5px',
  },
  inactive: {
    backgroundColor: '#ebc0bc',
    color: '#4f5d69',
  },
  active: {
    backgroundColor: '#9adcc9',
    color: '#4f5d69',
  },
  admin: {
    backgroundColor: '#d8d3e9',
    color: '#4f5d69',
  },
  member: {
    backgroundColor: '#d3e4f5',
    color: '#4f5d69',
  },
  nonmember: {
    backgroundColor: '#dcdee0',
    color: '#4f5d69',
  },
  default: {
    color: '#4f5d69',
  },
});

export default withStyles(styles, { withTheme: true })(RoleBadgeGroup);
