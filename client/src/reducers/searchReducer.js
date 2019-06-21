const initState = {
    searchText: ''
};

const searchReducer = (state = initState, action) => {
    switch (action.type) {
        case 'SET_SEARCH':
        return {
            searchText: action.text
        };
        default:
        return state;
    }
};

export default searchReducer;