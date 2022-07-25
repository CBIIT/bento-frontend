import React from 'react';
import { Chip, withStyles } from '@material-ui/core';

const badgeProps = {
  non_member: {
    label: 'Non-Member',
    class: 'nonmember',
    color: '#acacac',
  },
  member: {
    label: 'Active',
    class: 'member',
    color: 'blue',
  },
  admin: {
    label: 'Admin',
    class: 'admin',
    color: 'green',
  },
  inActive: {
    label: 'Inactive',
    class: 'inactive',
    color: '',
  },
  active: {
    label: 'Active',
    class: 'active',
    color: '',
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
    badgeComp.push(<Chip className={classes[element.class]} label={element.label} />);
  });

  return badgeComp;
};

const processRoleData = (data) => {
  if (Array.isArray(data)) {
    return data;
  }
  if (typeof data === 'string') {
    return data.split(',');
  }

  return [];
};

function RoleBadgeGroup({ data, classes }) {
  const roleData = processRoleData(data.role);
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
    justifyContent: 'space-between',
    boxSizing: 'border-box',
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
