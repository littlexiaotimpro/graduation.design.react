import React, {Component} from "react";
import axios from "axios";
import {Checkbox, Col, Row} from "antd";

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
        this.getData(null, null);
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
                <div className={"books-box"}>
                    {this.state.books.map((book) => (
                        <div key={book.enbook}>{book.caption}</div>
                    ))}
                </div>
            </div>
        )
    }
}

export default Read;