import React, { useState, memo } from 'react';
import { Table, Modal, Row, Col, Button, Divider, Tag, Form, Input, Select, Popconfirm } from 'antd';
import { Link } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { CATEGORIES_PRODUCTS, GET_PRODUCTS, ADD_PRODUCT, DELETE_PRODUCT, UPDATE_PRODUCT } from '@/api';
import { Product, Category } from '@/types';

const { Option } = Select;
/**
 * 商品列表
 */
const ProductList: React.FC = () => {
  let [visible, setVisible] = useState<boolean>(false);
  let [uVisible, setuVisible] = useState<boolean>(false);
  let [currProduct, setCurrProduct] = useState<Product>({id: '', name: '', categoryId: ''});
  let [pageSize, setPageSize] = useState<number|undefined>(10);
  let [current, setCurrent] = useState<number|undefined>(1);
  
  const { loading, error, data } = useQuery(CATEGORIES_PRODUCTS);
  const [deleteProduct] = useMutation(DELETE_PRODUCT);
 
  if(error) return <p>加载发生错误</p>;
  if(loading) return <p>加载中...</p>;
  
  const { getCategories, getProducts } = data

  const confirm = async (event?:any, record?:Product) => {
    // console.log("详情",  record);
    await deleteProduct({
      variables: {
        id: record?.id
      },
      refetchQueries: [{
        query: GET_PRODUCTS
      }]
    })
    setCurrent(1)
  }
                        
  const updHandle = (record:Product) => {
    setuVisible(true)
    setCurrProduct({
      id: record.id,
      name: record.name,
      categoryId: record.category?.id
    })
  }
   
  const columns = [
    {
      title: "商品ID",
      dataIndex: "id"
    },
    {
      title: "商品名称",
      dataIndex: "name"
    },
    {
      title: "商品分类",
      dataIndex: "category",
      render: (text: any) => {
        let color = ''
        const tagName = text.name;
        if(tagName === '服饰'){
          color = 'red'
        } else if(tagName === '食品') {
          color = 'green'
        } else if(tagName === '数码'){
          color = 'blue'
        } else if(tagName === '母婴'){
          color = 'purple'
        }
        return (
          <Tag color={color}>{text.name}</Tag>
        )
      }
    },
    {
      title: "操作",
      render: (text: any, record: any) => (
        <span>
          <Link to={`/detail/${record.id}`}>详情</Link>
          <Divider type="vertical" />
          <a style={{color: 'orange'}} onClick={() => updHandle(record)}>修改</a>
          <Divider type="vertical" />
          <Popconfirm
            title="确定删除吗?"
            onConfirm={(event) => confirm(event, record)}
            okText="确定"
            cancelText="取消"
          >
            <a style={{color:'red'}}>删除</a>
          </Popconfirm>
        </span>
      )
    }
  ];

  const handleClose = () => {
    setVisible(false)
    setuVisible(false)
  }

  const handleChange = (pagination: { current?:number, pageSize?:number}) => {
    // console.log(pagination)
    const { current, pageSize } = pagination
    setPageSize(pageSize)
    setCurrent(current)
  }

  return (
    <div>
      <Row style={{padding: '0 0 20px 0'}}>
        <Col span={24}>
          <Button type="primary" onClick={() => setVisible(true)}>新增</Button>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Table 
            columns={columns} 
            dataSource={getProducts} 
            rowKey="id" 
            pagination={{
              current: current,
              pageSize: pageSize,
              showSizeChanger: true,
              showQuickJumper: true,
              total: data.length
            }}
            onChange={handleChange}
          />
        </Col>
      </Row>
      {
        visible && <AddForm handleClose={handleClose} categories={getCategories} />
      }
      {
        uVisible && <UpdForm record={currProduct} handleClose={handleClose} categories={getCategories} />
      }
    </div>
  )
}

/**
 * 新增产品Modal
 */
interface FormProps {
  handleClose: () => void;
  categories: Array<Category>;
}

const AddForm:React.FC<FormProps> = memo(({handleClose, categories}) => {
  let [product, setProduct] = useState<Product>({ name: '', categoryId: [] });
  let [addProduct] = useMutation(ADD_PRODUCT);

  const handleSubmit = async () => {
    // 获取表单的值
    await addProduct({
      variables: product,
      refetchQueries: [{
        query: GET_PRODUCTS
      }]
    })
    // 清空表单
    setProduct({ name: '', categoryId: [] })
    handleClose()
  }
  
  return (
    <Modal
      title="新增产品"
      visible={true}
      onOk={handleSubmit}
      okText="提交"
      cancelText="取消"
      onCancel={handleClose}
      maskClosable={false}
    >
      <Form>
        <Form.Item label="商品名称">
          <Input 
            placeholder="请输入" 
            value={product.name} 
            onChange={event => setProduct({ ...product, name: event.target.value })} 
          />
        </Form.Item>
        <Form.Item label="商品分类">
          <Select 
            placeholder="请选择" 
            value={product.categoryId} 
            onChange={(value: string | []) => setProduct({ ...product, categoryId: value })}
          >
            {
              categories.map((item: Category) => (
                <Option key={item.id} value={item.id}>{item.name}</Option>
              ))
            }
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  )
})

// 修改
interface updFormProps extends FormProps {
  record: Product;
}

const UpdForm:React.FC<updFormProps> = memo(({record, handleClose, categories}) => {
  let [updProduct, setUpdProduct] = useState<Product>(record);
  let [updateProduct] = useMutation(UPDATE_PRODUCT)

  const handleSubmit = async() => {
    await updateProduct({
      variables: updProduct,
      refetchQueries: [{
        query: GET_PRODUCTS
      }]
    })
    // 清空表单
    setUpdProduct({ id: '', name: '', categoryId: [] })
    handleClose()
  }

  return (
    <Modal
      title="修改商品"
      visible={true}
      onOk={handleSubmit}
      okText="提交"
      cancelText="取消"
      onCancel={handleClose}
      maskClosable={false}
    >
      <Form>
        <Form.Item label="商品名称">
          <Input 
            placeholder="请输入" 
            value={updProduct.name} 
            onChange={event => setUpdProduct({ ...updProduct, name: event.target.value })} 
          />
        </Form.Item>
        <Form.Item label="商品分类">
          <Select 
            placeholder="请选择" 
            value={updProduct.categoryId} 
            onChange={(value: string | []) => setUpdProduct({ ...updProduct, categoryId: value })}
          >
            {
              categories.map((item: Category) => (
                <Option key={item.id} value={item.id}>{item.name}</Option>
              ))
            }
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  )
})

export default memo(ProductList);
