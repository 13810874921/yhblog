const defaultUrl = 'http://127.0.0.1:7001/admin/'

const ApiUrl = {
    checkLogin:defaultUrl+"login",    //登录
    getTypeInfo:defaultUrl+"getTypeInfo",    //获得文章类别信息
    addArticle:defaultUrl+"addArticle",        //添加文章
    updateArticle:defaultUrl+"updateArticle",        //修改文章
    getArticleList:defaultUrl+"getArticleList",        //修改文章
    delArticle:defaultUrl+"delArticle/",        //删除文章文章
    getArticleById:defaultUrl+"getArticleById/",        //获得文章详情
}

export default ApiUrl