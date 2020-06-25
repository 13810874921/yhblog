"use strict";

const Controller = require("egg").Controller;
const moment = require("moment");
// import moment from 'moment'
class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    // const result = await this.app.mysql.get("blog_content", {});
    ctx.body = "123123";
  }
  //首页文章列表
  async getArticleList() {
    const { ctx } = this;
    const result = await this.app.mysql.query(`
      select article_info.id id,article_info.title title,article_info.introduce introduce,article_info.create_time time,article_info.show_count count,type_info.type_name typeName \n
      from article_info left join type_info on article_info.type_id = type_info.id
      `);
    ctx.body = { result };
  }
  //文章详情
  async getArticalById() {
    const { ctx } = this;
    console.log("~~~~~~", ctx.request.body);
    const id = ctx.request.body.id;
    const result = await this.app.mysql.query(`
     select article_info.id id,article_info.title title,article_info.introduce introduce,article_info.article_content content,article_info.create_time time,article_info.show_count count,type_info.type_name typeName,type_info.id typeId \n
      from article_info left join type_info on article_info.type_id = type_info.id
      where article_info.id=${id}
     `);
    ctx.body = result[0];
  }
  //获取类别名称和编号
  async getTypeInfo() {
    const result = await this.app.mysql.select("type_info");
    this.ctx.body = result;
  }

  //根据类别获取文章列表
  async getTypeListById() {
    const result = await this.app.mysql.query(`
    select article_info.id id,article_info.title title,article_info.introduce introduce,article_info.create_time time,article_info.show_count count,type_info.type_name typeName \n
      from article_info left join type_info on article_info.type_id = type_info.id where type_info.id=${this.ctx.params.id}
    `);
    this.ctx.body = { result };
  }
}

module.exports = HomeController;
