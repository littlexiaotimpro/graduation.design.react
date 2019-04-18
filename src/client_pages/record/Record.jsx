import React, {Component} from "react";
import {Icon, List} from "antd";
import axios from "axios";

class Record extends Component {

    render() {
        return (<div>
            <List
                itemLayout="vertical"
                size="large"
                pagination={{
                    onChange: (page) => {
                        console.log(page);
                    },
                    pageSize: 8,
                }}
                dataSource={this.props.location.state.searchResults}
                renderItem={item => (
                    <List.Item
                        key={item.enarticle}
                        actions={[
                            <span>
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
                                }><Icon type={"read"}/>&nbsp;&nbsp;{"  阅读全文"}</a>
                            </span>]}
                    >
                        <List.Item.Meta
                            title={item.title}
                            description={"作者：" + item.author}
                        />
                        {"简介：" + item.summary}
                    </List.Item>
                )}
            /></div>)
    }
}

export default Record;