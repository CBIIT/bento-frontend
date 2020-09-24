import * as Actions from './cartAction';

export const initialState = {
  subjectIds: [],
  error: '',
  isError: false,
};

const deleteSubjects = (selectedSubjects, existingSubjects) => {
  if (!selectedSubjects || selectedSubjects.length === 0) return existingSubjects;
  return existingSubjects.filter((id) => !selectedSubjects.includes(id));
};

export default function CARTReducer(state = initialState, action) {
  switch (action.type) {
    case Actions.ADD_SUBJECTS: {
      const previousSubjectIds = Object.assign([], state.subjectIds);

      const uniqueSubjectIds = action.payload.subjectIds.length > 0
        ? Array.from(
          new Set(
            previousSubjectIds.concat(action.payload.subjectIds),
          ),
        ) : previousSubjectIds;

      localStorage.setItem('CartSubjectIds', JSON.stringify(uniqueSubjectIds) || []);
      return {
        ...state,
        subjectIds: uniqueSubjectIds,
      };
    }
    case Actions.DELETE_SUBJECTS: {
      // action.payload.files = [fileIDs]
      const subjectIdsAfterDeletion = deleteSubjects(action.payload.subjectIds, state.subjectIds);
      localStorage.setItem('CartSubjectIds', JSON.stringify(subjectIdsAfterDeletion));
      return {
        ...state,
        subjectIds: subjectIdsAfterDeletion,
      };
    }

    case Actions.INIT_CART: {
      return {
        ...state,
        subjectIds: JSON.parse(localStorage.getItem('CartSubjectIds')) || [],
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
