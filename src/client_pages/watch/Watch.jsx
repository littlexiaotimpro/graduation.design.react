import React, {Component} from "react";
import axios from "axios";
import {Button, Checkbox, Col, Row, Steps, Timeline, Icon, Modal, Divider, Input, Tooltip} from "antd";
import "./less/watch.css";

const IconText = ({type, text, href}) => (
    <span>
        <a className={"hover-style"} href={href}><Icon type={type}/>&nbsp;&nbsp;{" " + text}</a>
    </span>
);

class Watch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            medias: [],
            message: null,
            mediaKey: null,
            tags: [],
            cates: [],
            checkedCate: [],
            checkedTag: [],
            visible: false,
        }
    }

    componentWillMount() {
    }

    componentDidMount() {
        this.getData("marvel", null);
        this.getCategory();
    }

    getData(cate, tag) {
        const _this = this;
        axios.post("http://localhost:8080/media/client", {
            encategory: cate,
            entag: tag,
        }).then(function (response) {
            _this.setState({
                medias: response.data
            })
        }).catch(function (error) {
            console.log(error);
        })
    }

    getCategory = () => {
        const _this = this;
        axios.post("http://localhost:8080/category/client", {
            ennav: _this.props.location.state.ennav
        }).then(function (response) {
            let v = [];
            v.push(response.data.length <= 0 ? '' : response.data[0].encategory);
            _this.setState({
                cates: response.data,
                checkedCate: v,
                checkedTag: [],
            });
            _this.getTags(response.data.length <= 0 ? '' : response.data[0].encategory);
        }).catch(function (error) {
            console.log(error);
        })
    }

    getTags = (value) => {
        const _this = this;
        axios.post("http://localhost:8080/tags/client", {
            encategory: value
        }).then(function (response) {
            _this.setState({
                tags: response.data
            })
        }).catch(function (error) {
            console.log(error);
        })
    }

    onCateChecked = (e) => {
        let value = [];
        value.push(e.target.value)
        this.setState({
            checkedCate: value,
            checkedTag: [],
            mediaKey: null,
        })
        this.getTags(e.target.value);
        this.getData(e.target.value, null);
    }

    onTagChecked = (e) => {
        let value = [];
        value.push(e.target.value)
        this.setState({
            checkedTag: value
        })
        this.getData(this.state.checkedCate[0], e.target.value);
    }

    onChange = (checkedValues) => {
        console.log(checkedValues);
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    }

    handleCancel = () => {
        this.setState({
            visible: false,
        });
    }

    render() {
        return (<div>
            {this.state.checkedCate.length === 0 ? null : (
                <Checkbox.Group value={this.state.checkedCate}
                                style={{width: '100%',}}
                                onChange={this.onChange}>
                    <Row>
                        {this.state.cates.map((c) => (
                            <Col key={c.encategory} span={2}><Checkbox
                                value={c.encategory}
                                onChange={this.onCateChecked}>{c.caption}</Checkbox></Col>
                        ))}
                    </Row>
                </Checkbox.Group>
            )}
            {this.state.tags.length === 0 ? null : (
                <Checkbox.Group
                    value={this.state.checkedTag}
                    style={{width: '100%', marginTop: 30}}
                >
                    <Row>
                        {this.state.tags.map((t) => (
                            <Col key={t.entag} span={2}><Checkbox
                                value={t.entag}
                                onChange={this.onTagChecked}>{t.caption}</Checkbox></Col>
                        ))}
                    </Row>
                </Checkbox.Group>
            )}
            <div className={"books-box"} style={{marginTop: 40, marginBottom: 30}}>
                <Timeline>
                    {this.state.medias.map((media) => (
                        <Timeline.Item key={media.key}>
                            <Steps size="small" style={{width: "80%"}} current={0}>
                                <Steps.Step title={media.key}/>
                                {media.value.map((v) => (
                                    <Steps.Step key={v.enmedia}
                                                title={(<Button className={"media-focus"} onClick={() => {
                                                    let data = [];
                                                    data.push(v);
                                                    this.setState({
                                                        message: data,
                                                        visible: true,
                                                        mediaKey: media.key
                                                    })
                                                }}>{v.caption}</Button>)}
                                                description={v.showtime}/>
                                ))}
                            </Steps>
                            {this.state.mediaKey === media.key ?
                                this.state.message === null ? null :
                                    (<Modal
                                        title="电影介绍"
                                        key={this.state.mediaKey}
                                        visible={this.state.visible}
                                        footer={<Row>
                                            <Col span={24} className={"media-download"}>
                                                <div>
                                                    <Button href={this.state.message[0].bluray720}
                                                            className={"media-down"}>BluRay 720P</Button>
                                                    <Input
                                                        className={"media-magnet"}
                                                        value={this.state.message[0].bluray720}
                                                        suffix={
                                                            <Tooltip title="可能会有版权受限问题">
                                                                <Icon type="info-circle"
                                                                      style={{color: 'rgba(0,0,0,.45)'}}/>
                                                            </Tooltip>
                                                        }
                                                    />
                                                </div>
                                                <div>
                                                    <Button href={this.state.message[0].bluray1080}
                                                            className={"media-down"}>BluRay 1080P</Button>
                                                    <Input
                                                        className={"media-magnet"}
                                                        value={this.state.message[0].bluray1080}
                                                        suffix={
                                                            <Tooltip title="可能会有版权受限问题">
                                                                <Icon type="info-circle"
                                                                      style={{color: 'rgba(0,0,0,.45)'}}/>
                                                            </Tooltip>
                                                        }
                                                    />
                                                </div>
                                                <div>
                                                    <Button href={this.state.message[0].bluraydisk}
                                                            className={"media-down"}>BluRay 原盘</Button>
                                                    <Input
                                                        className={"media-magnet"}
                                                        value={this.state.message[0].bluraydisk}
                                                        suffix={
                                                            <Tooltip title="可能会有版权受限问题">
                                                                <Icon type="info-circle"
                                                                      style={{color: 'rgba(0,0,0,.45)'}}/>
                                                            </Tooltip>
                                                        }
                                                    />
                                                </div>
                                            </Col>
                                        </Row>}
                                        onCancel={this.handleCancel}
                                    >
                                        <Row gutter={6}>
                                            <Col span={10}>
                                                <img style={{float: "right"}} height={240}
                                                     src={this.state.message[0].imgmedia}/>
                                            </Col>
                                            <Col span={2}>
                                                <Divider style={{border: "1px", height: 240}} type="vertical"/>
                                            </Col>
                                            <Col span={12}>
                                                <p><span style={{
                                                    fontSize: "1.5em",
                                                    fontWeight: 2
                                                }}>{this.state.message[0].caption}</span></p>
                                                <p>上映时间：{this.state.message[0].showtime}</p>
                                                <p style={{height: 110,}}>简介：{this.state.message[0].summary}</p>
                                                <p>
                                                    <a href={"javascript:;"}
                                                       onClick={() => {
                                                           const _this = this;
                                                           if (_this.state.message[0].enarticle != null) {
                                                               axios.post("http://localhost:8080/article/primary", {
                                                                   enarticle: _this.state.message[0].enarticle
                                                               }).then(function (response) {
                                                                   _this.props.history.push({
                                                                       pathname: "readArticle",
                                                                       state: {
                                                                           htmlData: response.data,
                                                                       }
                                                                   })
                                                               }).catch(function (error) {
                                                                   console.log(error)
                                                               })
                                                           }
                                                       }
                                                       }>
                                                        影评
                                                    </a>
                                                </p>
                                            </Col>
                                        </Row>
                                    </Modal>)
                                : null}
                        </Timeline.Item>
                    ))}
                </Timeline>
            </div>
        </div>)
    }

}

export default Watch;