import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import { Row, Col, List, Breadcrumb, Affix } from 'antd'
import {FieldTimeOutlined,FolderOpenOutlined,FireOutlined} from '@ant-design/icons'

import Header from '../components/header'
import Author from '../components/author'
import Advert from '../components/ad'
import Footer from '../components/footer'

import ApiUrl from '../config/urls'
import Link from 'next/link'
import {getUrl} from '../public/utils/util'
import moment from 'moment'

export default function ListPage(props) {
  const [list,setList]=useState(props.result)
  const [id,setId] = useState(0)
  useEffect(()=>{
    // console.log('lsitPage-====',props.url)
    setList(props.result)
    setId(props.url.query.id)
  })
  return (
    <div className="container">
      <Head>
        <title>ListPage</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Affix offsetTop={0}>
        <Header></Header>
      </Affix>
      <Row className="common-main" justify="center">
        <Col className="common-left" xs={24} sm={24} md={16} lg={18} xl={14}>
          <div className="breadcrumb">
            <Breadcrumb>
              <Breadcrumb.Item>
                <a href="/"> 首页 </a>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <a href={"/list?id="+id}> 视频 </a>
              </Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <List
          header={<div>最新日志</div>}
          itemLayout="vertical"
          dataSource={list}
          renderItem={item=>(
            <List.Item>
              <div className="list-title">
                <Link href={{pathname:'/detail',query:{id:item.id}}}>
                  <a>
                  {item.title}
                  </a>
                </Link>
              </div>
              <div className="list-icon">
                <span>
                  <FieldTimeOutlined />
                  {moment(item.time).format("YYYY-MM-DD HH:mm:ss")}
                </span>
                <span>
                  <FolderOpenOutlined />
                  {item.typeName}
                </span>
                <span>
                  <FireOutlined />
                  {item.count}人
                </span>
              </div>
              <div className="list-context">{item.introduce}</div>
            </List.Item>
          )}
          />
        </Col>
        <Col className="common-right" xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author />
          <Advert />
        </Col>
      </Row>
      <Footer />
    </div>
  )
}

ListPage.getInitialProps=async (context)=>{
  return await getUrl(ApiUrl.getTypeListById+context.query.id) 
}