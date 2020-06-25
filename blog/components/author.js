import { Avatar, Divider } from 'antd'
import { GithubOutlined, QqOutlined, WechatOutlined } from '@ant-design/icons'
import '../public/style/components/author.css'
export default function Author () {
    return(
        <div className="author-main common-box">
            <div>
                <Avatar size={100} src="https://www.cwaza.com/images/new_avator.png"/>
            </div>
            <div className="author-information">
                10年经验程序员，跟你一起来探讨技术
                <Divider>社交账号</Divider>
                <Avatar icon={<GithubOutlined />} size={28} className="account"/>
                <Avatar icon={<QqOutlined />} size={28} className="account"/>
                <Avatar icon={<WechatOutlined />} size={28} className="account"/>
            </div>
        </div>
    )
}