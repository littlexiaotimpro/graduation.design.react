import React, {Component} from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import Login from "./login/login"
import Siderbar from "./layout_nav/Siderbar"


export default class controlRoute extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Route exact path="/control/login" component={Login}/>
                    <Route path="/control/manage" component={Siderbar}/>
                </div>
            </Router>
        )
    }
}