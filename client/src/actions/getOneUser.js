import axios from 'axios';

const requestStart = () => {
    return {
        type: 'FETCHONE_START'
    }
};

const requestSuccess = res => {
    return {
        type: 'FETCHONE_SUCCESS',
        employee: res.data.employee
    }
};

const requestFail = err => {
    return {
        type: 'FETCHONE_FAIL',
        err
    }
};

export const getOneUser = id => {
    
    return (dispatch, getState) => {
        dispatch(requestStart())
        axios
            .get(`/api/employee/${id}`)
            .then(res => {
                // console.log(res)
                dispatch(requestSuccess(res))
            })
            .catch(err => {
                dispatch(requestFail(err))
            })
    }
}

export const clearUser = () => {
    return {
        type: 'CLEAR_USER'
    }
}