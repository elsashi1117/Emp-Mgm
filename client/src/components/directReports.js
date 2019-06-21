import React, {Component} from 'react';
import { Table } from 'semantic-ui-react';
import { connect } from 'react-redux';
import {getOneUser} from '../actions/getOneUser';


class DirectReports extends Component {
   
    componentDidMount(){
        this.props.dispatch(getOneUser(this.props.match.params.id));
        
    }

    render(){
        const style = {padding: '30px'}
        const imageStyle = {width: 50, height: 50};
        // console.log(this.props.oneEmployee.employee.directly_reports)
        return (
            <div style = {style}>
                <div style = {{textAlign: 'center',fontSize:40, padding:25} }>Direct Reports</div>
                <Table >
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell></Table.HeaderCell>
                            <Table.HeaderCell>NAME</Table.HeaderCell>
                            <Table.HeaderCell>TITLE</Table.HeaderCell>
                            <Table.HeaderCell>EMAIL</Table.HeaderCell>
                            <Table.HeaderCell>PHONE</Table.HeaderCell>
                            <Table.HeaderCell>Direct Reports</Table.HeaderCell>
                            {/* <Table.HeaderCell>EDIT</Table.HeaderCell>
                            <Table.HeaderCell>DELETE</Table.HeaderCell> */}
                        </Table.Row>
                    </Table.Header>
                    <tbody>
                        {this.props.oneEmployee.employee.directly_reports&&
                        this.props.oneEmployee.employee.directly_reports.map(employee => (
                            <tr key={employee._id}>
                                <td><img 
                                    style={imageStyle} 
                                    src={"http://localhost:3001/"+employee.avatar} 
                                    alt={"http://localhost:3001/"+employee.avatar}/></td>
                                <td>{employee.name}</td>
                                <td>{employee.title}</td>
                                <td>{employee.email}</td>
                                <td>{employee.phone}</td>
                            
                                <td>{employee.directly_reports.length}</td>
                            
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        )
    }
    
}

const mapStateToProps = state => {
    return {
        oneEmployee: state.oneEmployee
    }
}

export default connect(mapStateToProps)(DirectReports);
