export type CategoryType = {
  id: string
  name: string
};

export type ProductResultType = {
  id: string
  title: string
  thumbnail: string
  price: number
  pictures: {
    url: string
  }
  quantity: number
};

export type ProductAttributeType = {
  name: string
  value_name: string
  id: string
};
