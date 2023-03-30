const getRedirectPath = (query) => {
  const path = query.get('redirect') || '/';
  return path;
};

export default getRedirectPath;
