import React, {Component} from 'react';
import {withRouter, Redirect} from 'react-router-dom';
// import {push} from 'react-router-dom';
import {addNewUser} from '../actions/getUsers';
import {connect} from 'react-redux';
import { Form, Button, Image, Icon } from 'semantic-ui-react';
import './style.css';

class CreatePage extends Component{
    constructor(props){
        super(props);
        this.state = {
            name: '',
            sex: '',
            title: '',
            email: '',
            phone: '',
            start_date: '',
            avatar: null,
            src: null,
            manager: null
        }
    }

    cancelHandle = () => {
        this.props.history.push('/');
    }

    nameChange = e => {
        this.setState({name : e.target.value})
    };
    sexChange = e => {
        this.setState({sex : e.target.value})
    };
    titleChange = e => {
        this.setState({title : e.target.value})
    };
    emailChange = e => {
        this.setState({email : e.target.value})
    };
    phoneChange = e => {
        this.setState({phone : e.target.value})
    };
    dateChange = e => {
        this.setState({start_date : e.target.value})
    };
    mngChange = e => {
        this.setState({manager : e.target.value})
    };
    fileHandler = e => {
        // console.log(e.target.files[0]);
        this.setState({
            avatar : e.target.files[0],
            src : URL.createObjectURL(e.target.files[0])
        });
    };
    // goBack = () => {
        // this.props.history.goBack();
    // }

    submit = e => {
        e.preventDefault();
        const {name, sex, title, phone, email, start_date, manager, avatar} = this.state;
        // const employee = {name, sex, title, phone, email, start_date, manager};
        // console.log( manager);
        let formData = new FormData();
        formData.append("name", name);
        formData.append("title", title);
        formData.append("sex", sex);
        formData.append("start_date", start_date);
        formData.append("phone", phone);
        formData.append("email", email);
        formData.append("manager", manager);
        formData.append("avatar", avatar);
        // console.log('formData: ', formData);      

        // console.log("submit.......");
        this.props.dispatch(addNewUser(formData));
        // this.props.history.push('/');
    }

    render(){
        const style = {
            height: '700px',
            width:'700px',
            padding: '20px',
            // margin: '20px',
            border: '1px solid #C0BEBE',
            margin: '0 auto'
        }
        // const src = URL.createObjectURL(this.state.avatar)
        // console.log(this.props.employees);
        // 如果create时，manager不填选择none则add new不成功，添加不上，应该是后端问题
        
        return (
            this.props.employees.redirect ? <Redirect to={{pathname: '/'}} /> :
            (<Form style = {style} onSubmit = {this.submit}>
            {/* <Button icon labelPosition='left' onClick = {this.goBack}>
                Go Back
                <Icon name='left arrow' />
            </Button> */}
            <h1 style={{textAlign: "center"}}>Create New Employee</h1>
            <div className='wrapper'>     
                <Image src={this.state.src} size='tiny' circular />
                <input  style = {{width:'50%'}} type = 'file' onChange = {this.fileHandler}/>
            </div>
            {/* <button onClick = {this.uploadHandler}>Upload</button> */}
             <Form.Field required>
                <label>Name: </label>
                <input onChange = {this.nameChange}/>
             </Form.Field>
             <Form.Field >
                <label>Sex: </label>
                <input onChange = {this.sexChange}/>
             </Form.Field>
             <Form.Field >
                <label>Title: </label>
                <input onChange = {this.titleChange}/>
             </Form.Field>  
             <Form.Field >
                <label>Email: </label>
                <input onChange = {this.emailChange}/>
             </Form.Field>
             <Form.Field >
                <label>Phone: </label>
                <input onChange = {this.phoneChange}/>
             </Form.Field>  
             <Form.Field >
                <label>Start Date: </label>
                <input onChange = {this.dateChange}/>
             </Form.Field>   
             <Form.Field required>
             <label>Manager: </label>
                <select onChange = {this.mngChange}>
                <option value={null}>NONE</option>
                {this.props.employees.data.map(employee => {   
                    return (
                         <option value={employee._id}>{employee.name}</option>
                    )              
                })}                 
                </select>
             </Form.Field>  
             <Form.Field className = 'button'>
                <Button color='olive' >Add New User</Button>
                <Button basic color='olive'onClick = {this.cancelHandle}>Cancel</Button>
             </Form.Field>      
            </Form>)
        )
    }
}

const mapStateToProps = state => {
    return {
        employees: state.employees
    }
};

const WithRouterCreatePage = withRouter(CreatePage);

export default connect(mapStateToProps)(WithRouterCreatePage);