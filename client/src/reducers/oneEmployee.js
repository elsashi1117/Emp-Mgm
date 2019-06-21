const initState = {
    employee: {},
    isFetching: false,
    err: null
}

const oneEmployee = (state = initState, action) => {
    switch (action.type){
        case 'FETCHONE_START':
        return {
            ...state,
            isFetching: true
        }
        case 'FETCHONE_SUCCESS':
        return {
            ...state,
            employee: action.employee,
            isFetching: false,
            err: null
        }
        case 'FETCHONE_FAIL':
        return {
            ...state,
            err: action.err
        }
        case 'CLEAR_USER':
        return initState;
        default: 
        return state;
    }
}



export default oneEmployee;