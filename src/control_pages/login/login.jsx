import React, {Component} from 'react';
import {Form, Icon, Input, Button, Layout, Modal,} from 'antd';
import "./less/login.css";
import axios from "axios";
// import PropTypes from 'prop-types';

// import {BrowserRouter as Router, Route, Link, Switch, Redirect} from "react-router-dom";

const {Header, Content} = Layout;

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class Login extends Component {

    constructor(props) {
        super(props)
        this.state = {
            message: {},
            visible: false,
        }
    }

    componentDidMount() {
        // To disabled submit button at the beginning.
        this.props.form.validateFields();
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    }

    handleCancel = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    }

    handleSubmit = (e) => {
        const _this = this;
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log(values);
                axios.post("http://localhost:8080/admin/login", {
                    account: values.account,
                    password: values.password
                }, {
                    // 单独配置
                    withCredentials: true
                }).then(function (response) {
                    console.log(response);
                    _this.setState({
                        message: response.data
                    })
                    if (response.data.code === 1) {
                        _this.props.history.push({pathname: "/control/manage", state: {admin: values.account}});
                    } else {
                        alert(response.data.msg);
                    }
                }).catch(function (error) {
                    console.log(error);
                })
            }
        });
    }

    render() {
        const {getFieldDecorator, getFieldsError, getFieldError, isFieldTouched,} = this.props.form
        const userNameError = isFieldTouched('account') && getFieldError('account');
        const passwordError = isFieldTouched('password') && getFieldError('password');
        return (
            <div>
                <Layout>
                    <Header style={{background: "#fff", height: 80, position: 'fixed', zIndex: 1, width: '100%'}}>
                        <div className="header-box">
                            <div className="nav-logo">
                                <h2>控制台</h2>
                            </div>
                            <div className="login-btn">
                                <Button className={"btn-hover"} onClick={this.showModal}>
                                    log in
                                </Button>
                            </div>
                        </div>
                    </Header>
                    <Content style={{marginTop: 80, background: "#fff"}}>
                        <div className={"box-content"}>
                            <p style={{fontSize: "3.2em"}}>React + Ant Design</p>
                            <p style={{fontSize: "1.3em"}}> Graduation Design 管理端</p>
                            <Button style={{
                                marginTop: 15,
                                background: "black",
                                color: "#fff",
                                width: 120,
                                borderRadius: 20,
                            }}
                                    size={'large'}>
                                <a href={"/home"}>客户端</a></Button>
                        </div>
                    </Content>
                </Layout>
                <Modal
                    title="Administrator Login"
                    visible={this.state.visible}
                    footer={null}
                    onCancel={this.handleCancel}
                >
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Form.Item
                            validateStatus={userNameError ? 'error' : ''}
                            help={userNameError || ''}
                        >
                            {getFieldDecorator('account', {
                                rules: [{required: true, message: '请输入管理员账号!'}],
                            })(
                                <Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                       placeholder="Account"/>
                            )}
                        </Form.Item>
                        <Form.Item
                            validateStatus={passwordError ? 'error' : ''}
                            help={passwordError || ''}
                        >
                            {getFieldDecorator('password', {
                                rules: [{required: true, message: '请输入管理员密码!'}],
                            })(
                                <Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>} type="password"
                                       placeholder="Password"/>
                            )}
                        </Form.Item>
                        <Form.Item>
                            <Button
                                style={{width: "100%"}}
                                type="primary"
                                htmlType="submit"
                                disabled={hasErrors(getFieldsError())}
                            >
                                登录
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        )
    }
}

const LoginView = Form.create({name: 'Login'})(Login)
export default LoginView;