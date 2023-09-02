import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProductResultType } from '../../types';
import './Payment.css';
import barcodeLogo from '../../assets/icons/🦆 icon _barcode_.svg';
import visaLogo from '../../assets/icons/🦆 icon _Visa_.svg';
import masterCardLogo from '../../assets/icons/🦆 icon _MasterCard_.svg';
import eloLogo from '../../assets/icons/🦆 icon _elo_.svg';

const INITIAL_STATE = {
  fullName: '',
  email: '',
  cpf: '',
  telephone: '',
  cep: '',
  address: '',
};

function Payment() {
  const [products, setProducts] = useState<ProductResultType[]>([]);
  const [selectedOption, setSelectedOption] = useState('');
  const [formInfo, setFormInfo] = useState(INITIAL_STATE);
  const { fullName, email, cpf, telephone, cep, address } = formInfo;
  const navigate = useNavigate();

  const getCartProducts = () => JSON
    .parse(localStorage.getItem('cartProducts') as string);

  useEffect(() => {
    const productsList = getCartProducts();
    setProducts(productsList);
  }, []);

  function handleChange(event: React.ChangeEvent<HTMLInputElement
  | HTMLSelectElement | HTMLTextAreaElement>) {
    const { name, value } = event.target;
    setFormInfo((prevFormInfo) => ({
      ...prevFormInfo,
      [name]: value,
    }));
  }

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };

  function isFormValid() {
    return (
      !(!fullName || !email || !cpf || !telephone || !cep || !address)
      && selectedOption !== ''
    );
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (isFormValid()) {
      setFormInfo(INITIAL_STATE);
      localStorage.removeItem('cartProducts');
      navigate('/');
    }
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

  return (
    <div className="payment-container">
      <div className="cart-products-container">
        <h1>Revise seus Produtos</h1>
        {products.map((product) => (
          <div key={ product.id } className="cart-product-card">
            <hr className="cart-hr" />
            <img src={ product.thumbnail } alt={ product.title } />
            <p className="cart-product-name">{product.title}</p>
            <p className="cart-product-price payment-product-price">
              {`R$ ${product.price.toFixed(
                2,
              )}`}
            </p>
          </div>
        ))}
        <hr className="cart-hr" />
        <h2>{`Total: R$ ${calculateTotal().toFixed(2)}`}</h2>
      </div>
      <div className="payment-form-container">
        <h2>Informações do Comprador</h2>
        <form onSubmit={ handleSubmit }>
          <div className="payment-user-info">
            <input
              type="text"
              name="fullName"
              placeholder="Nome Completo"
              data-testid="checkout-fullname"
              required
              value={ fullName }
              onChange={ handleChange }
              className="md-input"
            />
            <input
              type="text"
              name="cpf"
              placeholder="CPF"
              data-testid="checkout-cpf"
              required
              value={ cpf }
              onChange={ handleChange }
              className="md-input"
            />
            <input
              type="text"
              name="email"
              placeholder="Email"
              data-testid="checkout-email"
              required
              value={ email }
              onChange={ handleChange }
              className="md-input"
            />
            <input
              type="text"
              name="telephone"
              placeholder="Telefone"
              data-testid="checkout-phone"
              value={ telephone }
              required
              onChange={ handleChange }
              className="md-input"
            />
            <input
              type="text"
              name="cep"
              placeholder="CEP"
              data-testid="checkout-cep"
              required
              value={ cep }
              onChange={ handleChange }
              className="sm-input"
            />
            <input
              type="text"
              name="address"
              placeholder="Endereço"
              data-testid="checkout-address"
              required
              value={ address }
              onChange={ handleChange }
              className="lg-input"
            />
          </div>
          <h2 className="payment-method-title">Método de Pagamento</h2>
          <div className="payment-methods">
            <div className="methods-names">
              <h3>Boleto</h3>
              <h3>Cartão de crédito</h3>
            </div>
            <div className="methods-radios">
              <label>
                <input
                  type="radio"
                  name="card"
                  value="ticket"
                  checked={ selectedOption === 'ticket' }
                  onChange={ handleOptionChange }
                  data-testid="ticket-payment"
                  className="ticket-radio radio-input"
                  required
                />
                <img src={ barcodeLogo } alt="Barcode" className="method-logo" />
              </label>
              <label>
                <input
                  type="radio"
                  name="card"
                  value="visa"
                  checked={ selectedOption === 'visa' }
                  onChange={ handleOptionChange }
                  data-testid="visa-payment"
                  className="visa-radio radio-input"
                  required
                />
                <img src={ visaLogo } alt="Visa logo" className="method-logo" />
              </label>
              <label>
                <input
                  type="radio"
                  name="card"
                  value="master"
                  checked={ selectedOption === 'master' }
                  onChange={ handleOptionChange }
                  data-testid="master-payment"
                  className="radio-input"
                  required
                />
                <img src={ masterCardLogo } alt="MasterCard logo" className="method-logo" />
              </label>
              <label>
                <input
                  type="radio"
                  name="card"
                  value="elo"
                  checked={ selectedOption === 'elo' }
                  onChange={ handleOptionChange }
                  data-testid="elo-payment"
                  className="radio-input"
                  required
                />
                <img src={ eloLogo } alt="Elo logo" className="method-logo" />
              </label>
            </div>
          </div>
          <button type="submit" data-testid="checkout-btn" className="pay-button">
            Comprar
          </button>
        </form>
        {!isFormValid() && (
          <p className="error-msg" data-testid="error-msg">
            * Campos inválidos
          </p>
        )}
      </div>
    </div>
  );
}

export default Payment;
