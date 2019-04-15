import React, {Component} from "react";
import axios from "axios";
import {Button, Checkbox, List, Col, Row, Steps, Timeline, Icon} from "antd";
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
            message: [],
            mediaKey: null,
            tags: [],
            cates: [],
            checkedCate: [],
            checkedTag: [],
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
                                                        mediaKey: media.key
                                                    })
                                                }}>{v.caption}</Button>)}
                                                description={v.showtime}/>
                                ))}
                            </Steps>
                            {this.state.mediaKey === media.key ?
                                (<div key={this.state.mediaKey}
                                      className="steps-content">
                                    {this.state.message.length <= 0 ? null :
                                        (<List
                                                itemLayout="vertical"
                                                size="large"
                                                dataSource={this.state.message}
                                                renderItem={item => (
                                                    <List.Item
                                                        key={item.enmedia}
                                                        actions={[item.enarticle === null ?
                                                            <IconText type={"read"} href={item.enarticle}
                                                                      text={"暂无影评"}/> : <span>
                                                                    <a className={"hover-style"} onClick={() => {
                                                                        const _this = this;
                                                                        axios.post("http://localhost:8080/article/primary", {
                                                                            enarticle: item.enarticle
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
                                                                    }><Icon type={"read"}/>&nbsp;&nbsp;{" " + "影评"}</a>
                                                                </span>]}
                                                        extra={<img height={240} alt={item.caption}
                                                                    src={item.imgmedia}/>}
                                                    >
                                                        <List.Item.Meta
                                                            title={item.caption}
                                                            description={"上映时间：" + item.showtime}
                                                        />
                                                        {"简介：" + item.summary}
                                                    </List.Item>
                                                )}
                                            />
                                        )
                                    }
                                </div>) : null}
                        </Timeline.Item>
                    ))}
                </Timeline>
            </div>
        </div>)
    }

}

export default Watch;