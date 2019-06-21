import {combineReducers} from 'redux';
import employees from './employee';
import oneEmployee from './oneEmployee';
import searchReducer from './searchReducer';
import sortReducer from './sortReducer';
import manager from './manager';
import directReports from './directReports';

const reducers = combineReducers ({
    employees,
    oneEmployee,
    searchReducer,
    sortReducer,
    manager,
    directReports
})

export default reducers;