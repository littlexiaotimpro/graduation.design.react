import React, {Component} from "react";
import moment from "moment";
import axios from "axios";
import {Button, Table, Input, InputNumber, Popconfirm, Form,} from 'antd';
import "./less/Navbar.css";

const FormItem = Form.Item;
const EditableContext = React.createContext();

const EditableRow = ({form, index, ...props}) => (
    <EditableContext.Provider value={form}>
        <tr {...props} />
    </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends React.Component {
    getInput = () => {
        if (this.props.inputType === 'number') {
            return <InputNumber/>;
        }
        return <Input/>;
    };

    render() {
        const {
            editing,
            dataIndex,
            title,
            inputType,
            record,
            index,
            ...restProps
        } = this.props;
        return (
            <EditableContext.Consumer>
                {(form) => {
                    const {getFieldDecorator} = form;
                    return (
                        <td {...restProps}>
                            {editing ? (
                                <FormItem style={{margin: 0}}>
                                    {getFieldDecorator(dataIndex, {
                                        rules: [{
                                            required: true,
                                            message: `Please Input ${title}!`,
                                        }],
                                        initialValue: record[dataIndex],
                                    })(this.getInput())}
                                </FormItem>
                            ) : restProps.children}
                        </td>
                    );
                }}
            </EditableContext.Consumer>
        );
    }
}

class Navbar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            navbar: [],
            editingKey: ''
        };
        this.columns = [{
            title: 'enNav',
            dataIndex: 'ennav',
            width: 150,
            editable: true,
        }, {
            title: 'Caption',
            dataIndex: 'caption',
            width: 150,
            editable: true,
        }, {
            title: 'NavLevel',
            dataIndex: 'navlevel',
            width: 150,
            editable: true,
        }, {
            title: 'Status',
            dataIndex: 'status',
            width: 150,
            editable: true,
            render: (data, key) => <Button type="danger" onClick={() => {
                const _this = this;
                axios.post("http://localhost:8080/navbar/delete", {
                    ennav: key.ennav,
                    status: key.status === 1 ? 0 : 1
                }).then(function (response) {
                    alert(response.data.msg);
                    if (response.data.code === 1) {
                        // const dataSource = [..._this.state.navbar];
                        // //通过传递当前行的key值，比对获取行序号
                        // const index = dataSource.findIndex(item => key.key === item.key);
                        // const item = dataSource[index];
                        // const status = key.status === 1 ? 0 : 1;
                        // dataSource.splice(index, 1, {
                        //     ...item,
                        //     ...{status: status}
                        // });
                        // _this.setState(
                        //     {navbar: dataSource}
                        // )
                        _this.getData();
                    }
                }).catch(function (error) {
                    console.log(error);
                })
            }}>{data === 1 ? "启用" : "禁用"}</Button>,
        }, {
            title: 'CreateTime',
            dataIndex: 'createtime',
            width: 150,
            render: (data) => {
                return moment(parseInt(data)).format('YYYY-MM-DD HH:mm')
            },
        }, {
            title: 'UpdateTime',
            dataIndex: 'updatetime',
            width: 150,
            render: (data) => {
                return moment(parseInt(data)).format('YYYY-MM-DD HH:mm')
            },
        }, {
            title: 'Action',
            key: 'operation',
            render: (text, record) => {
                const editable = this.isEditing(record);
                return (
                    <div>
                        {editable ? (
                            <span>
                  <EditableContext.Consumer>
                    {form => (
                        <a
                            href="javascript:;"
                            onClick={() => this.save(form, record.key)}
                            style={{marginRight: 8}}
                        >
                            Save
                        </a>
                    )}
                  </EditableContext.Consumer>
                  <Popconfirm
                      title="Sure to cancel?"
                      onConfirm={() => this.cancel(record.key)}
                  >
                    <a>Cancel</a>
                  </Popconfirm>
                </span>
                        ) : (
                            <Button type="primary" onClick={() => this.edit(record.key)}>编辑</Button>
                        )}
                    </div>
                );
            },
        }];
    }

    isEditing = record => record.key === this.state.editingKey;

    cancel = () => {
        this.setState({editingKey: ''});
    };

    save(form, key) {
        form.validateFields((error, row) => {
            if (error) {
                return;
            }
            const newData = [...this.state.navbar];
            key = row.ennav;
            const index = newData.findIndex(item => key === item.key);
            const _this = this;
            // 判断通过key值查询行序号，如果不存在，在执行添加操作，否则执行更新操作
            if (index > -1) {
                // const item = newData[index];
                // newData.splice(index, 1, {
                //     ...item,
                //     ...row,
                // });
                // console.log(newData[index]);
                // update
                axios.post("http://localhost:8080/navbar/update", row).then(function (response) {
                    alert(response.data.msg);
                    if (response.data.code === 1) {
                        _this.getData();
                    }
                }).catch(function (error) {
                    console.log(error);
                });
            } else {
                // save
                axios.post("http://localhost:8080/navbar/save", row).then(function (response) {
                    alert(response.data.msg);
                    if (response.data.code === 1) {
                        _this.getData();
                    }
                }).catch(function (error) {
                    console.log(error);
                });
            }
            this.setState({editingKey: ''});
        });
    }

    edit(key) {
        this.setState({editingKey: key});
    }

    getData() {
        const _this = this;
        axios.get("http://localhost:8080/navbar/control").then(function (response) {
            console.log(response);
            let values = [];
            for (let i = 0; i < response.data.length; i++) {
                response.data[i].key = response.data[i].ennav;
                values.push(response.data[i]);
            }
            if (response.data.length <= 0) {
                values.push({key: "none"});
            }
            _this.setState({
                navbar: values
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
        const components = {
            body: {
                row: EditableFormRow,
                cell: EditableCell,
            },
        };

        const columns = this.columns.map((col) => {
            if (!col.editable) {
                return col;
            }
            return {
                ...col,
                onCell: record => ({
                    record,
                    inputType: col.dataIndex === 'status' || col.dataIndex === 'navlevel' ? 'number' : 'text',
                    dataIndex: col.dataIndex,
                    title: col.title,
                    editing: this.isEditing(record),
                }),
            };
        });

        return (
            <Table
                components={components}
                // key={this.state.navbar.key}
                bordered
                dataSource={this.state.navbar}
                columns={columns}
                rowClassName="editable-row"
                pagination={{
                    pageSize: 10,
                    onChange: this.cancel,
                }}
                scroll={{y: 290}}
            />
        );
    }
}

export default Navbar;