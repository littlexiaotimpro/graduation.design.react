import React, {Component} from "react";
import {Col, Divider, Row} from "antd";
import "./less/home.css";

class Home extends Component {
    render() {
        return (
            <div>
                <div className={"card-box"}>
                    {/*你的人生，除了诗与远方，还有bug*/}
                    <Row gutter={16}>
                        <Col span={6}>
                            <div className={"cards"}>
                                <h1>写</h1>
                                <Divider/>
                                <h3>
                                    <p>衰容满天绕云雕，</p>
                                    <p>得句愁难少问天。</p>
                                    <p>此句微茫冲雪早，</p>
                                    <p>丁宁悲壮幸无他。</p>
                                </h3>
                            </div>
                        </Col>
                        <Col span={6}>
                            <div className={"cards"}>
                                <h1>读</h1>
                                <Divider/>
                                <h3>
                                    <p>空山天气有荣华，</p>
                                    <p>何用诗书罕有窥。</p>
                                    <p>宁教留伴阑干角，</p>
                                    <p>幽人窗下贵藏辉。</p>
                                </h3>
                            </div>
                        </Col>
                        <Col span={6}>
                            <div className={"cards"}>
                                <h1>看</h1>
                                <Divider/>
                                <h3>
                                    <p>青时人健宿芦花，</p>
                                    <p>万字题竹月正孤。</p>
                                    <p>子后弓刀无我法，</p>
                                    <p>报恩满地好啼乌。</p>
                                </h3>
                            </div>
                        </Col>
                        <Col span={6}>
                            <div className={"cards"}>
                                <h1>听</h1>
                                <Divider/>
                                <h3>
                                    <p>犹记欢声堕泪碑，</p>
                                    <p>寒笳鸡舞是中春。</p>
                                    <p>法音拗倒马人来。</p>
                                    <p>争忍断声林欲下，</p>
                                    <p>钧天燕语满烟霞，</p>
                                    <p>空庭风雨满皇州。</p>
                                </h3>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}

export default Home;