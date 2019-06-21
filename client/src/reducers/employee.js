const initState = {
    data:[],
    isFetching: false,
    err: null,
    redirect: false
};

const employees = (state=initState, action) => {
    switch (action.type){
        case 'FETCH_START':
        return {
            ...state,
            isFetching: true,
            redirect: false
        }
        case 'FETCH_SUCCESS':
        return {
            ...state,
            isFetching: false,
            data: action.data,
            err:null,
            redirect: false
        }
        case 'FETCH_FAIL':
        return {
            ...state,
            err: action.err,
            isFetching: false,
            redirect: false
        }
        case 'SET_REDIRECT':
        return {
            ...state,
            isFetching: false,
            err: null,
            redirect: true
        }
        // case 'GET_MANAGER':
        // return {
        //     ...state,
        //     isFetching: false,
        //     data: [action.manager],
        //     err:null,
        //     redirect: false
        // }
        default:
        return state;
    }
}

export default employees;