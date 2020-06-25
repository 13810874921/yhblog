import React,{useState, useEffect} from 'react';
import { Row, Col, Breadcrumb, Affix } from "antd";
import "../public/style/pages/detail.css";

import Head from "next/head";
import Header from "../components/header";
import Advert from "../components/ad";
import Author from "../components/author";
import Footer from "../components/footer";

import {
  FieldTimeOutlined,
  FolderOpenOutlined,
  FireOutlined,
} from "@ant-design/icons";
// import ReactMarkdown from "react-markdown";
// import MarkdownNavbar from "markdown-navbar";
import "markdown-navbar/dist/navbar.css";

import marked from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'

import { postUrl } from "../public/utils/util";
import moment from 'moment'
import Tocify from '../components/tocify.tsx'

import ApiUrl from '../config/urls'




export default function Detail(props) {
  // console.log('-------',props)
  const tocify = new Tocify()
  const renderer = new marked.Renderer()
  const [listId,setListId] = useState(1)
  renderer.heading = function(text,level,raw){
    const anchor = tocify.add(text,level)
    return `<a id=${anchor} href="#${anchor}" class="anchor-fix"><h${level}>${text}</h${level}></a>`
  }


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
  let html = marked(props.content)

  useEffect(()=>{
    setListId(props.url.query.id)
  })



  return (
    <div className="container">
      <Head>
        <title>detail</title>
      </Head>
      <Header></Header>
      <Row className="common-main" justify="center">
        <Col className="common-left"  xs={24} sm={24} md={16} lg={18} xl={14}>
          <div className="breadcrumb">
            <Breadcrumb>
              <Breadcrumb.Item>
                <a href="/">首页</a>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <a href={'/list?id='+listId}>视频列表</a>
              </Breadcrumb.Item>
              <Breadcrumb.Item>XXXXX</Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <div>
            <div className="detail-title">{props.title}</div>
            <div className="detail-desc center">
              <div className="list-icon">
                <span>
                  <FieldTimeOutlined />
                  {moment(props.time).format("YYYY-MM-DD HH:mm:ss")}
                </span>
                <span>
                  <FolderOpenOutlined />
                  {props.typeName}
                </span>
                <span>
                  <FireOutlined />
                  {props.count}人
                </span>
              </div>
            </div>
            <div className="detail-content"
            dangerouslySetInnerHTML={{__html:html}}
            >
              {/* <ReactMarkdown source={markdown} escapeHtml={false} /> */}
            </div>
          </div>
        </Col>
        <Col className="common-right" xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author />
          <Advert />
          <Affix offsetTop={5}>
            <div className="detail-nav common-box">
              <div className="nav-title">文章目录</div>
              {/* <MarkdownNavbar
                source={html}
                className="article"
                headingTopOffset={-55}
                ordered={false}
              /> */}
              {tocify&&tocify.render()}
            </div>
          </Affix>
        </Col>
      </Row>
      <Footer />
    </div>
  );
}

// Detail.getInitalProps=async(context)=>{
//   console.log(context.query.id)
//   let id = context.query.id
//   const promise = new Promise((resolve,reject)=>{
//     axios.post()
//   })
// }
Detail.getInitialProps = async (context) => {
  console.log("??????",context)
  const list = await postUrl(ApiUrl.getArticleDetail, {id:context.query.id});
  return list
};
