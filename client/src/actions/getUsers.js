import axios from 'axios';

const requestStart = () => {
    return {
        type: 'FETCH_START'
    }
}

const requestSuccess = (res) => {
    return {
        type: 'FETCH_SUCCESS',
        data: res.data
    }
}

const requestFail = (err) => {
    return {
        type: 'FETCH_FAIL',
        err
    }
}

const setRedirect = () => {
    return {
        type: 'SET_REDIRECT'
    }
}

export const getAllUsers = () => {
    return (dispatch, getState) => {
        const {searchReducer, sortReducer, manager, directReports} = getState();
        let query = {};
        if (searchReducer.searchText){
            query.search = searchReducer.searchText;
        }
        if(sortReducer.field){
            query.sort = {[sortReducer.field]: sortReducer.asc}
        }
        if(manager.manager){
            query.manager = manager.manager;
            // console.log(manager)
        }
        if(directReports.drs){
            query.directReports = directReports.drs;
        }
        
        
        dispatch (requestStart());
        axios
            .get('/api/employee', {params: query})
            .then(res => {
                // console.log(query);
                dispatch(requestSuccess(res))
                // console.log('get_all_user')
            })
            .catch(err => {
                dispatch(requestFail(err))
            })
    }
};


export const addNewUser = employee => {
    return (dispatch, getState) => {
        dispatch (requestStart());
        axios
            .post('/api/employee', employee)
            // 
            .then(()=> {
                dispatch(setRedirect())
            })
            .catch(err => {
                dispatch(requestFail(err))
            })
    }
};

export const editUser = (id, newInfo) => {
    return (dispatch, getState) => {
        // console.log('editstart');
        dispatch(requestStart());
        axios
            .put(`/api/employee/${id}`, newInfo)
            .then(res => {
                // console.log('editsuccess');  
                             
                dispatch(getAllUsers())
                // dispatch(requestSuccess(res));
            })
            .then(res => {
                console.log(res);// expect : undefined
            })
            .then(()=> {
                dispatch(setRedirect())
            })
            .catch(err => {
                dispatch(requestFail(err))
            })
    }
}

export const deleteUser = id => {
    return (dispatch, getState) => {
        // console.log(res)
        dispatch (requestStart());
        axios
            .delete(`/api/employee/${id}`)
            .then(res => {
                dispatch(requestSuccess(res))
                // console.log(res);
            })
            .catch(err => {
                dispatch(requestFail(err))
            })
    }
};