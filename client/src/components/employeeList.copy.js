// import React, {Component} from 'react';
// import {connect} from 'react-redux';
// import * as actions from '../actions/getUsers';
// import {sort} from '../actions/sort';
// import { Table } from 'semantic-ui-react';
// import {withRouter} from 'react-router-dom';
// import { clearUser } from '../actions/getOneUser';


// class EmployeeList extends Component {
//     // constructor(props){
//     //     super(props);
//     //     this.state = {}
//     // }

//     componentDidMount(){
//         // console.log("componentDidMount")
//         this.props.clearUser();
//         this.props.getAllUsers();
        
//     }

//     deleteHandler = id => {
//         this.props.deleteUser(id);
//     }

//     // filterEmployee = id => {
//     //     // console.log(id)
//     //     // console.log(this.props.employees.data.filter(user => user._id === id));
//     //     return this.props.employees.data.filter(user => user._id === id)[0]&&this.props.employees.data.filter(user => user._id === id)[0].name       
//     // }

//     editHandler = id => {
//         this.props.history.push(`/edit/${id}`)
//     };
//     reportsPage = id => {
//         this.props.history.push(`/direct_reports/${id}`)
//     };
//     sortHandler = field => {
//         // console.log('sortClick')
//         this.props.sortUser(field);
//         this.props.getAllUsers();
//     };

//     render(){
//         const imageStyle = {width: 50, height: 50};
//         // console.log(this.props.employees.data[0]&&typeof(this.props.employees.data[0].directly_reports.length));
//         // console.log(this.filterEmployee("5bd3aa8415daba8d220e2d7e"));
        
//         return (
//             this.props.employees.isFetching ? ( <h3>Loading...</h3> ) :
//             ( <Table >
//                 <Table.Header>
//                     <Table.Row>
//                         <Table.HeaderCell></Table.HeaderCell>
//                         <Table.HeaderCell onClick = {() => this.sortHandler('name')}>NAME</Table.HeaderCell>
//                         <Table.HeaderCell onClick = {() => this.sortHandler('title')}>TITLE</Table.HeaderCell>
//                         <Table.HeaderCell onClick = {() => this.sortHandler('email')}>EMAIL</Table.HeaderCell>
//                         <Table.HeaderCell onClick = {() => this.sortHandler('phone')}>PHONE</Table.HeaderCell>
//                         <Table.HeaderCell onClick = {() => this.sortHandler('manager')}>MANAGER</Table.HeaderCell>
//                         <Table.HeaderCell onClick = {() => this.sortHandler('directly_reports')}>Direct Reports</Table.HeaderCell>
//                         <Table.HeaderCell>EDIT</Table.HeaderCell>
//                         <Table.HeaderCell>DELETE</Table.HeaderCell>
//                     </Table.Row>
//                 </Table.Header>
//                 <tbody>
//                     {this.props.employees.data.map(employee => (
//                         <tr key={employee._id}>
//                             <td><img 
//                                 style={imageStyle} 
//                                 src={"http://localhost:3001/"+employee.avatar} 
//                                 alt={"http://localhost:3001/"+employee.avatar}/></td>
//                             <td>{employee.name}</td>
//                             <td>{employee.title}</td>
//                             {/* <td>{employee.email}</td> */}
//                             {/* <td>{employee.phone}</td> */}
//                             <td><a href="mailto:{employee.email}">{employee.email}</a></td>
//                             <td><a href="tel:{employee.phone}">{employee.phone}</a></td>
//                             <td>{employee.manager&&employee.manager.name}</td>
//                             <td onClick = {()=>this.reportsPage(employee._id)}>{employee.directly_reports.length}</td>
//                             <td onClick = {()=>this.editHandler(employee._id)}>EDIT</td>
//                             <td onClick = {() => this.deleteHandler(employee._id)}
//                                 reports = {employee.directly_reports}>DELETE</td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </Table> )
//         )
//     }
// }

// const mapStateToProps = state => {
//     return {
//         employees: state.employees
//     }
// }

// const mapDispatchToProps = dispatch => {
//     return {
//         getAllUsers: () => {
//             dispatch(actions.getAllUsers())
//         },
//         deleteUser: id => {
//             dispatch(actions.deleteUser(id))
//         },
//         clearUser: ()=> {
//             dispatch(clearUser())
//         },
//         sortUser: field => {
//             dispatch(sort(field))
//         }
//     }
// }

// const WithRouterEmployeeList = withRouter(EmployeeList)
// export default connect(mapStateToProps, mapDispatchToProps)(WithRouterEmployeeList);