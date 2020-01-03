const graphql = require('graphql');
const { CategoryModel, ProductModel } = require('./model');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
}  = graphql


const Category = new GraphQLObjectType({
  name: 'Category',
  fields: () => (
    {
      id: { type: GraphQLString },
      name: { type: GraphQLString },
      products: {
        type: new GraphQLList(Product),
        async resolve(parent){
          let result = await ProductModel.find({ category: parent.id })
          return result
        }
      }
    }
  )
})

const Product = new GraphQLObjectType({
  name: 'Product',
  fields: () => (
    {
      id: { type: GraphQLString },
      name: { type: GraphQLString },
      category: {
        type: Category,
        async resolve(parent){
          let result = await CategoryModel.findById(parent.category)
          return result
        }
      }
    }
  )
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    getCategory: {
      type: Category,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) }
      },
      async resolve(parent, args){
        let result = await CategoryModel.findById(args.id)
        return result
      }
    },
    getCategories: {
      type: new GraphQLList(Category),
      args: {},
      async resolve(parent, args){
        let result = await CategoryModel.find()
        return result
      }
    },
    getProduct: {
      type: Product,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) }
      },
      async resolve(parent, args){
        let result = await ProductModel.findById(args.id)
        return result 
      }
    },
    getProducts: {
      type: new GraphQLList(Product),
      args: {},
      async resolve(parent, args){
        let result = await ProductModel.find().sort('-_id') // 根据添加顺序倒序排
        return result 
      }
    }
  }
})

const RootMutation = new GraphQLObjectType({
  name: 'RootMutation',
  fields: {
    addCategory: {
      type: Category,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) }
      },
      async resolve(parent, args){
        let result = await CategoryModel.create(args)
        return result  
      }
    },
    addProduct: {
      type: Product,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        category: { type: new GraphQLNonNull(GraphQLString) }
      },
      async resolve(parent, args){
        let result = await ProductModel.create(args)
        return result 
      }
    },
    updateProduct: {
      type: Product,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        category: { type: new GraphQLNonNull(GraphQLString) }
      },
      async resolve(parent, agrs){
        let {id, name, category } = args;
        let result = await ProductModel.findByIdAndUpdate(id, { name, category })
        return result
      }
    },
    deleteProduct: {
      type: Product,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
      },
      async resolve(parent, args){
//         let result = await ProductModel.deleteOne({"_id": args.id})
        let result = await ProductModel.findByIdAndDelete(args.id)
        return result
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation
})
