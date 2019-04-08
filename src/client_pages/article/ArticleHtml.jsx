import React, {Component} from "react";
import "./themes/vue.css";

class ArticleHtml extends Component {
    render() {
        return (
            <div dangerouslySetInnerHTML={{__html: this.props.location.state.htmlData}}/>
        )
    }
}

export default ArticleHtml;