import React, { useState } from "react";
import "antd/dist/antd.css";
import { Card, Input, Button, Spin,message } from "antd";
import { UserOutlined, KeyOutlined } from "@ant-design/icons";
import '../style/login.css'
import ApiUrl from '../config/urls'
import axios from 'axios'

function Login(props) {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const submitLogin = () => {
    setIsLoading(true);
    if(!userName){
      message.error("用户名不能为空")
      setTimeout(()=>{
        setIsLoading(false);
      },500)
      return
    }else
    if(!password){
      message.error("密码不能为空")
      setTimeout(()=>{
        setIsLoading(false);
      },500)
      return 
    }
    const params = {
      userName:userName,
      password:password
    }
    // axios.post(ApiUrl.checkLogin,params).then(res=>{
    //   console.log(res.data)
    // })
    axios({
      method:"post",
      url:ApiUrl.checkLogin,
      data:params,
      withCredentials:true, //前后台公用缓存
    }).then(res=>{
      setIsLoading(false);
      const { code, msg } = res.data
      if(code==200){
        console.log(res.data)
        localStorage.setItem("openId",res.data.openId)
        props.history.push("/index")
      }else{
        setTimeout(()=>{
          setIsLoading(false);
        },500)
        message.error("用户名或密码错误")
      }
    })

  };

  return (
    <div className="login-div">
      <Spin tip="loading..." spinning={isLoading}>
        <Card title="CWA博客后台" bordered style={{ width: 400 }}>
          <Input
            id="userName"
            size="large"
            placeholder="请输入用户名"
            prefix={<UserOutlined style={{ color: "#dcd" }} />}
            onChange={(e) => setUserName(e.target.value)}
          />
          <div className="divied"></div>
          <Input.Password
            id="password"
            size="large"
            placeholder="请输入密码"
            prefix={<KeyOutlined style={{ color: "#dcd" }} />}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="divied"></div>
          <Button type="primary" size="large" block onClick={submitLogin}>
            登录
          </Button>
        </Card>
      </Spin>
    </div>
  );
}
export default Login;
