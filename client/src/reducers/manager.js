const initState = {
    manager: ''
}

const manager = (state = initState, action) => {
    switch(action.type){
        case 'GET_MANAGER':
        return {
            manager: action.manager
        }
        case 'CLEAR_FILTER':
        return {
            manager: ''
        }
        default:
        return state
    }
}

export default manager;