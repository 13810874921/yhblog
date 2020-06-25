module.exports=app=>{
    const {router,controller} = app
    var auth = app.middleware.auth()
    router.get('/admin/index',controller.admin.index.index)
    router.post('/admin/login',controller.admin.index.checkLogin)
    router.get('/admin/getTypeInfo',auth,controller.admin.index.getTypeInfo)
    router.post('/admin/addArticle',auth,controller.admin.index.addArticle)
    router.post('/admin/updateArticle',auth,controller.admin.index.updateArticle)
    router.get('/admin/getArticleList',auth,controller.admin.index.getArticleList)
    router.get('/admin/delArticle/:id',auth,controller.admin.index.delArticle)
    router.get('/admin/getArticleById/:id',auth,controller.admin.index.getArticleById)
}