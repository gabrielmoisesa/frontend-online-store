import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ProductResultType } from '../../types';
import './ProductCard.css';
import ButtonAddCart from '../ButtonAddCart/ButtonAddCart';
import { getProductById } from '../../services/api';
import Loading from '../Loading/Loading';

type ProductsProps = {
  returnedProducts: ProductResultType[]
};

function ProductCard(props: ProductsProps) {
  const { returnedProducts } = props;
  const [productImages, setProductImages] = useState<{ [productId: string]: string }>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductImages = async () => {
      const imageMap: { [productId: string]: string } = {};
      setLoading(true);

      await Promise.all(
        returnedProducts.map(async (product) => {
          const productImage = await getProductImage(product.id);
          imageMap[product.id] = productImage;
        }),
      );
      setLoading(false);

      setProductImages(imageMap);
    };

    fetchProductImages();
  }, [returnedProducts]);

  const getProductImage = async (productId: string) => {
    const productFetch = await getProductById(productId);
    const productPicture = productFetch.pictures[0].url;
    return productPicture;
  };

  return (
    returnedProducts.map((product) => {
      const linkName = product.title.replace(/[\s/]+/g, '-').toLowerCase();
      const productLink = `/produto/${product.id}/${linkName}`;
      const productImage = productImages[product.id] || '';

      return (
        <div key={ product.id } data-testid="product" className="product-card">
          {loading ? (
            <Loading />
          ) : (
            <Link to={ productLink } data-testid="product-detail-link">
              {' '}
              <img src={ productImage } alt={ product.title } className="card-img" />
              {' '}
            </Link>
          )}
          <Link
            to={ productLink }
            className="product-link"
            data-testid="product-detail-link"
          >
            <h4 className="product-title">{product.title}</h4>
          </Link>
          <h3>{`R$ ${product.price.toFixed(2)}`}</h3>
          <ButtonAddCart returnedProduct={ product } testId="product-add-to-cart" />
        </div>
      );
    })
  );
}

export default ProductCard;
