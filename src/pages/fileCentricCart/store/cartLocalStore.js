const removeFileFromCart = (selectedFiles, existingFiles) => {
  if (!selectedFiles || selectedFiles.length === 0) return existingFiles;
  return existingFiles.filter((id) => !selectedFiles.includes(id));
};

const addFiles = (fileIDs) => {
  const cartFileIds = localStorage.getItem('cartFiles') ? JSON.parse(localStorage.getItem('cartFiles')) : [];

  // remove duplicates in case's ids.
  const uniqueFileIds = fileIDs.length > 0
    ? Array.from(
      new Set(
        cartFileIds.concat(fileIDs),
      ),
    ) : cartFileIds;

  localStorage.setItem('cartFiles', JSON.stringify(uniqueFileIds) || []);
};

const deleteFiles = (fileIDs) => {
  const cartFileIds = localStorage.getItem('cartFiles') ? JSON.parse(localStorage.getItem('cartFiles')) : [];
  const filesAfterDeletion = removeFileFromCart(fileIDs, cartFileIds);
  localStorage.setItem('cartFiles', JSON.stringify(filesAfterDeletion));
};

export {
  addFiles,
  deleteFiles,
};
