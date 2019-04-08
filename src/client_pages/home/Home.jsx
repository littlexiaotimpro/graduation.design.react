import React, {Component} from "react";
import "./less/home.css";

class Home extends Component {
    render() {
        return (
            <div>
                <div className={"card-box"}>
                    <p style={{marginTop: 80}}>加班成常态，学习到变态 ！！！</p>
                    <p>少年，你够变态了吗 ！！！</p>
                    <p>程序员不止眼前的逻辑和代码，还有底层的架构与实现。</p>
                    <p>少年，你说你还缺对象吗 ！！！</p>
                    <p>除了诗与远方，和眼前的苟且，还有永无止境的bug。</p>
                    <p>少年，你还说你不会写bug ！！！</p>
                </div>
            </div>
        )
    }
}

export default Home;