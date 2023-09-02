import { useEffect, useState } from 'react';
import {
  getCategories,
  getProductsFromCategory,
} from '../../services/api';
import { CategoryType, ProductResultType } from '../../types';
import './Home.css';
import ProductCard from '../../components/ProductCard/ProductCard';
import NavBar from '../../components/NavBar/NavBar';
import Loading from '../../components/Loading/Loading';

function Home({ handleChange, handleClick, returnedProducts }: any) {
  const [categoriesData, setCategoriesData] = useState<CategoryType[]>();
  const [productsByCategory, setProductsByCategory] = useState<ProductResultType[]>([]);
  const [loading, setLoading] = useState(Boolean);

  useEffect(() => {
    const getCategoriesData = async () => {
      const categoriesFetch = await getCategories();
      setCategoriesData(categoriesFetch);
    };
    getCategoriesData();
  }, []);

  const handleCategoryClick = async (categoryId: string) => {
    setLoading(true);
    const getCategorizedProducts = await getProductsFromCategory(categoryId);
    setLoading(false);
    setProductsByCategory(getCategorizedProducts.results);
  };

  return (
    <div className="home">
      <NavBar handleChange={ handleChange } handleClick={ handleClick } />
      <div className="main-container">
        {!returnedProducts.length && !productsByCategory.length && (
          <div>
            {loading ? <Loading /> : (
              <div className="not-found-product-div">
                <h1>Nenhum produto foi encontrado</h1>
                <p data-testid="home-initial-message">
                  Digite algum termo de pesquisa ou escolha uma categoria.
                </p>
              </div>
            )}
          </div>
        )}
        {returnedProducts.length > 0 && (
          <div className="products-container">
            <ProductCard returnedProducts={ returnedProducts } />
          </div>
        )}
        {productsByCategory.length > 0 && (
          <div className="products-container">
            <ProductCard returnedProducts={ productsByCategory } />
          </div>
        )}
        <ul className="category-list">
          <div>
            <h2>Categorias</h2>
            <hr className="category-hr" />
          </div>
          {categoriesData?.map((category) => (
            <li key={ category.id }>
              <button
                data-testid="category"
                className="category-btn"
                onClick={ () => handleCategoryClick(category.id) }
              >
                {category.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Home;
