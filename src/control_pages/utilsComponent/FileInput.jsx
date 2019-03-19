import React, {Component} from "react";
import axios from "axios";
import {Col, Icon, Input, Row} from 'antd';
import "./less/fileInput.css";

/**
 * 上传图片的公共组件
 * 上传之后提供预览缩略图
 * 主要包含两部分：预览块，按钮块
 */
class FileInput extends Component {

    constructor(props) {
        super(props);
        this.state = {
            uploadStatus: false,
        }
    }

    render() {

        const uploadButton = (
            <div className={"upload-btn"}>
                <input ref="files" onChange={() => {
                    const file = this.refs.files.files[0];
                    const reader = new FileReader();
                    reader.readAsDataURL(file);
                    console.log(reader);
                    axios.post("http://localhost:8080/media/img", {
                        encategory: this.props.data.encategory,
                        imgmedia: "aaaaa"
                    }).then(function (response) {
                        console.log(response.data);
                    }).catch(function (error) {
                        console.log(error);
                    })
                }} type={"file"}/>
                选择上传
            </div>
        );

        return (<div>
            <Row gutter={16}>
                <Col span={11}>
                    <img src={this.props.data.imgmedia} width={130}/>
                </Col>
                <Col span={2}>
                    <Icon style={{
                        fontSize: 32,
                        color: "#999",
                        marginTop: 80
                    }} type="swap"/>
                </Col>
                <Col span={11}>
                    <div className={"upload-btn-box"}>
                        {this.state.uploadStatus ? <img src={this.props.data.imgmedia} width={130}/> : uploadButton}
                    </div>
                </Col>
            </Row>
        </div>)
    }

}

export default FileInput;