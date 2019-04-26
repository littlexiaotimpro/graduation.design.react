import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import {Layout, Menu, Icon, Avatar, Popover, Card,} from 'antd';
import moment from "moment";
import axios from "axios";
import "./less/Siderbar.css";
import Navbar from "../navbar/Navbar";
import Category from "../category/Category";
import Tags from "../tags/Tags";
import Media from "../media/Media";
import Book from "../book/Book";
import Music from "../music/Music";
import Article from "../article/Article";
import Record from "../record/Record";
import Log from "../logs/Log";

const {
    Header, Content, Sider,
} = Layout;

const AdminShow = ({title, adminTime, changeOperator, logout}) => (
    <div>
        <Card
            style={{width: 300}}
            actions={[<span onClick={changeOperator}>切换管理员</span>, <span onClick={logout}>退出</span>,
                <Icon type="ellipsis"/>]}
        >
            <Card.Meta
                title={"管理员：" + title}
                description={"当前时间：" + moment(parseInt(adminTime)).format('YYYY-MM-DD HH:mm:ss')}
            />
        </Card>
    </div>
);

class Siderbar extends Component {

    constructor(props) {
        super(props)
        this.state = {
            collapsed: false,
            entity: "Navbar",
            date: new Date()
        }
    }

    onCollapse = (collapsed) => {
        this.setState({collapsed});
    }

    componentWillMount() {
        this.timer = setInterval(() => {
            this.setState({date: new Date()})
        }, 1000)
    }

    componentDidMount() {
    }

    componentWillUnmount() {
        clearInterval(this.timer)
    }

    getEntity(value) {
        this.setState({
            entity: value
        })
    }

    changeOperator = () => {
        alert("暂不支持");
    }

    logout = () => {
        const _this = this;
        axios.get("http://localhost:8080/admin/logout", {
            // 单独配置
            withCredentials: true
        }).then(function (response) {
            if (response.data.code === 0) {
                alert(response.data.msg);
            } else {
                _this.props.history.push("/control/login");
            }
        }).catch(function (error) {
            console.log(error);
        })
    }

    render() {
        return <Router>
            <div>
                <Layout>
                    <Sider style={{
                        minHeight: '100vh',
                        position: 'fixed',
                        left: 0,
                    }}
                           collapsible
                           collapsed={this.state.collapsed}
                           onCollapse={this.onCollapse}
                    >
                        <div className="logo">
                            <Popover placement="rightTop" title={<span>管理员信息</span>}
                                     content={<AdminShow title={"暂未实现"}
                                                         adminTime={this.state.date.getTime()}
                                                         changeOperator={this.changeOperator}
                                                         logout={this.logout}/>}
                                     trigger="hover">
                                <Avatar style={{backgroundColor: '#7265e6'}} className="avatar" size={64}></Avatar>
                            </Popover>
                        </div>
                        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                            <Menu.Item key="1">
                                <Icon type="link"/>
                                <span onClick={this.getEntity.bind(this, "Navbar")} className="nav-text">
                                    <Link className="tab-style" to={"/control/navbar"}>Navbar</Link>
                                </span>
                            </Menu.Item>
                            <Menu.Item key="2">
                                <Icon type="link"/>
                                <span onClick={this.getEntity.bind(this, "Category")} className="nav-text">
                                    <Link className="tab-style" to={"/control/category"}>Category</Link>
                                </span>
                            </Menu.Item>
                            <Menu.Item key="3">
                                <Icon type="link"/>
                                <span onClick={this.getEntity.bind(this, "Tags")} className="nav-text">
                                    <Link className="tab-style" to={"/control/tags"}>Tags</Link>
                                </span>
                            </Menu.Item>
                            <Menu.Item key="4">
                                <Icon type="link"/>
                                <span onClick={this.getEntity.bind(this, "Book")} className="nav-text">
                                    <Link className="tab-style" to={"/control/book"}>Book</Link>
                                </span>
                            </Menu.Item>
                            <Menu.Item key="5">
                                <Icon type="link"/>
                                <span onClick={this.getEntity.bind(this, "Media")} className="nav-text">
                                    <Link className="tab-style" to={"/control/media"}>Media</Link>
                                </span>
                            </Menu.Item>
                            <Menu.Item key="6">
                                <Icon type="link"/>
                                <span onClick={this.getEntity.bind(this, "Music")} className="nav-text">
                                    <Link className="tab-style" to={"/control/music"}>Music</Link>
                                </span>
                            </Menu.Item>
                            <Menu.Item key="7">
                                <Icon type="link"/>
                                <span onClick={this.getEntity.bind(this, "Article")} className="nav-text">
                                    <Link className="tab-style" to={"/control/article"}>Article</Link>
                                </span>
                            </Menu.Item>
                            <Menu.Item key="8">
                                <Icon type="link"/>
                                <span onClick={this.getEntity.bind(this, "Record")} className="nav-text">
                                    <Link className="tab-style" to={"/control/record"}>Record</Link>
                                </span>
                            </Menu.Item>
                            <Menu.Item key="9">
                                <Icon type="link"/>
                                <span onClick={this.getEntity.bind(this, "log")} className="nav-text">
                                    <Link className="tab-style" to={"/control/log"}>日志管理</Link>
                                </span>
                            </Menu.Item>
                        </Menu>
                    </Sider>
                    <Layout style={{marginLeft: 200}}>
                        <Header style={{background: '#fff', padding: 0, textAlign: 'center'}}>
                            <h3>{this.state.entity === "log" ? "日志管理" : this.state.entity + "实体的数据管理"}</h3>
                        </Header>
                        <Content style={{margin: '18px 16px 0', overflow: 'initial'}}>
                            <div style={{
                                padding: 16,
                                background: '#fff',
                                textAlign: 'center',
                            }}>
                                <Route exact path={"/control/navbar"} component={Navbar}/>
                                <Route path={"/control/category"} component={Category}/>
                                <Route path={"/control/tags"} component={Tags}/>
                                <Route path={"/control/book"} component={Book}/>
                                <Route path={"/control/media"} component={Media}/>
                                <Route path={"/control/music"} component={Music}/>
                                <Route path={"/control/article"} component={Article}/>
                                <Route path={"/control/record"} component={Record}/>
                                <Route path={"/control/log"} component={Log}/>
                            </div>
                        </Content>
                    </Layout>
                </Layout>
            </div>
        </Router>
    }
}

export default Siderbar;