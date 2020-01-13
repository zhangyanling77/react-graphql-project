import React, { memo, useState} from 'react';
import { Modal, Form, Input, Select } from 'antd';
import { Product, Category } from '@/types';
import { useMutation } from '@apollo/react-hooks';
import { GET_PRODUCTS, ADD_PRODUCT } from '@/api';

const { Option } = Select;

interface FormProps {
  handleClose: () => void;
  categories: Array<Category>;
}

const AddForm:React.FC<FormProps> = ({handleClose, categories}) => {
  let [product, setProduct] = useState<Product>({ name: '', categoryId: [] });
  let [addProduct] = useMutation(ADD_PRODUCT);

  const handleSubmit = async () => {
    await addProduct({
      variables: product,
      refetchQueries: [{
        query: GET_PRODUCTS
      }]
    })
    // 清空表单
    setProduct({ name: '', categoryId: [] });
    handleClose();
  }
  
  return (
    <Modal
      title="新增商品"
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
}

export default memo(AddForm);
