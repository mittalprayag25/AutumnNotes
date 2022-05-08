import {handleActions} from 'redux-actions';

import initialState from '../store/initialState';

const CategoryReducer = handleActions(
  {
    CATEGORIES: {
      SUCCESS: (state, {payload}) => {
        return {
          ...state,
          categories: payload,
        };
      },
      ERROR: state => ({
        ...state,
        categories: [],
      }),
    },
  },
  initialState.categories,
);

export default CategoryReducer;
