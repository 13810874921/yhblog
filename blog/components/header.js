import React, { useState, useEffect } from 'react'
import '../public/style/components/header.css'
import { Row, Col, Menu } from 'antd'
import { HomeOutlined, VideoCameraOutlined, ContainerOutlined }  from '@ant-design/icons'
import Router from 'next/router'
import axios from 'axios'
import ApiUrl from '../config/urls'
// import { getUrl } from '../public/utils/util'
import Link from 'next/link'

const Header = () =>{
    // const [navArray,setArray] = useState([])
    // useEffect(()=>{
    //     const fetchData=async()=>{
    //         console.log(ApiUrl.getNavList)
    //         const result = await axios(ApiUrl.getNavList).then(res=>{
    //             console.log(res)
    //             return res.data
    //         })
    //         setArray(result)
    //     }
    //     fetchData()
    // },[])
    // const handleClick = (e)=>{
    //     if(e.key=="0"){
    //         Router.push("/")
    //     }else{
    //         Router.push("/list?id="+e.key)
    //     }
    // }

    return(
        <div className="header">
            <Row align="top" justify="center">
                <Col xs={24} sm={24} md={15}>
                    <span className="header-logo">KIKA</span>
                    <span className="header-text">前端问之我答 - 技术博客</span>
                </Col>
                <Col xs={0} sm={0} md={9}>
                    {/* <Row>
                        <Col xs={0} sm={0} md={6}>
                        <Link href="/">
                            <a>
                            <HomeOutlined />
                            首页
                            </a>
                        </Link>
                        </Col>
                        <Col xs={0} sm={0} md={6}>
                            <Link  href={{pathname:'/list',query:{id:1}}}>
                                <a><VideoCameraOutlined />视频教程</a>   
                            </Link>
                            </Col>
                            <Col xs={0} sm={0} md={6}>
                            <Link  href={{pathname:'/list',query:{id:2}}}>
                                <a><ContainerOutlined />文章</a>   
                            </Link>
                            </Col>
                    </Row> */}
                    <Menu mode="horizontal" >
                        <Menu.Item key="home">
                            <Link href="/">
                            <a>
                            <HomeOutlined />
                            首页
                            </a>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="video">
                            <Link  href={{pathname:'/list',query:{id:1}}}>
                                <a><VideoCameraOutlined />视频教程</a>   
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Link  href={{pathname:'/list',query:{id:2}}}>
                                <a><ContainerOutlined />文章</a>   
                            </Link>
                        </Menu.Item>
                    </Menu>
                </Col>
            </Row>
        </div>
    )
}
export default Header