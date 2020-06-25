import React, { useState, useEffect } from "react";
import marked from "marked";
import "../style/add-article.css";
import { Input, Row, Col, Select, Button, DatePicker, message } from "antd";
import axios from "axios";
import ApiUrl from "../config/urls";
import moment from 'moment'
const { Option } = Select;
const { TextArea } = Input;
function AddArticle(props) {
  const [articleId, setArticleId] = useState(0); // 文章的ID，如果是0说明是新增加，如果不是0，说明是修改
  const [articleTitle, setArticleTitle] = useState(""); //文章标题
  const [articleContent, setArticleContent] = useState(""); //markdown的编辑内容
  const [markdownContent, setMarkdownContent] = useState("预览内容"); //html内容
  const [introducemd, setIntroducemd] = useState(); //简介的markdown内容
  const [introducehtml, setIntroducehtml] = useState("等待编辑"); //简介的html内容
  const [showDate, setShowDate] = useState(); //发布日期
  const [updateDate, setUpdateDate] = useState(); //修改日志的日期
  const [typeInfo, setTypeInfo] = useState([]); // 文章类别信息
  const [selectedType, setSelectType] = useState(1); //选择的文章类别

  useEffect(() => {
    getTypeInfo();
    //获取文章id
    let tempId = props.match.params.id
    if(tempId){
      setArticleId(tempId)
      getArticleById(tempId)
    }
  }, []);

  const renderer = new marked.Renderer();
  marked.setOptions({
    renderer: renderer,
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    smartypants: false,
  });

  const changeContent = (e) => {
    setArticleContent(e.target.value);
    let html = marked(e.target.value);
    setMarkdownContent(html);
  };
  const changeIntorduce = (e) => {
    setIntroducemd(e.target.value);
    let html = marked(e.target.value);
    setIntroducehtml(html);
  };

  const getTypeInfo = () => {
    axios({
      method: "get",
      url: ApiUrl.getTypeInfo,
      withCredentials: true, // 跨域检验cookie
    }).then((res) => {
      console.log(res.data);
      if (res.data.code == -1) {
        localStorage.removeItem("openId");
        props.history.push("/");
      } else {
        setTypeInfo(res.data.data);
      }
    });
  };

  const selectTypeHandle = (value) => {
    setSelectType(value);
  };

  const saveArticle = () => {
    if (!selectedType) {
      message.error("必须选择文章类型");
      return;
    } else if (!articleTitle) {
      message.error("文章标题不能为空");
      return;
    } else if (!articleContent) {
      message.error("文章内容不能为空");
      return;
    } else if (!introducemd) {
      message.error("文章简介不能为空");
      return;
    } else if (!showDate) {
      message.error("发布日期不能为空");
      return;
    }
    console.log(moment(showDate).valueOf())
    const params = {
      type_id: selectedType,
      title: articleTitle,
      article_content: articleContent,
      introduce: introducemd,
      create_time: moment(showDate).valueOf(),
    };
    if (articleId == 0) {
      //添加
      Object.assign(params, { show_count: 0 });
      axios({
        method: "post",
        url: ApiUrl.addArticle,
        data: params,
        withCredentials: true,
      }).then((res) => {
        console.log(res);
        setArticleId(res.data.data);
        if (res.data.msg) {
          message.success("文章发布成功");
        } else {
          message.error("文章发布失败");
        }
      });
    } else {
      //修改
      Object.assign(params, { id: articleId });
      axios({
        method: "post",
        url: ApiUrl.updateArticle,
        data: params,
        withCredentials: true,
      }).then((res) => {
        if (res.data.msg) {
          message.success("文章修改成功");
        } else {
          message.error("文章修改失败");
        }
      });
    }
  };
  const getArticleById = (id) => {
    axios(ApiUrl.getArticleById + id, { withCredentials: true }).then(res=>{
      console.log(res.data)
      const result = res.data.result[0]
      setArticleTitle(result.title)
      setArticleContent(result.articleContent)
      const html = marked(result.articleContent)
      setMarkdownContent(html)
      setIntroducemd(result.introduce)
      const tempInt = marked(result.introduce)
      setIntroducehtml(tempInt)
      setShowDate(moment(result.time))
      setSelectType(result.typeId)
    });
  };

  return (
    <div>
      <Row gutter={10}>
        <Col span={18}>
          <Row gutter={20}>
            <Col span={20}>
              <Input
                value={articleTitle}
                placeholder="博客标题"
                size="large"
                onChange={(e) => setArticleTitle(e.target.value)}
              />
            </Col>
            <Col span={4}>
              <Select
                defaultValue={selectedType}
                size="large"
                onChange={selectTypeHandle}
              >
                {typeInfo.map((item, index) => {
                  return (
                    <Option key={index} value={item.id}>
                      {item.type_name}
                    </Option>
                  );
                })}
              </Select>
            </Col>
          </Row>
          <br />
          <Row gutter={10}>
            <Col span={12}>
              <TextArea
                className="markdown-content"
                rows={35}
                placeholder="文章内容"
                value={articleContent}
                onChange={changeContent}
              />
            </Col>
            <Col span={12}>
              <div
                className="show-html"
                dangerouslySetInnerHTML={{ __html: markdownContent }}
              ></div>
            </Col>
          </Row>
        </Col>
        <Col span={6}>
          <Row>
            <Col span={24}>
              <Button size="large">暂存文章</Button>&emsp;
              <Button type="primary" size="large" onClick={saveArticle}>
                发布文章
              </Button>
            </Col>
            <Col span={24}>
              <br />
              <TextArea
                row={4}
                placeholder="文章简介"
                value={introducemd}
                onChange={changeIntorduce}
              />
              <div
                className="introduce-html"
                dangerouslySetInnerHTML={{ __html: introducehtml }}
              ></div>
            </Col>
            <Col span={12}>
              <br />
              <div className="data-select">
                <DatePicker
                  placeholder="发布日期"
                  size="large"
                  onChange={(date, dateString) => setShowDate(dateString)}
                />
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default AddArticle;
