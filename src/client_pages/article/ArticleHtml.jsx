import React, {Component} from "react";
import "./themes/vue.css";
import "./less/imgStyle.css";

class ArticleHtml extends Component {
    render() {
        return (
            <div dangerouslySetInnerHTML={{__html: this.props.location.state.htmlData}}/>
        )
    }
}

export default ArticleHtml;