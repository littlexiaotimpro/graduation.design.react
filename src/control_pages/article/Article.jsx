import React, {Component} from "react";
import moment from "moment";
import axios from "axios";
import {Button, Table, Select, Drawer, Form, Col, Row, Input, Upload, Icon} from 'antd';

const Option = Select.Option;

class Article extends Component {
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            categories: [],
            chooseCate: "",
            navbars: [],
            chooseNav: "",
            tags: [],
            record: [],
            visible: false,
            fileList: []
        };
        this.columns = [{
            title: 'enArticle',
            dataIndex: 'enarticle',
            width: 130,
        }, {
            title: 'enNav',
            dataIndex: 'ennav',
            width: 130,
            render: (data) => (
                this.state.navbars.map(item => (
                    item.ennav === data ? item.caption : null
                ))
            )
        }, {
            title: 'enCategory',
            dataIndex: 'encategory',
            width: 130,
            render: (data) => (
                this.state.categories.map(item => (
                    item.encategory === data ? item.caption : null
                ))
            )
        }, {
            title: 'enTag',
            dataIndex: 'entag',
            width: 130,
            render: (data) => (
                this.state.tags.map(item => (
                    item.entag === data ? item.caption : null
                ))
            )
        }, {
            title: 'adminID',
            dataIndex: 'adminid',
            width: 130,
        }, {
            title: 'Title',
            dataIndex: 'title',
            width: 150,
        }, {
            title: 'Author',
            dataIndex: 'author',
            width: 130,
        }, {
            title: 'Summary',
            dataIndex: 'summary',
            width: 150,
        }, {
            title: 'fileUrl',
            dataIndex: 'fileurl',
            width: 130,
            render: (data) => <Button type="danger"><a href={data}>下载文件</a></Button>
        }, {
            title: 'readNum',
            dataIndex: 'readnum',
            width: 130,
        }, {
            title: 'Status',
            dataIndex: 'status',
            width: 130,
            render: (data, key) => <Button type="danger" onClick={() => {
                const _this = this;
                axios.post("http://localhost:8080/article/delete", {
                    enarticle: key.enarticle,
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
            render: (record) => <Button type="primary" onClick={() => this.showDrawer(record)}>编辑</Button>,
        }];
    }

    showDrawer(record) {
        this.props.form.setFieldsValue({
            adminid: record.adminid,
            title: record.title,
            enarticle: record.enarticle,
            encategory: record.encategory,
            ennav: record.ennav,
            entag: record.entag,
            author: record.author,
            status: record.status,
            summary: record.summary,
            fileurl: record.fileurl
        });
        this.setState({
            visible: true,
            record: record,
            chooseNav: record.ennav,
            chooseCate: record.encategory,
            fileList: [{
                uid: '-1',
                name: record.title,
                status: 'done',
                url: record.fileurl,
            }]
        });
    };

    saveArticle = () => {
        this.setState({
            visible: true,
        });
    };

    onClose = () => {
        this.setState({
            visible: false,
        });
    };

    handleSubmit = (e) => {
        const _this = this;
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                _this.state.fileList.map((file) => {
                    values.fileurl = file.response;
                    return null;
                })
                const newData = [...this.state.articles];
                let key = values.enarticle;
                const index = newData.findIndex(item => key === item.key);
                if (index > -1) {
                    // update
                    axios.post("http://localhost:8080/article/update", values, {
                        // 单独配置
                        withCredentials: true
                    })
                        .then(function (response) {
                            _this.setState({
                                visible: false,
                            });
                            alert(response.data.msg);
                            if (response.data.code === 1) {
                                _this.getData();
                            }
                        }).catch(function (error) {
                        console.log(error);
                    })
                } else {
                    // save
                    axios.post("http://localhost:8080/article/save", values, {
                        // 单独配置
                        withCredentials: true
                    })
                        .then(function (response) {
                            _this.setState({
                                visible: false,
                            });
                            alert(response.data.msg);
                            if (response.data.code === 1) {
                                _this.getData();
                            }
                        }).catch(function (error) {
                        console.log(error);
                    });
                }
            }
        });
    };

    handleChange = (file) => {
        this.setState({
            fileList: file.fileList
        })
    }


    getData() {
        const _this = this;
        axios.all([axios.get("http://localhost:8080/article/control"),
            axios.get("http://localhost:8080/category/caption"),
            axios.get("http://localhost:8080/navbar/caption"),
            axios.get("http://localhost:8080/tags/caption")])
            .then(axios.spread(function (articles, cate, nav, tag) {
                // console.log(articles);
                // console.log(cate);
                // console.log(tag);
                // console.log(nav);
                let values = [];
                for (let i = 0; i < articles.data.length; i++) {
                    articles.data[i].key = articles.data[i].enarticle;
                    values.push(articles.data[i]);
                }
                let cates = [];
                for (let i = 0; i < cate.data.length; i++) {
                    cate.data[i].key = cate.data[i].encategory;
                    cates.push(cate.data[i]);
                }
                let tagss = [];
                for (let i = 0; i < tag.data.length; i++) {
                    tag.data[i].key = tag.data[i].entag;
                    tagss.push(tag.data[i]);
                }
                let navs = [];
                for (let i = 0; i < nav.data.length; i++) {
                    nav.data[i].key = nav.data[i].ennav;
                    navs.push(nav.data[i]);
                }
                _this.setState({
                    articles: values,
                    categories: cates,
                    navbars: navs,
                    tags: tagss,
                })
            })).catch(function (error) {
            console.log(error);
        });
    }

    componentWillMount() {
    }

    componentDidMount() {
        this.getData();
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        const {fileList} = this.state;
        const uploadButton = (
            <Button>
                <Icon type="upload"/> 点击上传
            </Button>
        );
        const saveButton = (
            <Button type="primary" onClick={this.saveArticle}>
                <Icon type={"plus"}/>新增
            </Button>
        );
        return (<div>
            <Table
                bordered
                dataSource={this.state.articles}
                columns={this.columns}
                scroll={{x: 1950}}
            />
            {this.state.articles.length === 0 ? saveButton : null}
            <Drawer
                title="Create or Update"
                width={420}
                onClose={this.onClose}
                visible={this.state.visible}
                style={{
                    overflow: 'auto',
                    height: 'calc(100% - 108px)',
                    paddingBottom: '108px',
                }}
            >
                <Form layout="vertical" hideRequiredMark>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item label="enArticle">
                                {getFieldDecorator('enarticle', {
                                    rules: [{required: false, message: '请输入关联文章标识'}],
                                    initialValue: this.state.record.enarticle,
                                })(<Input placeholder="请输入关联文章标识"/>)}
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="adminID">
                                {getFieldDecorator('adminid', {
                                    rules: [{required: true, message: '上传者'}],
                                    initialValue: this.state.record.adminid,
                                })(<Input placeholder="上传者"/>)}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={8}>
                            <Form.Item label="enNavbar">
                                {getFieldDecorator('ennav', {
                                    rules: [{required: true, message: '选择导航'}],
                                    initialValue: this.state.record.ennav,
                                })(
                                    <Select placeholder="选择导航" onChange={(value) => {
                                        this.setState({
                                            chooseNav: value
                                        })
                                    }}>
                                        {this.state.navbars.map((nav) => (
                                            <Option key={nav.ennav} value={nav.ennav}>{nav.caption}</Option>
                                        ))}
                                    </Select>
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="enCategory">
                                {getFieldDecorator('encategory', {
                                    rules: [{required: true, message: '选择类别'}],
                                    initialValue: this.state.record.encategory,
                                })(
                                    <Select placeholder="选择类别" onChange={(value) => {
                                        this.setState({
                                            chooseCate: value
                                        })
                                    }}>
                                        {this.state.categories.map((cate) => (
                                            cate.ennav === this.state.chooseNav ?
                                                <Option key={cate.encategory}
                                                        value={cate.encategory}>{cate.caption}</Option> : null
                                        ))}
                                    </Select>
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="enTag">
                                {getFieldDecorator('entag', {
                                    rules: [{required: false, message: '选择标签'}],
                                    initialValue: this.state.record.entag,
                                })(
                                    <Select placeholder="选择标签">
                                        {this.state.tags.map((tag) => (
                                            tag.encategory === this.state.chooseCate ?
                                                <Option key={tag.entag} value={tag.entag}>{tag.caption}</Option> : null
                                        ))}
                                    </Select>
                                )}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            {/*<div className="picture-style">*/}
                            {/*<FileInput data={this.state.record}/>*/}
                            {/*</div>*/}
                            <div className="clearfix" style={{marginBottom: 30}}>
                                <Upload
                                    action="http://localhost:8080/article/file"
                                    data={{
                                        category: this.state.record.encategory,
                                        articleUrl: this.file
                                    }}
                                    withCredentials={true}
                                    fileList={fileList}
                                    onChange={this.handleChange}
                                >
                                    {fileList.length >= 1 ? null : uploadButton}
                                </Upload>
                            </div>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item label="Title">
                                {getFieldDecorator('title', {
                                    rules: [{required: true, message: '输入名称'}],
                                    initialValue: this.state.record.title,
                                })(<Input placeholder="输入名称"/>)}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item label="Author">
                                {getFieldDecorator('author', {
                                    rules: [{required: true, message: '输入作者'}],
                                    initialValue: this.state.record.author,
                                })(<Input placeholder="输入作者"/>)}
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Status">
                                {getFieldDecorator('status', {
                                    rules: [{required: true, message: '选择状态'}],
                                    initialValue: this.state.record.status,
                                })(
                                    <Select>
                                        <Option key={1} value={1}>启用</Option>
                                        <Option key={0} value={0}>禁用</Option>
                                    </Select>
                                )}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item label="Summary">
                                {getFieldDecorator('summary', {
                                    rules: [
                                        {
                                            required: true,
                                            message: '添加描述',
                                        },
                                    ],
                                    initialValue: this.state.record.summary,
                                })(<Input.TextArea rows={4} placeholder="添加描述"/>)}
                            </Form.Item>
                        </Col>
                    </Row>
                    <div
                        style={{
                            position: 'absolute',
                            left: 0,
                            bottom: 0,
                            width: '100%',
                            borderTop: '1px solid #e9e9e9',
                            padding: '10px 16px',
                            background: '#fff',
                            textAlign: 'right',
                        }}
                    >
                        <Button onClick={this.onClose} style={{marginRight: 8}}>
                            取消
                        </Button>
                        <Button onClick={this.handleSubmit} type="primary">
                            提交
                        </Button>
                    </div>
                </Form>
            </Drawer>
        </div>)
    }
}

export default Form.create()(Article);