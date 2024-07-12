import React from 'react';
import { useParams } from 'react-router-dom';
import NotFound from './NotFound'; 

export default function DetailProduct() {
  const params = useParams();
  const pid = parseInt(params.pid, 10); // params.pid를 정수로 변환

  // 가상의 상품 데이터
  const products = [
    { pid: 1, title: '클루니 BB', description: '상품 1의 설명' },
    { pid: 2, title: '상품 2', description: '상품 2의 설명' },
    { pid: 3, title: '상품 3', description: '상품 3의 설명' },
    { pid: 4, title: '상품 4', description: '상품 4의 설명' },
    { pid: 5, title: '상품 5', description: '상품 5의 설명' },
    { pid: 6, title: '상품 6', description: '상품 6의 설명' },
    { pid: 7, title: '상품 7', description: '상품 7의 설명' },
    { pid: 8, title: '상품 8', description: '상품 8의 설명' },
  ];

  // pid에 해당하는 상품을 찾기
  const product = products.find((product) => product.pid === pid);

  if (product) {
    return (
      <div>
        <h3>{product.title}</h3>
        <p>{product.description}</p>
      </div>
    );
  } else {
    return <NotFound />;
  }
}

