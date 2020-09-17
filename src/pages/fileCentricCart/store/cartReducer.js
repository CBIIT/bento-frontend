import * as Actions from './cartAction';

export const initialState = {
  files: [],
};

const deleteFiles = (selectedFiles, existingFiles) => {
  if (!selectedFiles || selectedFiles.length === 0) return existingFiles;
  return existingFiles.filter((id) => !selectedFiles.includes(id));
};

export default function CARTReducer(state = initialState, action) {
  switch (action.type) {
    case Actions.ADD_FILES: {
      // action.payload.files = [fileIDs]
      const previousStatFiles = Object.assign([], state.files);
      // remove duplicates in case's ids.
      const uniqueFiles = action.payload.files.length > 0
        ? Array.from(
          new Set(
            previousStatFiles.concat(action.payload.files),
          ),
        ) : previousStatFiles;

      localStorage.setItem('cartFiles', JSON.stringify(uniqueFiles) || []);
      return {
        ...state,
        files: uniqueFiles,
      };
    }
    case Actions.DELETE_FILES: {
      // action.payload.files = [fileIDs]
      const filesAfterDeletion = deleteFiles(action.payload.files, state.files);
      localStorage.setItem('cartFiles', JSON.stringify(filesAfterDeletion));
      return {
        ...state,
        files: filesAfterDeletion,
      };
    }

    case Actions.INIT_CART: {
      return {
        ...state,
        files: JSON.parse(localStorage.getItem('cartFiles')) || [],
      };
    }
    case Actions.READY_CART: {
      return {
        ...state,
      };
    }
    default:
      return state;
  }
}
