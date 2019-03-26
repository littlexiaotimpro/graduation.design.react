import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter as Router, Route} from "react-router-dom";
import controlRoute from "./control_pages/control";
import TabBar from "./client_pages/tabbar/TabBar";

class App extends React.Component {

    render() {
        return <Router>
            <div>
                <Route path={"/home"} component={TabBar}/>
                <Route path={"/control/login"} component={controlRoute}/>
            </div>
        </Router>
    }
}

ReactDOM.render(<App/>, document.getElementById('root'));
