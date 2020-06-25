module.exports = options =>{
    return async function auth(ctx,next){
        console.log(ctx.session.openId)
        if(ctx.session.openId){
            await next()
        }else{
            ctx.body={
                code:-1,
                msg:"没有登录"
            }
        }
    }
}