import { ProductResultType } from '../types';

export const handleClick = (returnedProduct: ProductResultType, decrement?: boolean) => {
  const existingCartProducts = localStorage.getItem('cartProducts');
  const parsedExistingCartProducts = existingCartProducts
    ? JSON.parse(existingCartProducts)
    : [];

  const existingProductIndex = parsedExistingCartProducts.findIndex(
    (product: ProductResultType) => product.id === returnedProduct.id,
  );

  const existingProduct = parsedExistingCartProducts[existingProductIndex];

  if (existingProductIndex !== -1 && !decrement) {
    existingProduct.quantity += 1;
  } else if (decrement) {
    if (existingProduct.quantity >= 2) {
      existingProduct.quantity -= 1;
    }
  } else {
    parsedExistingCartProducts.push({ ...returnedProduct, quantity: 1 });
  }

  localStorage.setItem('cartProducts', JSON.stringify(parsedExistingCartProducts));
};
