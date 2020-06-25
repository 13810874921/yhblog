module.exports = (app) => {
    const {router,controller} = app;
    router.get('/front/index',controller.front.index.index)
    router.get('/front/articleList',controller.front.index.getArticleList)
    router.post('/front/detail',controller.front.index.getArticalById)
    router.get('/front/navList',controller.front.index.getTypeInfo)
    router.get('/front/getTypeListById/:id',controller.front.index.getTypeListById)
};
