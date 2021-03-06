import React, {Component} from "react";
import moment from "moment";
import axios from "axios";
import {Table} from "antd";

class Record extends Component {

    constructor(props) {
        super(props);
        this.state = {
            records: [],
        }
        this.columns = [{
            title: 'ID',
            dataIndex: 'id',
            width: 100,
        }, {
            title: 'keyWord',
            dataIndex: 'keyword',
            width: 300,
        }, {
            title: 'frequency',
            dataIndex: 'frequency',
            width: 100,
        }, {
            title: 'SearchTime',
            dataIndex: 'searchtime',
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
        axios.get("http://localhost:8080/record/control").then(function (response) {
            let values = [];
            for (let i = 0; i < response.data.length; i++) {
                response.data[i].key = response.data[i].id;
                values.push(response.data[i]);
            }
            _this.setState({
                records: values
            })
        }).catch(function (error) {
            console.log(error)
        })
    }

    render() {
        return (<div>
            <Table columns={this.columns} dataSource={this.state.records} pagination={{pageSize: 10}}/>
        </div>)
    }
}

export default Record;