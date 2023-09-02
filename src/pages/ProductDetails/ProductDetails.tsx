import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getProductById } from '../../services/api';
import { ProductAttributeType, ProductResultType } from '../../types';
import ButtonAddCart from '../../components/ButtonAddCart/ButtonAddCart';
import './ProductDetails.css';
import Loading from '../../components/Loading/Loading';

function ProductDetails() {
  const [productDetails, setProductDetails] = useState<ProductResultType>(
    {} as ProductResultType,
  );
  const [productPicture, setProductPicture] = useState();
  const [productAttributes, setProductAttributes] = useState<ProductAttributeType[]>([]);
  const [loading, setLoading] = useState(true);
  const productLink = useParams();
  const productId = productLink.id;

  useEffect(() => {
    const getProductData = async () => {
      setLoading(true);
      const productFetch = await getProductById(productId);
      const productPictureFetch = productFetch.pictures[0].url;
      const productAttributesFetch = productFetch.attributes;

      setProductDetails(productFetch);
      setProductPicture(productPictureFetch);
      setProductAttributes(productAttributesFetch);

      setLoading(false);
    };
    getProductData();
  }, [productId]);

  return (
    <div className="details-container">
      <div className="product-detail-card">
        <h2 data-testid="product-detail-name">{productDetails?.title}</h2>
        {loading ? <Loading />
          : <img
              src={ productPicture }
              alt={ productDetails?.title }
              data-testid="product-detail-image"
              className="details-image"
          />}
      </div>
      <div className="attributes-list-container">
        <div className="attributes-list-card">
          <h2>Especificações Técnicas</h2>
          <ul className="attributes-list">
            {productAttributes.slice(0, 15).map((attribute) => (
              <li key={ attribute.id }>
                {`${attribute.name}: ${attribute.value_name}`}
              </li>
            ))}
          </ul>
          <div className="details-price-container">
            {loading ? <Loading /> : (
              <h3 data-testid="product-detail-price">
                {`R$ ${productDetails.price?.toFixed(2)}`}
              </h3>
            )}
            <ButtonAddCart
              testId="product-detail-add-to-cart"
              returnedProduct={ productDetails }
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
