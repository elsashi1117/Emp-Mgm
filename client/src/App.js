import React,{Component} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import Home from './components/Home';
import WithRouterCreatePage from './components/createPage';
import EditPage from './components/editPage';
// import DirectReports from './components/directReports';

class App extends Component {
    render(){
        return(
            <BrowserRouter>
                <Switch>
                    <Route exact = {true} path = '/' component = {Home}/>
                    <Route exact = {true} path = '/edit/:id' component = {EditPage}/>
                    <Route exact = {true} path = '/create' component = {WithRouterCreatePage}/>
                    {/* <Route exact = {true} path = '/direct_reports/:id' component = {DirectReports}/> */}
                </Switch>
            </BrowserRouter>
        )
    }
}

export default App;