import React,{useState, useEffect} from "react";
import { List, Row, Col, Modal, message, Button } from "antd";
import axios from 'axios';
import ApiUrl from '../config/urls'
import moment from 'moment';
import '../style/article-list.css'
const {confirm} = Modal

function ArticleList(props){
    const [list,setList] = useState([])
    const getList=()=>{
        axios({
            method:"get",
            url:ApiUrl.getArticleList,
            withCredentials:true
        }).then(res=>{
            console.log(res)
            setList(res.data.result)
        })
    }
    const delArticle=(id)=>{
        confirm({
            title:"是否删除？",
            content:"确定删除将无法恢复",
            onOk(){
                axios(ApiUrl.delArticle+id,{withCredentials:true}).then(res=>{
                    message.success("删除成功")
                    getList()
                })
            },
            onCancel(){
                message.success("已取消")
            }
        })
    }
    const updateArticle=(id,check)=>{
        props.history.push("/index/add/"+id)
    }
    useEffect(()=>{
        getList()
    },[])
    return(
        <div>
            <List 
                header={
                    <Row className="list-div">
                        <Col span={8}>
                            <b>标题</b>
                        </Col>
                        <Col span={4}>
                            <b>类别</b>
                        </Col>
                        <Col span={4}>
                            <b>发布时间</b>
                        </Col>
                        <Col span={4}>
                            <b>浏览量</b>
                        </Col>
                        <Col span={4}>
                            <b>操作</b>
                        </Col>
                    </Row>
                }
                bordered
                dataSource={list}
                renderItem={
                    item=>(
                        <List.Item>
                             <Row className="list-div">
                                <Col span={8}>
                    {item.title}
                                </Col>
                                <Col span={4}>
                    {item.typeName}
                                </Col>
                                <Col span={4}>
                                    {moment(item.time).format("YYYY-MM-DD HH:mm:ss")}
                                </Col>
                                <Col span={3}>
                                    {item.count}
                                </Col>
                                <Col span={5}>
                                    <Button type="primary" size="middle" onClick={()=>updateArticle(item.id)}>
                                        修改
                                    </Button>&emsp;
                                    <Button type="primary" danger  size="middle" onClick={()=>{delArticle(item.id)}}>
                                        删除
                                    </Button>
                                </Col>
                            </Row>
                        </List.Item>
                    )
                }
            >

            </List>
        </div>
    )
} 
export default ArticleList