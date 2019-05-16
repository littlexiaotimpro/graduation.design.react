import React, {Component} from "react";
import "./less/home.css";

const lots = ["上上签", "上吉签", "大吉签", "中吉签", "中平签", "中下签", "下吉签", "下平签", "下下签"];

class Home extends Component {
    render() {
        return (
            <div>
                <div className={"card-box"}>
                    <p style={{marginTop: 200}}>加班成常态，学习到变态 ！！！</p>
                    <p>少年，你够变态了吗 ！！！</p>
                    <p>程序员不止眼前的逻辑和代码，还有底层的架构与实现。</p>
                </div>
            </div>
        )
    }
}

export default Home;