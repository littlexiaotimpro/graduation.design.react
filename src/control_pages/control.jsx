import React, {Component} from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
// import Login from "./login/login"
import Siderbar from "./layout_nav/Siderbar"


export default class controlRoute extends Component {
    render() {
        return (
            <Router>
                <div>
                    {/*<Route exact path="/login" component={Login}/>*/}
                    <Route path="/" component={Siderbar}/>
                </div>
            </Router>
        )
    }
}