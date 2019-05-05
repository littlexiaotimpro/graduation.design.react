import React, {Component} from "react";
import {Card, Col, Divider, Row} from "antd";
import axios from "axios";
import moment from "moment";

class About extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userCount: "",
            untilDate: new Date(),
        }
    }

    componentDidMount() {
        this.getUserCount();
    }

    getUserCount = () => {
        const _this = this;
        axios.get("http://localhost:8080/contact/count").then(function (response) {
            _this.setState({
                userCount: response.data,
            })
        }).catch(function (error) {
            console.log(error)
        })
    }

    render() {
        return (
            <div style={{width: "100%", marginTop: 100}}>
                <p style={{textAlign: "center", fontSize: "3.7em", color: "#000", width: "100%"}}>
                    <strong>即我（I Am） </strong>
                    <small style={{fontSize: "0.8em"}}> 人本无一，我即是我</small>
                </p>
                <p style={{textAlign: "center", fontSize: "1.4em", width: "53%", margin: "0 auto", marginTop: 80}}>
                    开发一个能够给予使用者学习知识，掌握技能的平台，在未来将由用户自主进行分享和共同构建软件的社区
                </p>

                <Row style={{width: "75%", textAlign: "center", fontSize: "1.3em", margin: "0 auto", marginTop: 100}}>
                    <Col span={8}>
                        <Card bordered={true} style={{height: 150}}>
                            <p><span style={{fontSize: "2em",}}><strong>2015年10月</strong></span> &nbsp;&nbsp;入坑</p>
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card bordered={true} style={{height: 150}}>
                            <p><span style={{fontSize: "2em",}}><strong>即将上线...</strong></span></p>
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card bordered={true} style={{height: 150}}>
                            <p>目前用户数 &nbsp;&nbsp;<span
                                style={{
                                    fontSize: "3em",
                                    textDecoration: "underline",
                                }}><strong>{this.state.userCount}</strong></span></p>
                        </Card>
                    </Col>
                </Row>

                <p style={{textAlign: "center", fontSize: "1.2em", width: "43%", margin: "0 auto", marginTop: 30}}>
                    * 截至{moment(parseInt(this.state.untilDate.getTime())).format('YYYY年MM月')}
                </p>

                <p style={{textAlign: "center", fontSize: "1.2em", width: "43%", margin: "0 auto", marginTop: 60}}>
                    正在努力为用户建立一个真实的 <strong>Hello World</strong>
                </p>

                <Row gutter={48} style={{width: "75%", fontSize: "1.3em", margin: "0 auto", marginTop: 10}}>
                    <Divider/>
                    <Col className="gutter-row" span={12}>
                        <div className="gutter-box">
                            <p><strong><a href={"javascript:;"} style={{color: "#408DD2"}}>创建者</a></strong></p>
                            <p style={{fontSize: "0.8em",}}>HC，2019年7月于江西财经大学毕业，毕业后通过校招进入一家外包公司工作，目标是走技术路，一条路走到黑...</p>
                        </div>
                    </Col>
                    <Col className="gutter-row" span={12}>
                        <div className="gutter-box">
                            <p><strong><a href={"https://littlexiaotimpro.github.io/"} style={{color: "#408DD2"}}>博客</a></strong>
                            </p>
                            <p style={{fontSize: "0.8em",}}>借助Github平台，结合hexo实现了一个简单的博客网页，主要是用来发布文章，总结经验用，了解详情...</p>
                        </div>
                    </Col>
                </Row>
                <Row gutter={48} style={{width: "75%", fontSize: "1.3em", margin: "0 auto", marginTop: 20}}>
                    <Col className="gutter-row" span={12}>
                        <div className="gutter-box">
                            <p><strong><a href={"javascript:;"} style={{color: "#408DD2"}}>事实</a></strong></p>
                            <p style={{fontSize: "0.8em",}}>本站开发的日志展示，让使用者了解本站的开发过程，及其中遇到的问题及解决方法...</p>
                        </div>
                    </Col>
                    <Col className="gutter-row" span={12}>
                        <div className="gutter-box">
                            <p><strong><a href={"javascript:;"} style={{color: "#408DD2"}}>网站状态</a></strong></p>
                            <p style={{fontSize: "0.8em",}}>开发者会致力于不断的完善项目，对网站上线以后，监控其服务状态，在网站出现任何问题时，会在此处优先告知使用者...</p>
                        </div>
                    </Col>
                </Row>

                <Row gutter={48} style={{width: "75%", fontSize: "1.3em", margin: "0 auto", marginTop: 20}}>
                    <Col className="gutter-row" span={12}>
                        <div className="gutter-box">
                            <p><strong><a href={"javascript:;"} style={{color: "#408DD2"}}>关于本站</a></strong></p>
                            <p style={{fontSize: "0.8em",}}>本站作为开发者的毕业设计，作为一个简单的个人性质的网站，用来分享信息，收集数据...</p>
                        </div>
                    </Col>
                </Row>

                <div style={{width: "75%", margin: "0 auto", marginTop: 30}}>
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
                                <p>项目</p>
                                <p><a href={"javascript:;"}>即我（本站）</a></p>
                                <p><a href={"javascript:;"}>模拟农场</a></p>
                                <p><a href={"javascript:;"}>移动电商</a></p>
                            </div>
                        </Col>
                        <Col className="gutter-row" span={4}>
                            <div className="gutter-box">
                                <p>平台</p>
                                <p><a href={"javascript:;"}>暂无</a></p>
                            </div>
                        </Col>
                        <Col className="gutter-row" span={4}>
                            <div className="gutter-box">
                                <p>支持</p>
                                <p><a href={"https://github.com/"}>Github</a></p>
                                <p><a href={"https://ant.design/docs/react/introduce-cn"}>Ant Design</a></p>
                                <p><a href={"javascript:;"}>React系列</a></p>
                                <p><a href={"javascript:;"}>Google</a></p>
                            </div>
                        </Col>
                        <Col className="gutter-row" span={4}>
                            <div className="gutter-box">
                                <p>开发</p>
                                <p><a href={"javascript:;"}>关于</a></p>
                                <p><a href={"javascript:;"}>博客</a></p>
                                <p><a href={"javascript:;"}>联系</a></p>
                            </div>
                        </Col>
                    </Row>
                </div>
                <div style={{width: "100%", height: 50,}}>
                    <p style={{fontSize: "1.2em", textAlign: 'center', padding: 10}}>
                        Copyright ©2019 Hosted by Ant Design and React Create by HC
                    </p>
                </div>
            </div>
        )
    }
}

export default About;