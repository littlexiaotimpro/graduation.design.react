import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter as Router, Route} from "react-router-dom";
import controlRoute from "./control_pages/control"

class App extends React.Component {

    render() {
        return <Router>
            <div>
                {/*<Route path={"/"} component={Login}/>*/}
                <Route path={"/control/login"} component={controlRoute}/>
            </div>
        </Router>
    }
}

ReactDOM.render(<App/>, document.getElementById('root'));
