import React, {Component} from "react";
import axios from "axios";
import {Layout, Menu, Input, Row, Col, Drawer, Divider, Icon, AutoComplete, Dropdown, Avatar, message} from 'antd';
import "./less/tabbar.css";
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import Home from "../home/Home";
import Write from "../write/Write";
import Read from "../read/Read";
import Watch from "../watch/Watch";
import Listen from "../listen/Listen";
import About from "../home/About";
import Contact from "../home/Contact";
import Record from "../record/Record";
import ArticleHtml from "../article/ArticleHtml";

const {Header, Content} = Layout;
const Option = AutoComplete.Option;
const OptGroup = AutoComplete.OptGroup;
const pStyle = {
    fontSize: 16,
    color: 'rgba(0,0,0,0.85)',
    lineHeight: '24px',
    display: 'block',
    marginBottom: 16,
};

const DescriptionItem = ({title, content}) => (
    <div
        style={{
            fontSize: 14,
            lineHeight: '22px',
            marginBottom: 7,
            color: 'rgba(0,0,0,0.65)',
        }}
    >
        <p
            style={{
                marginRight: 8,
                display: 'inline-block',
                color: 'rgba(0,0,0,0.85)',
            }}
        >
            {title}:
        </p>
        {content}
    </div>
);

class TabBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            navbars: [],
            visible: false,
            word: null,
            searchResults: [],
            dataSource: [],
        }
    }

    componentWillMount() {
    }

    componentDidMount() {
        this.getData();
    }

    getData() {
        const _this = this;
        axios.get("http://localhost:8080/navbar/client").then(function (response) {
            _this.setState({
                navbars: response.data,
            })
        }).catch(function (error) {
            console.log(error);
        })
    }

    showDrawer = () => {
        this.setState({
            visible: true,
        });
    };

    onClose = () => {
        this.setState({
            visible: false,
        });
    };

    getDataSaveRecord = () => {
        const _this = this;
        axios.all([axios.post("http://localhost:8080/article/record", {
            keyword: _this.state.word
        }), axios.post("http://localhost:8080/record/save", {
            keyword: _this.state.word
        })])
            .then(axios.spread(function (results, response) {
                console.log(response)
                _this.setState({
                    searchResults: results.data,
                })
            })).catch(function (error) {
            console.log(error)
        })
    }

    handleSearchWord = (value) => {
        this.setState({
            word: value
        })
    }

    handleSearch = (value) => {
        const _this = this;
        axios.post("http://localhost:8080/record/auto", {
            keyword: value
        }).then(function (response) {
            _this.setState({
                dataSource: value ? response.data : [],
            })
        }).catch(function (error) {
            console.log(error)
        })
    }

    renderOption(item) {
        return (
            <Option key={item.keyword} text={item.keyword}>
                {item.keyword}
                <span className="global-search-item-count">约{item.count}个结果</span>
            </Option>
        );
    }

    handleMenuClick = (value) => {
        message.info(value);
    }

    render() {
        const menu = (
            <Menu>
                <Menu.Item key="1"><a
                    href={"/control/login"}><Icon
                    type="setting"/>&nbsp; Controller</a></Menu.Item>
                <Menu.Divider/>
                <Menu.Item key="2" onClick={() => this.handleMenuClick("注销登录")} disabled><Icon
                    type="logout"/>&nbsp;Log
                    out</Menu.Item>
            </Menu>
        );
        return (<Router>
            <div>
                <Layout className="layout">
                    <Header style={{background: "#fff"}}>
                        <div style={{width: "85%", margin: "0 auto"}}>
                            <Menu
                                theme="light"
                                mode="horizontal"
                                defaultSelectedKeys={['home']}
                                style={{lineHeight: '64px', width: "60%", float: "left"}}
                            >
                                {this.state.navbars.map((nav) => (
                                    <Menu.Item key={nav.ennav}>
                                        <Link to={{
                                            pathname: nav.ennav,
                                            state: {
                                                ennav: nav.ennav
                                            }
                                        }}
                                        >{nav.caption}</Link>
                                    </Menu.Item>
                                ))}
                            </Menu>
                            <div className="designer" style={{width: "25%", lineHeight: '64px', float: "left"}}>
                                <AutoComplete
                                    style={{width: "100%"}}
                                    dataSource={this.state.dataSource.map(this.renderOption)}
                                    onSearch={this.handleSearch}
                                    placeholder="输入关键字"
                                    optionLabelProp="text"
                                    onChange={this.handleSearchWord}
                                ><Input
                                    suffix={this.state.word === "" || this.state.word === null ? <Icon
                                        type={"search"}/> : (<Link to={{
                                        pathname: "record",
                                        state: {
                                            searchKey: this.state.word,
                                            searchResults: this.state.searchResults
                                        }
                                    }} className={"search-color"} onClick={this.getDataSaveRecord}><Icon
                                        type={"search"}/></Link>)}/></AutoComplete>
                            </div>
                            <div style={{float: "right"}}>
                                <Dropdown.Button
                                    overlay={menu}
                                >
                                    log in
                                </Dropdown.Button>
                            </div>
                            {/*<div onClick={this.showDrawer} style={{
                            width: 40,
                            height: 40,
                            marginTop: 12,
                            float: "right",
                            }}>
                            <Avatar style={{marginTop: -24, backgroundColor: '#7265e6'}}>斯</Avatar>
                            </div>*/}
                        </div>
                    </Header>
                    <Content style={{padding: '0 50px', background: '#fff',}}>
                        <div style={{width: "85%", margin: "0 auto"}}>
                            <div style={{background: '#fff', marginTop: 30, minHeight: 450}}>
                                <Route path={"/home"} component={Home}/>
                                <Route path={"/writing"} component={Write}/>
                                <Route path={"/reading"} component={Read}/>
                                <Route path={"/watching"} component={Watch}/>
                                <Route path={"/listening"} component={Listen}/>
                                <Route path={"/about"} component={About}/>
                                <Route path={"/contact"} component={Contact}/>
                                <Route path={"/record"} component={Record}/>
                                <Route path={"/readArticle"} component={ArticleHtml}/>
                            </div>
                        </div>
                    </Content>
                </Layout>
                <Drawer
                    width={640}
                    placement="right"
                    closable={false}
                    onClose={this.onClose}
                    visible={this.state.visible}
                >
                    <p style={{...pStyle, marginBottom: 24}}>网站简介</p>
                    <p style={pStyle}>开发者信息</p>
                    <Row>
                        <Col span={12}>
                            <DescriptionItem title="名称" content="XiaoSi"/>{' '}
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <DescriptionItem title="上线日期" content="May 21,2019"/>
                        </Col>
                        <Col span={12}>
                            <DescriptionItem title="网站" content="-"/>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <DescriptionItem
                                title="描述"
                                content="Make things as simple as possible but no simpler."
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <DescriptionItem
                                title="技能"
                                content="Java, spring, mybatis, less/css, JQuery, React"
                            />
                        </Col>
                    </Row>
                    <Divider/>
                    <p style={pStyle}>联系</p>
                    <Row>
                        <Col span={24}>
                            <DescriptionItem title="Email" content="littlexiaosi@gmail.com"/>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <DescriptionItem
                                title="Github"
                                content={(
                                    <a href="https://github.com/littlexiaotimpro">
                                        https://github.com/littlexiaotimpro
                                    </a>
                                )}
                            />
                        </Col>
                    </Row>
                </Drawer>
            </div>
        </Router>)
    }

}

export default TabBar;