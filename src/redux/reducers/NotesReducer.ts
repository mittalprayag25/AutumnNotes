import {handleActions} from 'redux-actions';

import initialState from '../store/initialState';

const KidsReducer = handleActions(
  {
    NOTES: {
      SUCCESS: (state, {payload}) => {
        return {
          ...state,
          allNotes: payload,
        };
      },
      ERROR: state => ({
        ...state,
        allNotes: [],
      }),
    },
  },
  initialState.notes,
);

export default KidsReducer;
