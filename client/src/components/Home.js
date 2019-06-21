import React from 'react';
import WithRouterHead from './head';
import WithRouterEmployeeList from './employeeList';
import {Button} from 'semantic-ui-react';
import {clearFilter} from '../actions/clearFilter';
import {getAllUsers} from '../actions/getUsers'
import {connect} from 'react-redux';

const Home = props => {
    let goHome = () => {
        props.clearFilter();
        props.getAllUsers()
    }

    const style = {padding: '30px'}
    return (
        <div style = {style}>
            <Button onClick = {goHome}>
                Home Page
                {/* <Icon name='left arrow' /> */}
            </Button>
            <div style = {{textAlign: 'center',fontSize:40, padding:25} }>Employee Management</div>
            <WithRouterHead />
            <WithRouterEmployeeList />
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        clearFilter: () => {
            dispatch(clearFilter())
        },
        getAllUsers: () => {
            dispatch(getAllUsers())
        }
    }
}

export default connect(null, mapDispatchToProps)(Home);