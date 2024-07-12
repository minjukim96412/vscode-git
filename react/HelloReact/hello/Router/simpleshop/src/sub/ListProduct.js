
import Header from './Header';
import Footer from './Footer';
import Product from './Product';
import '../css/ListProduct.css';
import NotFound from './NotFound';
import {Link} from 'react-router-dom';
export default function ListProduct() {
  const products = [
    {
      pno: 1,
      ptitle: '클루니 BB',
      pimg: 'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQHiQ8_2jjtpxWPZMjvsNNAHjiOzB3aXmLNWtR5ib-nne7epK8bcXA_yJ-vdeMrBaWDuf93Eo_M1Any6P_M78zGmNUCzOE26JeZ2GKYaZ9O-7wukhnGOl7Ay_HOyd2NWc95GxuGDEE&usqp=CAc',
      pprice: 3320000
    },
    {
      pno: 2,
      ptitle: 'Dior Caro 미디엄백',
      pimg: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQJ8UxVdvBP1-1aWBMmwzVD6vGORvPedG4Ek7I_ZGlikRGraFawtN5Ba9omnmmIgaA_Z_DZZ3q2PKO9sT4xIhnpm7kdYag_p2XA0UKU-b39crUrpVe82vLEcGfH8wyaOR9xvP8q9Q&usqp=CAc',
      pprice: 5900000
    },
    {
      pno: 3,
      ptitle: 'Upland 업랜드',
      pimg: 'https://image.vans.co.kr/cmsstatic/product/VN000D25BZW1_VN000D25BZW1_hover.jpg?browse',
      pprice: 119000,
    },
    {
      pno: 4,
      ptitle: '반스 프리미엄 BMX Era 에라 리이슈 95 LX',
      pimg: 'https://image.vans.co.kr/cmsstatic/product/VN000CZDBXU1_VN000CZDBXU1_hover.jpg?browse',
      pprice: 105000,
    },
    {
      pno: 5,
      ptitle: '피자컷 반팔티 [NAVY]',
      pimg: 'https://image.msscdn.net/images/goods_img/20240704/4234077/4234077_17200818660104_500.jpg',
      pprice: 20000,
    },
    {
      pno: 6,
      ptitle: '브루클린 1986 반팔티 화이트',
      pimg: 'https://image.msscdn.net/images/goods_img/20240703/4230358/4230358_17204088698107_500.jpg',
      pprice: 45000,
    },
    {
      pno: 7,
      ptitle: 'Deep One Tuck Sweat Shorts [Grey]',
      pimg: 'https://image.msscdn.net/images/goods_img/20210428/1926048/1926048_1_500.jpg',
      pprice: 32000,
    },
    {
      pno: 8,
      ptitle: '우먼스 키치 아트웍 4부 팬츠 블랙',
      pimg: 'https://image.msscdn.net/images/goods_img/20230620/3374220/3374220_16872435503421_500.jpg',
      pprice: 9900,
    }
  ];

  return (
    <div id='wrapper'>
      <Header />
      <div id="shopList">
        {products.length > 0 ? (
          products.map((product) => (
            <Link key={product.pno} to={`/detail/${product.pno}`}>
              <Product
                pno={product.pno}
                ptitle={product.ptitle}
                pimg={product.pimg}
                pprice={product.pprice}
              />
            </Link>
          ))
        ) : (
          <NotFound />
        )}
      </div>
      <Footer />
    </div>
  );
}
