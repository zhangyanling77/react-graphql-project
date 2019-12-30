import React, {memo} from 'react';
import { Card, List } from 'antd';
import { useQuery } from '@apollo/react-hooks';
import { GET_PRODUCT } from '@/api';
import { Product } from '@/types';

const ProductDetail: React.FC = (props:any) => {
  let _id = props.match.params.id;
  let { loading, error, data } = useQuery(GET_PRODUCT,{
    variables: { id: _id }
  });

  if(error) return <p>加载发生错误</p>;
  if(loading) return <p>加载中...</p>;
 
  const { getProduct } = data; 
  const { id, name, category: { id: categoryId, name: categoryName, products }} = getProduct;
  
  return (
    <div>
      <Card title="商品详情" bordered={false} style={{width:'100%'}}>
        <div>
          <p><b>商品ID：</b>{id}</p>
          <p><b>商品名称：</b>{name}</p>
        </div>
        <List
          header={
            <div>
              <p><b>分类ID：</b>{categoryId}</p>
              <p><b>分类名称：</b>{categoryName}</p>
            </div>
          }
          footer={null}
          bordered
          dataSource={products}
          renderItem={(item:Product) => (
            <List.Item>
              <p>{item.name}</p>
            </List.Item>
          )}
        >
        </List>
      </Card>
    </div>
  )
}


export default memo(ProductDetail);
