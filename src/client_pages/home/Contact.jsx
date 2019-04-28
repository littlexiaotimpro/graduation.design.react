import React, {Component} from "react";
import {Button, Col, Divider, Form, Row, Input, Carousel} from "antd";
import axios from "axios";
import "./less/home.css";

class Contact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contacts: [],
        };
    }

    componentWillMount() {
    }

    componentDidMount() {
        this.getData();
    }

    getData = () => {
        const _this = this;
        axios.get("http://localhost:8080/contact/client").then(function (response) {
            _this.setState({
                contacts: response.data,
            })
        }).catch(function (error) {
            console.log(error);
        })
    }

    handleSubmit = (e) => {
        const _this = this;
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                axios.post("http://localhost:8080/contact/save", values).then(function (response) {
                    console.log(response.data);
                }).catch(function (error) {
                    console.log(error);
                })
            }
        });
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <div style={{width: "100%", marginTop: 100}}>

                <div style={{textAlign: "center", fontSize: "1.4em", width: "40%", margin: "0 auto", marginTop: 40}}>
                    感谢您提供的意见，我们会为此不断努力
                    <Divider/>
                </div>

                <div style={{width: "75%", margin: "0 auto", marginTop: 30}}>
                    <Form layout="vertical" hideRequiredMark>
                        <Row gutter={16}>
                            <Col span={8}>
                                <Form.Item label="昵称">
                                    {getFieldDecorator('nickname', {
                                        rules: [{required: true, message: '请输入昵称'}],
                                    })(<Input placeholder="昵称"/>)}
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item label="邮箱">
                                    {getFieldDecorator('email', {
                                        rules: [{required: true, message: '请输入邮箱'}],
                                    })(<Input placeholder="邮箱"/>)}
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item label="标题">
                                    {getFieldDecorator('title', {
                                        rules: [{required: true, message: '请输入标题'}],
                                    })(<Input placeholder="标题"/>)}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={24}>
                                <Form.Item label="建议">
                                    {getFieldDecorator('content', {
                                        rules: [
                                            {
                                                required: true,
                                                message: '建议',
                                            },
                                        ],
                                    })(<Input.TextArea rows={5} placeholder="建议"/>)}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <Button onClick={this.handleSubmit} type="primary">
                                    提交
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </div>

                <div style={{width: "75%", margin: "0 auto", marginTop: 80, height: 230, textAlign: "center",}}>

                    <div style={{fontSize: "1.4em", width: "30%", margin: "0 auto", marginTop: 40}}>
                        优秀的建议
                        <Divider/>
                    </div>
                    <div style={{fontSize: "2em", width: "75%", margin: "0 auto", marginTop: 30,}}>
                        <Carousel className={"contact-carousel"} autoplay>
                            {this.state.contacts.map(contact => (
                                <div key={contact.id} className={"contact-slick-slide"}>
                                    <p>{contact.content}</p>
                                    <p>by - {contact.nickname}</p>
                                </div>
                            ))}
                        </Carousel>
                    </div>
                </div>

                <div style={{width: "75%", margin: "0 auto", marginTop: 50}}>
                    <Divider/>
                </div>
                <div style={{width: "75%", margin: "0 auto", marginTop: 80, height: 200,}}>
                    <Row gutter={48}>
                        <Col className="gutter-row" span={8}>
                            <div className="gutter-box">
                                {/*<p><strong style={{fontSize: "1.8em", color: "#000"}}>Who Am I</strong></p>*/}
                                <p><strong style={{fontSize: "1.8em", color: "#000"}}>What I Have Done</strong></p>
                            </div>
                        </Col>
                        <Col className="gutter-row" span={4}>
                            <div className="gutter-box">
                                <p>产品</p>
                                <p><a href={"#"}>即我（本站）</a></p>
                                <p><a href={"#"}>模拟农场</a></p>
                                <p><a href={"#"}>移动电商</a></p>
                            </div>
                        </Col>
                        <Col className="gutter-row" span={4}>
                            <div className="gutter-box">
                                <p>平台</p>
                                <p><a href={"#"}>暂无</a></p>
                            </div>
                        </Col>
                        <Col className="gutter-row" span={4}>
                            <div className="gutter-box">
                                <p>支持</p>
                                <p><a href={"https://github.com/"}>Github</a></p>
                                <p><a href={"https://ant.design/docs/react/introduce-cn"}>Ant Design</a></p>
                                <p><a href={"#"}>React系列</a></p>
                                <p><a href={"#"}>Google</a></p>
                            </div>
                        </Col>
                        <Col className="gutter-row" span={4}>
                            <div className="gutter-box">
                                <p>开发</p>
                                <p><a href={"#"}>关于</a></p>
                                <p><a href={"#"}>博客</a></p>
                                <p><a href={"#"}>联系</a></p>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}

export default Form.create()(Contact);