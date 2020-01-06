import { gql } from 'apollo-boost';

// 获取登录状态
export const GET_LOGINSTATUS = gql`
  query{
    isLogin @client
    userName @client
  }
`;

// 查询所有商品分类
export const GET_CATEGORIES = gql`
  query{
    getCategories{
      id
      name
      products{
        id
        name
      }
    }
  }
`;

// 查询所有商品
export const GET_PRODUCTS = gql`
  query{
    getProducts{
      id
      name
      category{
        id
        name
        products{
          id
          name
        }
      }
    }
  }
`;

// 查询所有的上屏分类和产品
export const CATEGORIES_PRODUCTS = gql`
  query{
    getCategories{
      id
      name
      products{
        id
        name
      }
    }
    getProducts{
      id
      name
      category{
        id
        name
        products{
          id
          name
        }
      }
    }
  }
`;

// 添加产品
export const ADD_PRODUCT = gql`
  mutation($name:String!, $categoryId:String!){
    addProduct(name: $name, category: $categoryId){
      id
      name
      category{
        id
        name
      }
    }
  }
`;

// 根据id删除产品
export const DELETE_PRODUCT = gql`
  mutation($id: String!){
    deleteProduct(id: $id){
      id
      name
    }
  }
`;

// 根据id查询商品详情及相应商品分类及所属分类全部商品
export const GET_PRODUCT = gql`
  query($id: String!){
    getProduct(id: $id){
      id
      name
      category{
        id
        name
        products{
          id
          name
        }
      }
    }
  }
`;

// 修改商品
export const UPDATE_PRODUCT = gql`
  mutation($id: String!, $name: String!, $categoryId:String!){
    updateProduct(id: $id, name: $name, category: $categoryId){
      id
      name
      category{
        id
        name
      }
    }
  }
`;
