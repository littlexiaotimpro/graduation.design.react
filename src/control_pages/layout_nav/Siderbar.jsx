import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import {Layout, Menu, Icon, Avatar} from 'antd';
import "bootstrap/dist/css/bootstrap.css";
import "./less/Siderbar.css";
import Navbar from "../navbar/Navbar";
import Category from "../category/Category";
import Tags from "../tags/Tags";
import Media from "../media/Media";
import Book from "../book/Book";
import Music from "../music/Music";

const {
    Header, Content, Footer, Sider,
} = Layout;

class Siderbar extends Component {

    constructor(props) {
        super(props)
        this.state = {
            collapsed: false,
            entity: "Navbar"
        }
    }

    onCollapse = (collapsed) => {
        this.setState({collapsed});
    }

    componentWillMount() {
    }

    componentDidMount() {
    }

    getEntity(value) {
        this.setState({
            entity: value
        })
    }

    render() {
        return <Router>
            <div>
                <Layout>
                    <Sider style={{
                        minHeight: '100vh',
                    }}
                           collapsible
                           collapsed={this.state.collapsed}
                           onCollapse={this.onCollapse}
                    >
                        <div className="logo">
                            <Avatar style={{backgroundColor: '#7265e6'}} className="avatar" size={64}></Avatar>
                        </div>
                        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                            <Menu.Item key="1">
                                <Icon type="link"/>
                                <span onClick={this.getEntity.bind(this, "Navbar")} className="nav-text">
                                    <Link className="tab-style" to={"navbar"}>Navbar</Link>
                                </span>
                            </Menu.Item>
                            <Menu.Item key="2">
                                <Icon type="link"/>
                                <span onClick={this.getEntity.bind(this, "Category")} className="nav-text">
                                    <Link className="tab-style" to={"category"}>Category</Link>
                                </span>
                            </Menu.Item>
                            <Menu.Item key="3">
                                <Icon type="link"/>
                                <span onClick={this.getEntity.bind(this, "Tags")} className="nav-text">
                                    <Link className="tab-style" to={"tags"}>Tags</Link>
                                </span>
                            </Menu.Item>
                            <Menu.Item key="4">
                                <Icon type="link"/>
                                <span onClick={this.getEntity.bind(this, "Book")} className="nav-text">
                                    <Link className="tab-style" to={"book"}>Book</Link>
                                </span>
                            </Menu.Item>
                            <Menu.Item key="5">
                                <Icon type="link"/>
                                <span onClick={this.getEntity.bind(this, "Media")} className="nav-text">
                                    <Link className="tab-style" to={"media"}>Media</Link>
                                </span>
                            </Menu.Item>
                            <Menu.Item key="6">
                                <Icon type="link"/>
                                <span onClick={this.getEntity.bind(this, "Music")} className="nav-text">
                                    <Link className="tab-style" to={"music"}>Music</Link>
                                </span>
                            </Menu.Item>
                            <Menu.Item key="7">
                                <Icon type="link"/>
                                <span onClick={this.getEntity.bind(this, "Article")} className="nav-text">
                                    <Link className="tab-style" to={"music"}>Article</Link>
                                </span>
                            </Menu.Item>
                            <Menu.Item key="8">
                                <Icon type="link"/>
                                <span onClick={this.getEntity.bind(this, "Record")} className="nav-text">
                                    <Link className="tab-style" to={"record"}>Record</Link>
                                </span>
                            </Menu.Item>
                        </Menu>
                    </Sider>
                    <Layout>
                        <Header style={{background: '#fff', padding: 0, textAlign: 'center'}}>
                            <h3>{this.state.entity}实体的数据管理</h3>
                        </Header>
                        <Content style={{margin: '18px 16px 0', overflow: 'initial'}}>
                            <div style={{
                                padding: 16,
                                background: '#fff',
                                textAlign: 'center',
                            }}>
                                <Route exact path={"/navbar"} component={Navbar}/>
                                <Route path={"/category"} component={Category}/>
                                <Route path={"/tags"} component={Tags}/>
                                <Route path={"/book"} component={Book}/>
                                <Route path={"/media"} component={Media}/>
                                <Route path={"/music"} component={Music}/>
                                <Route path={"/article"} component={Navbar}/>
                                <Route path={"/record"} component={Navbar}/>
                            </div>
                        </Content>
                        <Footer style={{textAlign: 'center'}}>
                            Copyright ©2019 Hosted by Ant Design and React Create by HC
                        </Footer>
                    </Layout>
                </Layout>
            </div>
        </Router>
    }
}

export default Siderbar;