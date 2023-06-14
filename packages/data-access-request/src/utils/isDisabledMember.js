const isDisabledMember = (role, status) => {
  const roles = [
    'admin',
    'member',
  ];

  if (roles.includes(role.toLowerCase()) && status.toLowerCase === 'disabled') {
    return false;
  }

  return true;
};

export default isDisabledMember;
