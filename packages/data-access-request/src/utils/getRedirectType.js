function getRedirectedType(query) {
    const path = query.get('type') || '/';
    return path;
  }

  export default getRedirectedType;