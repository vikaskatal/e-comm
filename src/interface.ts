export interface IProducts {
  id: number,
  image: string,
  title: string,
  description: string,
  price: number,
  category: string
}

export interface IProductSlice{
  product: {
    items: IProducts[],
    categories: string[]
  }
}
export interface iCartItem {
  id: number,
  image: string,
  title: string,
  price: number,
  quantity?: number | undefined,
}

export interface ICardSlice{
  cart: {
    items: iCartItem[],
  }
}