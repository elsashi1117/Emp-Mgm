const initState = {
    drs: []
}

const directReports = (state = initState, action) => {
    switch (action.type){
        case 'GET_DRS':
        return {
            drs: action.drs
        }
        case 'CLEAR_FILTER':
        return {
            drs: []
        }
        default:
        return state;
    }
}

export default directReports;
