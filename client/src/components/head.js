import React, {Component} from "react";
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import { Input, Button, Icon } from 'semantic-ui-react';
import {search} from '../actions/search';
import {getAllUsers} from '../actions/getUsers';
import './style.css';

class Head extends Component {
    constructor(props){
        super(props);
        this.setState = { input: ''}
    }

    searchHandler = e => {
        // console.log(e.target.value);
        this.props.dispatch(search(e.target.value))
        this.props.dispatch(getAllUsers())
    }

    addHandle = () => {
        this.props.history.push('/create')
    }

    render(){

        return (
            <div style = {{padding:'25px 0 10px'}} className = 'button' >
                <Input icon='search' placeholder='Search' onChange = {this.searchHandler}/>
                <Button color='olive' content = 'Add New User' onClick = {this.addHandle}/>
            </div>

            
        )
    }
};

const WithRouterHead = withRouter(Head);
export default connect()(WithRouterHead);