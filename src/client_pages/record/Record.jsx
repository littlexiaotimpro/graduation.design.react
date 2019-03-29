import React, {Component} from "react";

class Record extends Component {

    render() {
        return (<div><h1>关键字：{this.props.location.state.searchKey}，
            搜索结果：{this.props.location.state.searchResults.length}条</h1></div>)
    }
}

export default Record;