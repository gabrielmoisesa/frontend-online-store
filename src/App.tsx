import './App.css';
import './index.css';
import { Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import Home from './pages/Home/Home';
import ShoppingCart from './pages/ShoppingCart/ShoppingCart';
import ProductDetails from './pages/ProductDetails/ProductDetails';
import Payment from './pages/Payment/Payment';
import { getProductsFromCategoryAndQuery } from './services/api';
import { ProductResultType } from './types';
import Layout from './pages/Layout/Layout';

function App() {
  const [searchedProducts, setSearchProducts] = useState('');
  const [returnedProducts, setReturnedProducts] = useState<ProductResultType[]>([]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchProducts(event.target.value);
  };

  const handleClick = async () => {
    const getSearchedProducts = await getProductsFromCategoryAndQuery(searchedProducts);
    setReturnedProducts(getSearchedProducts.results);
  };

  return (
    <Routes>
      <Route path="/" element={ <Layout /> }>
        <Route path="/carrinho" element={ <ShoppingCart /> } />
        <Route path="/produto/:id/:name" element={ <ProductDetails /> } />
        <Route path="/pagamento" element={ <Payment /> } />
      </Route>
      <Route
        index
        element={ <Home
          handleChange={ handleChange }
          handleClick={ handleClick }
          returnedProducts={ returnedProducts }
        /> }
      />
    </Routes>
  );
}

export default App;
