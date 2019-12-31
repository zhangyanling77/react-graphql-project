const mongoose = require('mongoose');

const Schema = mongoose.Schema;
// 创建数据库连接
const conn = mongoose.createConnection('mongodb://localhost:27017/graphql',{ useNewUrlParser: true, useUnifiedTopology: true });

conn.on('open', () => console.log('数据库连接成功！'));

conn.on('error', (error) => console.log(error));

// 用于定义表结构
const CategorySchema = new Schema({
  name: String
});
// 增删改查
const CategoryModel = conn.model('Category', CategorySchema);

const ProductSchema = new Schema({
  name: String,
  category: {
    type: Schema.Types.ObjectId, // 外键
    ref: 'Category'  
  }
});

const ProductModel = conn.model('Product', ProductSchema);

module.exports = {
  CategoryModel,
  ProductModel
}
