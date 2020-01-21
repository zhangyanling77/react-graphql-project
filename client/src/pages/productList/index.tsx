import React, { useState, memo } from 'react';
import { Table, Row, Col, Button, Divider, Tag, Popconfirm, Form, Input, Select } from 'antd';
import { Link } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { CATEGORIES_PRODUCTS, GET_PRODUCTS, DELETE_PRODUCT } from '@/api';
import { Product, Category } from '@/types';
import AddForm from './add';
import UpdForm from './update';

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
  let [offset, setOffset] = useState<number|undefined>(0);
  
  const { loading, error, data } = useQuery(CATEGORIES_PRODUCTS);
  const [deleteProduct] = useMutation(DELETE_PRODUCT);
 
  if(error) return <p>加载发生错误</p>;
  if(loading) return <p>加载中...</p>;
  
  const { getCategories, getProducts } = data

  const confirm = async (event?:any, record?:Product) => {
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
      categoryId: record.category!.id
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
    setVisible(false);
    setuVisible(false);
  }

  const handleChange = (pagination: { current?:number, pageSize?:number}) => {
    // console.log(pagination)
    const { current, pageSize } = pagination
    const offset = (current! - 1) * pageSize!
    setPageSize(pageSize);
    setCurrent(current);
    setOffset(offset);
  }

  return (
    <div>
      <Row style={{padding: '0 0 20px 0'}}>
        <Col span={24}>
          <Form layout='inline'>
            <Form.Item>
              <Button type="primary" onClick={() => setVisible(true)}>新增</Button>
            </Form.Item>
            <Form.Item label="商品ID">
              <Input 
                placeholder="请输入"
                style={{width: 200}} 
              />
            </Form.Item>
            <Form.Item label="商品名称">
              <Input 
                placeholder="请输入"
                style={{width: 200}} 
              />
            </Form.Item>
            <Form.Item label="商品分类" >
              <Select 
                placeholder="请选择" 
                style={{width: 200}}
              >
                {
                  getCategories.map((item: Category) => (
                    <Option key={item.id} value={item.id}>{item.name}</Option>
                  ))
                }
              </Select>
            </Form.Item>
            <Form.Item>
              <Button type="primary" onClick={() => {}}>查询</Button>
            </Form.Item>
            <Form.Item>
              <Button type="default" onClick={() => {}}>重置</Button>
            </Form.Item>
          </Form>
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

export default memo(ProductList);
