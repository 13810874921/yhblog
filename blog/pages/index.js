import { useState } from "react"
import Head from 'next/head'
import Router from 'next/router'
import Link from 'next/link'
import { Row, Col, List, Affix } from 'antd'
import {FieldTimeOutlined,FolderOpenOutlined,FireOutlined} from '@ant-design/icons'

import '../public/style/pages/index.css'

import Header from '../components/header'
import Author from '../components/author'
import Advert from '../components/ad'
import Footer from '../components/footer'

import axios from 'axios'
import moment from 'moment'

import { getUrl } from '../public/utils/util' //获取封装promise
import ApiUrl from '../config/urls' //获取接口

import marked from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'

export default function Home({result}) {
  const renderer = new marked.Renderer()

  marked.setOptions({
    renderer:renderer,
    gfm:true, //启动github的markdown
    pedantic:false, // 容错渲染
    sanitize:false, //忽略html标签
    tables:true,  //是否输出表格，依赖gfm
    breaks:false,  //github换行符
    smartLists:true,  //渲染列表样式
    highlight:function(code){
      return hljs.highlightAuto(code).value
    }
  })
  const [list,setList]=useState(result)
  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Affix offsetTop={0}>
        <Header />
      </Affix>
      <Row className="common-main" justify="center">
        <Col className="common-left" xs={24} sm={24} md={16} lg={18} xl={14}>
          <List
          header={<div>最新日志</div>}
          itemLayout="vertical"
          dataSource={list}
          renderItem={item=>(
            <List.Item>
              <div className="list-title">
                <Link href={{pathname:'/detail',query:{id:item.id}}}>
                  <a>{item.title}</a>
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
                  {item.count}
                </span>
              </div>
              <div className="list-context"
              
              dangerouslySetInnerHTML={{__html:marked(item.introduce)}}>
                {/* {item.introduce} */}
              </div>
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

Home.getInitialProps=async()=>{
  return await getUrl(ApiUrl.getArticleList)
}
