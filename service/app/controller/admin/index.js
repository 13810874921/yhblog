"use strict";

const Controller = require("egg").Controller;

class Index extends Controller {
  async index() {
    this.ctx.body = "api";
  }
  //login
  async checkLogin() {
    const { ctx } = this;
    let userName = ctx.request.body.userName;
    let password = ctx.request.body.password;
    const sql = `select password from user_info where user_name="${userName}" and password="${password}"`;
    const res = await this.app.mysql.query(sql);
    if (res.length > 0) {
      let openId = new Date().getTime();
      ctx.session.openId = { openId: openId };
      // ctx.session.maxAge= 1000 * 60 //控制session有效时间
      ctx.body = {
        code: 200,
        msg: "登录成功",
        openId: openId,
      };
    } else {
      ctx.body = {
        code: -1,
        msg: "用户名或密码错误",
      };
    }
  }
  //获取文章类型
  async getTypeInfo() {
    const { ctx, app } = this;
    const resType = await app.mysql.select("type_info");
    if (resType) {
      ctx.body = {
        code: 200,
        msg: "ok",
        data: resType,
      };
    } else {
      ctx.body = {
        code: -1,
        msg: "错误",
        data: null,
      };
    }
  }
  //添加文章
  async addArticle() {
    const { ctx, app } = this;
    const tempArticle = ctx.request.body;
    const result = await app.mysql.insert("article_info", tempArticle);
    const insertSuccess = result.affectedRows === 1;
    const insertId = result.insertId;
    if (insertSuccess) {
      ctx.body = {
        code: 200,
        msg: insertSuccess,
        data: insertId,
      };
    } else {
      ctx.body = {
        code: 400,
        msg: "错误",
      };
    }
  }

  //修改文章
  async updateArticle() {
    const { ctx, app } = this;
    const tempArticle = ctx.request.body;
    const result = await app.mysql.update("article_info", tempArticle);
    const updateSuccess = result.affectedRows === 1;
    ctx.body = {
      code: 200,
      msg: updateSuccess,
    };
  }

  //获取文章列表
  async getArticleList() {
    const result = await this.app.mysql.query(`
    select article_info.id id,article_info.title title,article_info.introduce introduce,article_info.create_time time,article_info.show_count count,type_info.type_name typeName \n
      from article_info left join type_info on article_info.type_id = type_info.id  order by article_info.id DESC
    `);
    this.ctx.body = { result };
  }
  //删除文章
  async delArticle(){
    const id = this.ctx.params.id
    const result = await this.app.mysql.delete("article_info",{"id":id})
    this.ctx.body={code:200,result:"成功"}

  }

  //修改
  async getArticleById(){
    const id = this.ctx.params.id
    const result = await this.app.mysql.query(`
    select article_info.id id,article_info.title title,article_info.introduce introduce,article_info.article_content articleContent,article_info.create_time time,article_info.show_count count,type_info.type_name typeName,type_info.id typeId \n
      from article_info left join type_info on article_info.type_id = type_info.id  where article_info.id = ${id}
    `);
    this.ctx.body={
      code:200,
      result:result
    }
  }
}

module.exports = Index;
