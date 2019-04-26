import React, {Component} from "react";
import axios from "axios";
import {Avatar, Card, Carousel, Col, Icon, Layout, List, Row} from 'antd';
import "./less/listen.css";
import img1 from "./img/img1.jpg";
import img2 from "./img/img2.jpg";
import img3 from "./img/img3.jpg";
import img4 from "./img/img4.jpg";
// import img5 from "./img/img5.jpg";
// import img6 from "./img/img6.jpg";


const {
    Header, Content,
} = Layout;

const IconText = ({type, text, href}) => (
    <span>
        <a className={"hover-style"} href={href}><Icon type={type}/>&nbsp;&nbsp;{" " + text}</a>
    </span>
);


class Listen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            musics: [],
            music: {},
            isPlay: false,
        };
    }

    componentWillMount() {
    }

    componentDidMount() {
        this.getData();
    }

    getData = () => {
        const _this = this;
        axios.post("http://localhost:8080/music/client", {}).then(function (response) {
            _this.setState({
                musics: response.data
            })
        }).catch(function (error) {
            console.log(error);
        })
    }

    isplay = () => {
        this.setState({
            isPlay: this.state.isPlay ? false : true,
        })
    }

    render() {
        return (
            <div>
                <Row gutter={48}>
                    <Col span={16}>
                        <Layout style={{background: '#fff',}}>
                            <Header style={{background: '#fff', padding: 0, minHeight: 280,}}>
                                <Carousel className={"ant-carousel"} autoplay>
                                    <div className={"slick-slide"}><img src={img1} width={"100%"} height={280}/></div>
                                    <div className={"slick-slide"}><img src={img2} width={"100%"} height={280}/></div>
                                    <div className={"slick-slide"}><img src={img3} width={"100%"} height={280}/></div>
                                    <div className={"slick-slide"}><img src={img4} width={"100%"} height={280}/></div>
                                </Carousel>
                            </Header>
                            <Content style={{
                                marginTop: 24,
                                background: '#fff',
                                height: 200,
                            }}><Card
                                style={{width: "100%"}}
                                actions={[<Icon style={{fontSize: 27}} type="step-backward"/>,
                                    this.state.music.caption === undefined ?
                                        <Icon style={{fontSize: 27}} type="play-circle"/> :
                                        this.state.isPlay ?
                                            <Icon style={{fontSize: 27}} type="pause-circle" onClick={this.isplay}/> :
                                            <Icon style={{fontSize: 27}} type="play-circle" onClick={this.isplay}/>,
                                    <Icon style={{fontSize: 27}} type="step-forward"/>]}
                            >
                                <Card.Meta
                                    avatar={<Avatar shape="square" src={this.state.music.imgmusic} size={64}/>}
                                    title={this.state.music.caption === undefined ? null : this.state.music.caption + "---- by " + this.state.music.author}
                                    description={this.state.music.summary}
                                />
                            </Card></Content>
                        </Layout>
                    </Col>
                    <Col span={8}>
                        <List
                            style={{height: "300px",}}
                            itemLayout="horizontal"
                            dataSource={this.state.musics}
                            pagination={{
                                pageSize: 5,
                            }}
                            renderItem={item => (
                                <List.Item
                                    key={item.caption}
                                    actions={[<span onClick={() => {
                                        this.setState({
                                            music: item,
                                            isPlay: true,
                                        })
                                    }}><Icon type="play-circle"/></span>,
                                        item.enarticle === null ?
                                            <IconText type={"read"} href={item.enarticle} text={"暂无乐评"}/> : <span>
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
                                        }><Icon type={"read"}/>&nbsp;&nbsp;{" " + "乐评"}</a>
                                    </span>]}
                                >
                                    <List.Item.Meta
                                        avatar={<Avatar shape="square" src={item.imgmusic} size={64}/>}
                                        title={<a href="#">{item.caption}</a>}
                                        description={"by " + item.author}
                                    />
                                </List.Item>
                            )}
                        />
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Listen;