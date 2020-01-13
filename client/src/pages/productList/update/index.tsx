import React, { memo, useState } from 'react';
import { Modal, Form, Input, Select } from 'antd';
import { Product, Category } from '@/types';
import { useMutation } from '@apollo/react-hooks';
import { GET_PRODUCTS, UPDATE_PRODUCT } from '@/api';

const { Option } = Select;

interface FormProps {
  handleClose: () => void;
  categories: Array<Category>;
  record: Product;
}

const UpdForm:React.FC<FormProps> = ({record, handleClose, categories}) => {
  let [updProduct, setUpdProduct] = useState<Product>(record);
  let [updateProduct] = useMutation(UPDATE_PRODUCT);

  const handleSubmit = async () => {
    await updateProduct({
      variables: updProduct,
      refetchQueries: [{
        query: GET_PRODUCTS
      }]
    })
    // 清空表单
    setUpdProduct({ id: '', name: '', categoryId: [] });
    handleClose();
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
}


export default memo(UpdForm);
