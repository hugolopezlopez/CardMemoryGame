const initialState = {
  rows: 4,
  columns: 4,
};

const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_ROWS':
      return {
        ...state,
        rows: action.payload,
      }
    case 'SET_COLUMNS':
      return {
        ...state,
        columns: action.payload,
      }
    default:
      return state;
  }
}

export default mainReducer;