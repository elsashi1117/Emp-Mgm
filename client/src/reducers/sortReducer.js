const initState = {
    field: '',
    asc: 1
}

const sortReducer = (state = initState, action) => {
    switch (action.type) {
        case 'SET_SORT':
        return {
            field: action.field,
            asc: state.field === action.field ? state.asc * -1 : state.asc
        };
        default:
        return state;
    }
};

export default sortReducer;