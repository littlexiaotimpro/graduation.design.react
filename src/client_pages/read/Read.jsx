import React, {Component} from "react";
import axios from "axios";
import {Avatar, Checkbox, Col, Icon, List, Row} from "antd";

const IconText = ({type, text}) => (
    <span>
    <Icon type={type} style={{marginRight: 8}}/>
        {text}
  </span>
);

class Read extends Component {

    constructor(props) {
        super(props);
        this.state = {
            books: [],
            tags: [],
            cates: [],
            checkedCate: [],
            checkedTag: [],
        }
    }

    componentWillMount() {
    }

    componentDidMount() {
        this.getData("books", null);
        this.getCategory();
    }

    getData(cate, tag) {
        const _this = this;
        axios.post("http://localhost:8080/book/client", {
            encategory: cate,
            entag: tag,
        }).then(function (response) {
            _this.setState({
                books: response.data
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
                checkedTag: []
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
            checkedTag: []
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
                <div className={"books-box"} style={{marginTop: 30, marginBottom: 30}}>
                    <List
                        itemLayout="vertical"
                        size="large"
                        pagination={{
                            onChange: (page) => {
                                console.log(page);
                            },
                            pageSize: 3,
                        }}
                        dataSource={this.state.books}
                        renderItem={item => (
                            <List.Item
                                key={item.caption}
                                actions={[<IconText type="star-o" text="156"/>, <IconText type="like-o" text="156"/>,
                                    <IconText type="message" text="2"/>]}
                                extra={<img width={200} alt={item.caption}
                                            src={item.imgbook}/>}
                            >
                                <List.Item.Meta
                                    avatar={<Avatar
                                        src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>}
                                    title={<a href={item.address}>{item.caption}</a>}
                                    description={item.author}
                                />
                                {item.summary}
                            </List.Item>
                        )}
                    />
                </div>
            </div>
        )
    }
}

export default Read;