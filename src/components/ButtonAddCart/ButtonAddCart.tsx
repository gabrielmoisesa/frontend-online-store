import { ProductResultType } from '../../types';
import { handleClick } from '../../utils/handleClick';
import './ButtonAddCart.css';

type ProductProps = {
  returnedProduct: ProductResultType
  testId: string
};

function ButtonAddCart(props: ProductProps) {
  const { returnedProduct, testId } = props;

  return (
    <button
      onClick={ () => handleClick(returnedProduct) }
      data-testid={ testId }
      className="add-cart-btn"
    >
      Adicionar ao carrinho
    </button>
  );
}

export default ButtonAddCart;
