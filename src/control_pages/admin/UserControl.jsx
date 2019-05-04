import React, {Component} from "react";
import moment from "moment";
import axios from "axios";

class UserControl extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: [],
        };
    }


    getData() {
        const _this = this;
        axios.get("http://localhost:8080/admin/control").then(function (response) {
            console.log(response);
        }).catch(function (error) {
            console.log(error);
        })
    }

    componentWillMount() {
    }

    componentDidMount() {
        this.getData();
    }

    render() {
        return (
            <div>暂未提供</div>
        );
    }
}

export default UserControl;