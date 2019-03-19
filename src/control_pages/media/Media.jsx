import React, {Component} from "react";
import moment from "moment";
import axios from "axios";
import {Button, Table, Select, Drawer, Form, Col, Row, Input, Upload, Modal, Icon} from 'antd';
import "./less/Media.css";

const Option = Select.Option;

class Media extends Component {
    constructor(props) {
        super(props);
        this.state = {
            medias: [],
            categories: [],
            navbars: [],
            tags: [],
            record: [],
            visible: false,
            previewVisible: false,
            previewImage: '',
            fileList: []
        };
        this.columns = [{
            title: 'enMedia',
            dataIndex: 'enmedia',
            width: 100,
        }, {
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
            title: 'IMGMedia',
            dataIndex: 'imgmedia',
            width: 130,
            render: (data, imgs) => <img src={data} alt={imgs.caption} style={{width: 97}}/>
        }, {
            title: 'Caption',
            dataIndex: 'caption',
            width: 130,
        }, {
            title: 'ShowTime',
            dataIndex: 'showtime',
            width: 130,
        }, {
            title: 'Summary',
            dataIndex: 'summary',
            width: 130,
        }, {
            title: 'Status',
            dataIndex: 'status',
            width: 130,
            render: (data, key) => <Button type="danger" onClick={() => {
                const _this = this;
                axios.post("http://localhost:8080/media/delete", {
                    enmedia: key.enmedia,
                    status: key.status === 1 ? 0 : 1
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
            caption: record.caption,
            enarticle: record.enarticle,
            encategory: record.encategory,
            enmedia: record.enmedia,
            ennav: record.ennav,
            entag: record.entag,
            showtime: record.showtime,
            status: record.status,
            summary: record.summary
        });
        this.setState({
            visible: true,
            record: record,
            fileList: [{
                uid: '-1',
                name: record.caption,
                status: 'done',
                url: record.imgmedia,
            }]
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
                _this.state.fileList.map((img) => {
                    values.imgmedia = img.response;
                    return null;
                })
                const newData = [...this.state.medias];
                let key = values.enmedia;
                const index = newData.findIndex(item => key === item.key);
                if (index > -1) {
                    // update
                    axios.post("http://localhost:8080/media/update", values)
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
                    axios.post("http://localhost:8080/media/save", values)
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

    handleChange = (e) => {
        e.preventDefault();
    }

    handleCancel = () => this.setState({previewVisible: false})

    handlePreview = (file) => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
    }

    handleChange = (file) => {
        this.setState({
            fileList: file.fileList
        })
    }


    getData() {
        const _this = this;
        axios.all([axios.get("http://localhost:8080/media/control"),
            axios.get("http://localhost:8080/category/caption"),
            axios.get("http://localhost:8080/navbar/caption"),
            axios.get("http://localhost:8080/tags/caption")])
            .then(axios.spread(function (medias, cate, nav, tag) {
                // console.log(medias);
                // console.log(cate);
                // console.log(tag);
                // console.log(nav);
                let values = [];
                for (let i = 0; i < medias.data.length; i++) {
                    medias.data[i].key = medias.data[i].enmedia;
                    values.push(medias.data[i]);
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
                    medias: values,
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
        const {previewVisible, previewImage, fileList} = this.state;
        const uploadButton = (
            <div>
                <Icon type="plus"/>
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        return (<div>
            <Table
                bordered
                dataSource={this.state.medias}
                columns={this.columns}
                pagination={{
                    pageSize: 10,
                    onChange: this.cancel,
                }}
                scroll={{x: 1800, y: 320}}
            />
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
                            <Form.Item label="enMedia">
                                {getFieldDecorator('enmedia', {
                                    rules: [{required: true, message: '请输入主键'}],
                                    initialValue: this.state.record.enmedia,
                                })(<Input placeholder="请输入主键"/>)}
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="enArticle">
                                {getFieldDecorator('enarticle', {
                                    rules: [{required: false, message: '请输入关联文章标识'}],
                                    initialValue: this.state.record.enarticle,
                                })(<Input placeholder="请输入关联文章标识"/>)}
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
                                    <Select placeholder="选择导航">
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
                                    <Select placeholder="选择类别">
                                        {this.state.categories.map((cate) => (
                                            cate.ennav === "watching" ?
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
                                            tag.encategory === "marvel" ?
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
                            <div className="clearfix">
                                <Upload
                                    action="http://localhost:8080/media/img"
                                    listType="picture-card"
                                    data={{
                                        category: this.state.record.encategory,
                                        imgmedia: this.file
                                    }}
                                    fileList={fileList}
                                    onPreview={this.handlePreview}
                                    onChange={this.handleChange}
                                >
                                    {fileList.length >= 1 ? null : uploadButton}
                                </Upload>
                                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                                    <img alt="example" style={{width: '100%'}} src={previewImage}/>
                                </Modal>
                            </div>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item label="adminID">
                                {getFieldDecorator('adminid', {
                                    rules: [{required: true, message: '上传者'}],
                                    initialValue: this.state.record.adminid,
                                })(<Input placeholder="上传者"/>)}
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Caption">
                                {getFieldDecorator('caption', {
                                    rules: [{required: true, message: '输入名称'}],
                                    initialValue: this.state.record.caption,
                                })(<Input placeholder="输入名称"/>)}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item label="ShowTime">
                                {getFieldDecorator('showtime', {
                                    rules: [{required: true, message: '输入上映时间'}],
                                    initialValue: this.state.record.showtime,
                                })(<Input placeholder="输入上映时间"/>)}
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

export default Form.create()(Media);