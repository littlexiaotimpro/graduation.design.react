import React, {Component} from "react";
import moment from "moment";
import axios from "axios";
import {Avatar, Col, Icon, Row} from "antd";

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
            _this.setState({
                users: response.data
            })
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
            <div>
                <Row gutter={48} style={{border: "1px solid black", width: "55%", minHeight: 300, margin: "30px auto"}}>
                    <Col className="gutter-row" span={6}>
                        <div className="gutter-box" style={{padding: 10,}}>
                            <p><a href={"javascript:;"}><Icon type="up"/></a></p>
                            <p><Avatar size={"large"}
                                       style={{color: '#f56a00', backgroundColor: '#fde3cf'}}>Admin</Avatar></p>
                            <p><Avatar size={"large"}
                                       style={{color: '#f56a00', backgroundColor: '#fde3cf'}}>visitor</Avatar></p>
                            <p><Avatar size={"large"}
                                       style={{color: '#f56a00', backgroundColor: '#fde3cf'}}>guest</Avatar></p>
                            <p><Avatar size={"large"}
                                       style={{color: '#f56a00', backgroundColor: '#fde3cf'}}>1</Avatar></p>
                            <p><Avatar size={"large"}
                                       style={{color: '#f56a00', backgroundColor: '#fde3cf'}}>2</Avatar></p>
                            <p><Avatar size={"large"}
                                       style={{color: '#f56a00', backgroundColor: '#fde3cf'}}>3</Avatar></p>
                            <p><a href={"javascript:;"}><Icon type="down"/></a></p>
                        </div>
                    </Col>
                    <Col className="gutter-row" span={18}>
                        <div className="gutter-box" style={{padding: 10,}}>数据表单</div>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default UserControl;