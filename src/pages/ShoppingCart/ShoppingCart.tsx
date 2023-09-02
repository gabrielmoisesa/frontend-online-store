import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ProductResultType } from '../../types';
import './ShoppingCart.css';
import { handleClick } from '../../utils/handleClick';

function ShoppingCart() {
  const [products, setProducts] = useState<ProductResultType[]>([]);

  const getCartProducts = () => JSON
    .parse(localStorage.getItem('cartProducts') as string);

  useEffect(() => {
    function setProductsData() {
      const productsList = getCartProducts();
      setProducts(productsList);
    }
    setProductsData();
  }, []);

  const handleChangeQuantity = (product: ProductResultType, decrement?: boolean) => {
    handleClick(product, decrement);
    setProducts(getCartProducts());
  };

  const calculateSubtotal = (product: ProductResultType) => {
    return product.price * product.quantity;
  };

  const calculateTotal = () => {
    return products.reduce(
      (total, product) => total + calculateSubtotal(product),
      0,
    );
  };

  const handleRemove = (productId: string) => {
    const updatedProducts = products.filter(
      (product) => product.id !== productId,
    );
    setProducts(updatedProducts);
    localStorage.setItem('cartProducts', JSON.stringify(updatedProducts));
  };

  return (
    <div>
      {!products?.length ? (
        <div className="empty-container">
          <h1
            data-testid="shopping-cart-empty-message"
            className="empty-cart-message"
          >
            Seu carrinho está vazio
          </h1>
        </div>
      ) : (
        <div className="main-cart-container">
          <div className="cart-products-container">
            <h1>Carrinho de Compras</h1>
            {products.map((product: ProductResultType) => (
              <div key={ product.id } className="cart-product-card">
                <hr className="cart-hr" />
                <button
                  onClick={ () => handleRemove(product.id) }
                  data-testid="remove-product"
                  className="cart-product-button"
                >
                  X
                </button>
                <img src={ product.thumbnail } alt={ product.title } />
                <p
                  data-testid="shopping-cart-product-name"
                  className="cart-product-name"
                >
                  {product.title}
                </p>
                <button
                  onClick={ () => handleChangeQuantity(product, true) }
                  data-testid="product-decrease-quantity"
                  className="cart-product-button"
                >
                  -
                </button>
                <p data-testid="shopping-cart-product-quantity">
                  {product.quantity}
                </p>
                <button
                  onClick={ () => handleChangeQuantity(product) }
                  data-testid="product-increase-quantity"
                  className="cart-product-button"
                >
                  +
                </button>
                <p className="cart-product-price">
                  {`R$ ${calculateSubtotal(product).toFixed(2)}`}
                </p>
              </div>
            ))}
          </div>
          <div className="total-price-container">
            <h2>Valor total da compra:</h2>
            <p>{`R$ ${calculateTotal().toFixed(2)}`}</p>
            <Link
              to="/pagamento"
              data-testid="checkout-products"
            >
              <button disabled={ !products?.length } className="checkout-button">
                Finalizar Compra
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default ShoppingCart;
