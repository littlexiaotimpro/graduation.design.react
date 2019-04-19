import React, {Component} from "react";
import moment from "moment";
import axios from "axios";
import {Table} from "antd";

class Record extends Component {

    constructor(props) {
        super(props);
        this.state = {
            logs: [],
        }
        this.columns = [{
            title: 'LogNo',
            dataIndex: 'logno',
            width: 80,
        }, {
            title: 'Operator',
            dataIndex: 'operator',
            width:100,
        }, {
            title: 'Operation',
            dataIndex: 'operation',
            width: 100,
        }, {
            title: 'Content',
            dataIndex: 'content',
            width: 400,
        }, {
            title: 'CreateTime',
            dataIndex: 'createtime',
            render: (data) => {
                return moment(parseInt(data)).format('YYYY-MM-DD HH:mm:ss')
            },
        }];
    }

    componentDidMount() {
        this.getData();
    }

    getData() {
        const _this = this;
        axios.get("http://localhost:8080/log/control").then(function (response) {
            _this.setState({
                logs: response.data
            })
        }).catch(function (error) {
            console.log(error)
        })
    }

    render() {
        return (<div>
            <Table columns={this.columns} dataSource={this.state.logs} pagination={{pageSize: 10}}
                   scroll={{y: 290}}/>
        </div>)
    }
}

export default Record;