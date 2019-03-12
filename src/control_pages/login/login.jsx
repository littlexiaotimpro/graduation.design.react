import React, {Component} from 'react';
import {Form, Icon, Input, Button} from 'antd';
import "bootstrap/dist/css/bootstrap.css";
import "./less/login.css";
import axios from "axios";
import $ from "jquery";
// import PropTypes from 'prop-types';

// import {BrowserRouter as Router, Route, Link, Switch, Redirect} from "react-router-dom";

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class Login extends Component {

    constructor(props) {
        super(props)
        this.state = {
            message: {}
        }
    }

    componentDidMount() {
        // To disabled submit button at the beginning.
        this.props.form.validateFields();
    }

    handleSubmit = (e) => {
        const _this = this;
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                // console.log('Received values of form: ', values);
                axios.post("http://localhost:8080/admin/login", {
                    account: values.account,
                    password: values.password
                }).then(function (response) {
                    console.log(response);
                    _this.setState({
                        message: response.data
                    })
                    if (response.data.code === 1) {
                        _this.props.history.push("/manage");
                    } else {
                        let v = $(".test").text();
                        alert(response.data.msg + v);
                    }
                }).catch(function (error) {
                    console.log(error);
                })
            }
        });
    }

    render() {
        const {
            getFieldDecorator, getFieldsError, getFieldError, isFieldTouched,
        } = this.props.form;

        // Only show error after a field is touched.
        const accountError = isFieldTouched('account') && getFieldError('account');
        const passwordError = isFieldTouched('password') && getFieldError('password');
        return (
            <div>
                <div className={"test"}>编程小白 毕设管理</div>
                <Form className="login-style" layout="inline" onSubmit={this.handleSubmit}>
                    <Form.Item
                        validateStatus={accountError ? 'error' : ''}
                        help={accountError || ''}
                    >
                        {getFieldDecorator('account', {
                            rules: [{required: true, message: 'Please input your account!'}],
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
                            rules: [{required: true, message: 'Please input your Password!'}],
                        })(
                            <Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>} type="password"
                                   placeholder="Password"/>
                        )}
                    </Form.Item>
                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            disabled={hasErrors(getFieldsError())}
                        >
                            Log in
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}

const LoginView = Form.create({name: 'Login'})(Login)
export default LoginView;