import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import * as actions from '../actions/getUsers';
import {connect} from 'react-redux';
import { Form, Button, Dropdown, Image, Icon } from 'semantic-ui-react';
import {getOneUser} from '../actions/getOneUser';
import './style.css';
// import { clearUser } from '../actions/getOneUser';


class EditPage extends Component{
    constructor(props){
        super(props);
        this.state = {
            sex: '',
            title: '',
            email: '',
            phone: '',
            start_date: '',
            avatar: this.props.oneEmployee.employee.avatar,
            manager: null
        }
    }

    componentDidMount(){
        // this.props.dispatch(clearUser());
        console.log('componentDidMount');
        this.props.dispatch(getOneUser(this.props.match.params.id));
    }
    // componentDidUpdate(prevProps){
    //     console.log(this.props.oneEmployee.employee);
    //     if(this.props !== prevProps){
    //         console.log('componentDidUpdate');
    //         this.setState({...this.props.oneEmployee.employee})
    //     }
    //     let filterEmp = this.props.employees.data.filter(emp => !this.mngTree(this.Props.oneEmployee.employee).includes(emp))
     
    // }
    //为什么我要加这个lifecycle？？？？？？？？？？？？？？？？？
    componentWillReceiveProps(nextProps){
        // this.props.dispatch(getOneUser(this.props.match.params.id));
        console.log('componentWillReceiveProps');
        // console.log(nextProps.oneEmployee)
        this.setState({...nextProps.oneEmployee.employee})
        // let filterEmp = this.props.employees.data.filter(emp => !this.mngTree(nextProps.oneEmployee.employee).includes(emp))
        }

    // allEmps = this.props.employees.data
    mngTree = (id, allEmps) => {
        console.log('--id: ', this.props.oneEmployee.employee)
        if (!id) {
            return [] 
        } else {
            let tree = [id];
            let idObj = allEmps.filter(emp => emp._id === id);
            console.log('--idobj--', idObj)
            console.log('--idobj 2--', idObj[0].directly_reports)
            for (let i = 0; i < idObj[0].directly_reports.length; i++){
                tree.push(...this.mngTree(idObj[0].directly_reports[i]._id, allEmps))
            }
            return tree;
        }
    }
    
    

   
    // console.log('filterEmp',filterEmp)

    cancelHandle = () => {
        this.props.history.push('/');
    }

  
    // nameChange = e => {
    //     this.setState({name : e.target.value})
    // };
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
    // goBack = () => {
    //     this.props.history.goBack();
    // }

    submit = e => {
        e.preventDefault();       
        const {sex, title, phone, email, start_date, manager} = this.state;
        let managerId = '';
        if(manager === null){
            managerId = null
        } else if(typeof(manager) === "object"){
            managerId = manager._id;
        } else {
            managerId = manager;
        }
        const {id} = this.props.match.params;
        const employee = {sex, title, phone, email, start_date, managerId};
        this.props.dispatch(actions.editUser(id, employee));
         //submit时，更新的信息成功上传，但是却无法改变，是后端的问题？
         
        // let formData = new FormData();
        // // formData.append("name", name);
        // formData.append("sex", sex);
        // formData.append("title", title);
        // formData.append("phone", phone);
        // formData.append("email", email);
        // formData.append("start_date", start_date);
        // formData.append("managerId", managerId);
        // // formData.append("avatar", avatar);
        // this.props.dispatch(actions.editUser(id, formData));
        // console.log("submit"); 
        // setTimeout(()=>this.props.history.push('/'),1000);     
        // this.props.history.push('/');

        // Promise
        //     .resolve(this.props.dispatch(actions.editUser(id, employee)))
        //     .then(this.props.history.push('/')) 

        //为什么isFetching为true时会跳转到主页？下面这种写法为啥不解决async问题？
        // this.props.employees.isFetching ? null : this.props.history.push('/')
    }
    

    
    
    // console.log(filterEmp)

    render(){
        console.log('render');
        const style = {
            height: '700px',
            width:'700px',
            padding: '20px',
            // margin: '20px',
            border: '1px solid white',
            margin: '0 auto'
        }
        const src = "http://localhost:3001/"+this.state.avatar

        // console.log(this.props);
        const options = [
            {key: 'f', text: 'Female', value: 'female'},
            {key: 'm', text: 'Male', value: 'male'},
            {key: 'o', text: 'Other', value: 'other'},
        ];
        const {name, sex, title, email, phone, start_date, manager} = this.props.oneEmployee.employee;
        // console.log('prev-manager: ', this.state.manager)

       
        const allEmps = this.props.employees.data
        // let mngTree = id => {
        //     // console.log('--id: ', id)
        //     if (!id) {
        //         return [] 
        //     } else {
        //         let tree = [id];
        //         let idObj = allEmps.filter(emp => emp._id === id);
        //         // console.log('--idobj--', idObj)
        //         console.log('--idobj 2--', idObj[0].directly_reports)
        //         for (let i = 0; i < idObj[0].directly_reports.length; i++){
        //             tree.push(...mngTree(idObj[0].directly_reports[i]._id))
        //         }
        //         return tree;
        //     }
        // }
        // let filterEmp = allEmps.filter(emp => !mngTree(this.props.oneEmployee.employee._id).filter( y => y === emp._id).length);
        // console.log('filterEmp',filterEmp)
        
        let subTree = this.mngTree(this.props.oneEmployee.employee._id, allEmps);
        let filterEmp = allEmps.filter(emp => !subTree.filter( y => y === emp._id).length);

        return (
         this.props.employees.redirect ? <Redirect to={{pathname: '/'}} /> :
           (<Form style = {style} onSubmit = {this.submit}>
           {/* <Button icon labelPosition='left' onClick = {this.goBack}>
                Go Back
                <Icon name='left arrow' />
            </Button> */}
            <h1 style={{textAlign: "center"}}>Edit Employee</h1>
            <div className = 'wrapper'>     
                <Image src={src} size='tiny' circular />
                <input style = {{width:'50%'}} type = 'file' onChange = {this.fileHandler}/>
            </div>
             <Form.Field required>
                <label>Name: </label>
                <input value = {name}
                    onChange = {this.nameChange}/>
             </Form.Field>
             <Form.Field required>
                <label>Sex: </label>
                <Dropdown placeholder = {sex} 
                    options = {options} onChange = {this.sexChange}/>
             </Form.Field>
             <Form.Field required>
                <label>Title: </label>
                <input defaultValue = {title}
                onChange = {this.titleChange}/>
             </Form.Field>  
             <Form.Field required>
                <label>Email: </label>
                <input defaultValue = {email}
                    onChange = {this.emailChange}/>
             </Form.Field>
             <Form.Field required>
                <label>Phone: </label>
                <input defaultValue = {phone}
                    onChange = {this.phoneChange}/>
             </Form.Field>  
             <Form.Field required>
                <label>Start Date: </label>
                <input defaultValue = {start_date}
                    onChange = {this.dateChange}/>
             </Form.Field>   
             <Form.Field>
                 {/* 在edit manager时，改不掉manager，还是以前的那个 */}
             <label>Manager: </label>
                <select onChange = {this.mngChange}>
                <option>{manager&&manager.name}</option>
                {filterEmp.map(employee => {   
                    return (
                         <option value={employee._id}>{employee.name}</option>
                    )              
                })}                 
                </select>
             </Form.Field>  
             <Form.Field className = 'button'>
                <Button color='yellow'>Update User</Button>
                <Button basic color='yellow' onClick = {this.cancelHandle}>Cancel</Button>
             </Form.Field>      
             </Form>)
        )
    }
}

const mapStateToProps = state => {
    return {
        employees: state.employees,
        oneEmployee: state.oneEmployee
    }
};


// const WithRouterEditPage = withRouter(EditPage);

export default connect(mapStateToProps)(EditPage);