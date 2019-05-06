import React, {Component} from "react";
import "./themes/vue.css";
import "./less/imgStyle.css";
import {BackTop} from "antd";

class ArticleHtml extends Component {
    render() {
        return (<div>
                <BackTop />
                <div dangerouslySetInnerHTML={{__html: this.props.location.state.htmlData}}/>
            </div>
        )
    }
}

export default ArticleHtml;