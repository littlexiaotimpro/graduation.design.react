import React, {Component} from "react";
import moment from "moment";
import axios from "axios";
import {Avatar, Button, Col, Form, Icon, Input, Modal, Row, Select} from "antd";

const CollectionCreateForm = Form.create()(
    // eslint-disable-next-line
    class extends React.Component {
        render() {
            const {
                visible, onCancel, onCreate, form, onConfirm, onCompare, onValidate
            } = this.props;
            const {getFieldDecorator} = form;
            return (
                <Modal
                    visible={visible}
                    title="修改密码"
                    okText="修改"
                    cancelText="取消"
                    onCancel={onCancel}
                    onOk={onCreate}
                >
                    <Form layout="vertical">
                        <Form.Item label="password">
                            {getFieldDecorator('password', {
                                rules: [{
                                    required: true, message: 'Please input your password!',
                                }, {
                                    validator: onValidate,
                                }],
                            })(
                                <Input.Password prefix={<Icon type="lock"
                                                              style={{color: 'rgba(0,0,0,.25)'}}/>}
                                                type={"password"}/>
                            )}
                        </Form.Item>
                        <Form.Item label="Confirm Password">
                            {getFieldDecorator('confirm', {
                                rules: [{
                                    required: true, message: 'Please confirm your password!',
                                }, {
                                    validator: onCompare,
                                }],
                            })(
                                <Input.Password prefix={<Icon type="lock"
                                                              style={{color: 'rgba(0,0,0,.25)'}}/>}
                                                type={"password"}
                                                onBlur={onConfirm}/>
                            )}
                        </Form.Item>
                    </Form>
                </Modal>
            );
        }
    }
);

class UserControl extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: [],
            visible: false,
            confirmDirty: false,
            selectUser: null,
            userKey: null,
        };
    }


    getData() {
        const _this = this;
        axios.get("http://localhost:8080/admin/control").then(function (response) {
            _this.setState({
                users: response.data
            });
            for (let i = 0; i < response.data.length; i++) {
                if (response.data[i].account === _this.props.location.state.nowUser) {
                    _this.setState({
                        userKey: response.data[i].adminid,
                        selectUser: response.data[i].account,
                    })
                    _this.props.form.setFieldsValue({
                        adminid: response.data[i].adminid,
                        account: response.data[i].account,
                        oldPassword: response.data[i].password,
                        permission: response.data[i].permission,
                        status: response.data[i].status,
                        createtime: moment(parseInt(response.data[i].createtime)).format('YYYY-MM-DD HH:mm:ss'),
                    })
                } else {
                    continue;
                }
            }
        }).catch(function (error) {
            console.log(error);
        })
    }

    componentWillMount() {
    }

    componentDidMount() {
        this.getData();
    }

    // 输入框数据修改
    handleChangeUser = (user) => {
        this.setState({
            userKey: user.adminid,
            selectUser: user.account,
        })
        this.props.form.setFieldsValue({
            adminid: user.adminid,
            account: user.account,
            oldPassword: user.password,
            permission: user.permission,
            status: user.status,
            createtime: moment(parseInt(user.createtime)).format('YYYY-MM-DD HH:mm:ss'),
        })
    }

    // 模态框表单数据
    saveFormRef = (formRef) => {
        this.formRef = formRef;
    }

    // 修改密码模态框
    showModal = () => {
        this.setState({visible: true});
    }

    handleCancel = () => {
        this.setState({visible: false});
    }

    handleCreate = () => {
        const form = this.formRef.props.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            const _this = this;
            axios.post("http://localhost:8080/admin/update", {
                adminid: _this.state.userKey,
                password: values.password
            }, {
                // 单独配置
                withCredentials: true
            }).then(function (response) {
                alert(response.data.msg);
                _this.getData();
            }).catch(function (error) {
                console.log(error)
            })
            form.resetFields();
            this.setState({visible: false});
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const _this = this;
                axios.post("http://localhost:8080/admin/update", {
                    adminid: values.adminid,
                    permission: values.permission,
                    status: values.status,
                }, {
                    // 单独配置
                    withCredentials: true
                }).then(function (response) {
                    alert(response.data.msg);
                    _this.getData();
                }).catch(function (error) {
                    console.log(error)
                })
            }
        });
    }

    // 密码验证
    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({confirmDirty: this.state.confirmDirty || !!value});
    }

    compareToFirstPassword = (rule, value, callback) => {
        const form = this.formRef.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    }

    validateToNextPassword = (rule, value, callback) => {
        const form = this.formRef.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], {force: true});
        }
        callback();
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <div>
                <Row gutter={24} style={{width: "60%", minHeight: 300, margin: "20px auto"}}>
                    <Col className="gutter-row" span={6}>
                        <div className="gutter-box" style={{padding: 10,}}>
                            <p><a href={"javascript:;"}><Icon type="up"/></a></p>
                            {this.state.users.map(user => (
                                <p key={user.adminid}>
                                    <a href={"javascript:;"}>
                                        <Avatar onClick={() => this.handleChangeUser(user)}
                                                size={"large"}
                                                style={{
                                                    color: '#f56a00',
                                                    backgroundColor: '#fde3cf'
                                                }}>{user.account}</Avatar>
                                    </a>
                                </p>
                            ))}
                            <p><a href={"javascript:;"}><Icon type="down"/></a></p>
                        </div>
                    </Col>
                    <Col className="gutter-row" span={18}>
                        <div className="gutter-box" style={{padding: 10,}}>
                            <Form onSubmit={this.handleSubmit} className="login-form">
                                <Row>
                                    <Col className="gutter-row" span={14}>
                                        <Form.Item>
                                            {getFieldDecorator('adminid', {
                                                rules: [{required: true, message: 'Please input your AdminID!'}],
                                            })(
                                                <Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                                       placeholder="AdminID" disabled={true}/>
                                            )}
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="gutter-row" span={14}>
                                        <Form.Item>
                                            {getFieldDecorator('account', {
                                                rules: [{required: true, message: 'Please input your account!'}],
                                            })(
                                                <Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                                       placeholder="account" disabled={true}/>
                                            )}
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="gutter-row" span={14}>
                                        <Form.Item>
                                            {getFieldDecorator('oldPassword', {
                                                rules: [{required: true, message: 'Please input your Password!'}],
                                            })(
                                                <Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                                       type={"password"} placeholder="Password" disabled={true}/>
                                            )}
                                        </Form.Item>
                                    </Col>
                                    <Col className="gutter-row" span={6}>
                                        <Button type="primary" style={{marginTop: 3}}
                                                onClick={this.showModal}>修改密码</Button>
                                        <CollectionCreateForm
                                            wrappedComponentRef={this.saveFormRef}
                                            visible={this.state.visible}
                                            onCancel={this.handleCancel}
                                            onCreate={this.handleCreate}
                                            onConfirm={this.handleConfirmBlur}
                                            onCompare={this.compareToFirstPassword}
                                            onValidate={this.validateToNextPassword}
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="gutter-row" span={14}>
                                        <Form.Item>
                                            {getFieldDecorator('permission', {
                                                rules: [{required: true, message: 'Please select your permission!'}],
                                            })(
                                                <Select
                                                    disabled={this.state.selectUser === this.props.location.state.nowUser ? true : false}>
                                                    <Select.Option key={0} value={0}>管理员</Select.Option>
                                                    <Select.Option key={1} value={1}>普通用户</Select.Option>
                                                </Select>
                                            )}
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="gutter-row" span={14}>
                                        <Form.Item>
                                            {getFieldDecorator('status', {
                                                rules: [{required: true, message: 'Please select your status!'}],
                                            })(
                                                <Select
                                                    disabled={this.state.selectUser === this.props.location.state.nowUser ? true : false}>
                                                    <Select.Option key={1} value={1}>启用</Select.Option>
                                                    <Select.Option key={0} value={0}>禁用</Select.Option>
                                                </Select>
                                            )}
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="gutter-row" span={14}>
                                        <Form.Item>
                                            {getFieldDecorator('createtime', {
                                                rules: [{required: true, message: 'Please input your createtime!'}],
                                            })(
                                                <Input
                                                    prefix={<Icon type="calendar" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                                    placeholder="CreateTime" disabled={true}/>
                                            )}
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="gutter-row" span={14}>
                                        <Form.Item>
                                            <Button
                                                disabled={this.state.selectUser === this.props.location.state.nowUser ? true : false}
                                                type="primary" htmlType="submit" className="login-form-button"
                                                style={{width: "100%"}}>
                                                提交
                                            </Button>
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Form.create()(UserControl);