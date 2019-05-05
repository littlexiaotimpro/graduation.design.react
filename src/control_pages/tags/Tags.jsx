import React, {Component} from "react";
import moment from "moment";
import axios from "axios";
import {Button, Table, Input, InputNumber, Popconfirm, Form,} from 'antd';
import "./less/Tags.css";

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

class Tags extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tags: [],
            editingKey: ''
        };
        this.columns = [{
            title: 'enTag',
            dataIndex: 'entag',
            width: 130,
            editable: true,
        }, {
            title: 'enCategory',
            dataIndex: 'encategory',
            width: 130,
            editable: true,
        }, {
            title: 'Caption',
            dataIndex: 'caption',
            width: 130,
            editable: true,
        }, {
            title: 'TagLevel',
            dataIndex: 'taglevel',
            width: 100,
            editable: true,
        }, {
            title: 'Status',
            dataIndex: 'status',
            width: 130,
            editable: true,
            render: (data, key) => <Button type="danger" onClick={() => {
                const _this = this;
                axios.post("http://localhost:8080/tags/delete", {
                    entag: key.entag,
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
            const newData = [...this.state.tags];
            key = row.entag;
            const index = newData.findIndex(item => key === item.key);
            const _this = this;
            // 判断通过key值查询行序号，如果不存在，在执行添加操作，否则执行更新操作
            if (index > -1) {
                // update
                axios.post("http://localhost:8080/tags/update", row, {
                    // 单独配置
                    withCredentials: true
                }).then(function (response) {
                    alert(response.data.msg);
                    if (response.data.code === 1) {
                        _this.getData();
                    }
                }).catch(function (error) {
                    console.log(error);
                });
            } else {
                // save
                axios.post("http://localhost:8080/tags/save", row, {
                    // 单独配置
                    withCredentials: true
                }).then(function (response) {
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
        axios.get("http://localhost:8080/tags/control").then(function (response) {
            let values = [];
            for (let i = 0; i < response.data.length; i++) {
                response.data[i].key = response.data[i].entag;
                values.push(response.data[i]);
            }
            if (response.data.length <= 0) {
                values.push({key: "none"});
            }
            _this.setState({
                tags: values
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
                    inputType: col.dataIndex === 'status' || col.dataIndex === 'taglevel' ? 'number' : 'text',
                    dataIndex: col.dataIndex,
                    title: col.title,
                    editing: this.isEditing(record),
                }),
            };
        });

        return (
            <Table
                components={components}
                bordered
                dataSource={this.state.tags}
                columns={columns}
                rowClassName="editable-row"
                pagination={{
                    pageSize: 10,
                    onChange: this.cancel,
                }}
            />
        );
    }
}

export default Tags;