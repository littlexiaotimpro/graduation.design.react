import React, {Component} from "react";
import moment from "moment";
import axios from "axios";
import {Button, Table} from "antd";

class Contact extends Component {

    constructor(props) {
        super(props);
        this.state = {
            contacts: [],
        }
        this.columns = [{
            title: 'ID',
            dataIndex: 'id',
            width: 80,
        }, {
            title: 'nickname',
            dataIndex: 'nickname',
            width: 80,
        }, {
            title: 'Email',
            dataIndex: 'email',
            width: 130,
        }, {
            title: 'Title',
            dataIndex: 'title',
            width: 100,
        }, {
            title: 'Content',
            dataIndex: 'content',
            width: 360,
        }, {
            title: 'Status',
            dataIndex: 'status',
            width: 130,
            render: (data, key) => <Button type="danger" onClick={() => {
                const _this = this;
                axios.post("http://localhost:8080/contact/delete", {
                    id: key.id,
                    status: key.status === 1 ? 0 : 1
                }, {
                    // 单独配置
                    withCredentials: true
                }).then(function (response) {
                    alert(response.data.msg);
                    if (response.data.code === 1) {
                        _this.getData();
                    }
                }).catch(function (error) {
                    console.log(error);
                })
            }}>{data === 1 ? "启用" : "禁用"}</Button>,
        }, {
            title: 'SentTime',
            dataIndex: 'senttime',
            render: (data) => {
                return moment(parseInt(data)).format('YYYY-MM-DD HH:mm')
            },
        }];
    }

    componentDidMount() {
        this.getData();
    }

    getData() {
        const _this = this;
        axios.get("http://localhost:8080/contact/control").then(function (response) {
            let values = [];
            for (let i = 0; i < response.data.length; i++) {
                response.data[i].key = response.data[i].id;
                values.push(response.data[i]);
            }
            _this.setState({
                contacts: values
            })
        }).catch(function (error) {
            console.log(error)
        })
    }

    render() {
        return (<div>
            <Table columns={this.columns} dataSource={this.state.contacts} pagination={{pageSize: 10}}/>
        </div>)
    }
}

export default Contact;