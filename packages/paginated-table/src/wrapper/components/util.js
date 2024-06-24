/**
* max two response keys
* add file query response handler
* return - list of files name/id
*/
const addFilesResponseHandler = (response, responseKeys = []) => {
  if (responseKeys.length === 2) {
    const data = response[responseKeys[0]];
    if (data && data.length > 0) {
      const isArray = Array.isArray(data[0][responseKeys[1]]);
      const ids = data.reduce((acc, id) => {
        if (id && id[responseKeys[1]]) {
          // if object convert to array
          const items = isArray ? id[responseKeys[1]] : [id[responseKeys[1]]];
          acc.push(...items);
        }
        return acc;
      }, []);
      return [...new Set(ids)];
    }
    return [];
  }
  return response[responseKeys[0]] || [];
};

export default addFilesResponseHandler;
