import { createSlice } from "@reduxjs/toolkit";
import { CountActions } from "../constants";
import { iCartItem } from "../interface";

export interface IState{
  items: iCartItem[],
}

const initialState = {
  items: [],
};

function addOrUpdateCart(items: iCartItem[], newItem: iCartItem) {
  const existItem = items.find(ele => ele.id === newItem.id);

  if(existItem) {
    return items.map(ele => {
      return ele.id === newItem.id ? {...ele, quantity: ele.quantity && ele.quantity + 1} : ele
    })
  }

  return [...items, {...newItem, quantity: 1}]
}

function removeFromCartFun(items: iCartItem[], id: number) {
  return items.filter(ele => ele.id !== id)
}

function updateCount (items: iCartItem[], id: number, type: string) {

  if(type === CountActions.ADD) {
    return items.map(ele => {
      return ele.id === id ? {...ele, quantity: ele.quantity && ele.quantity + 1} : ele
    }) 
  } else {
    const foundedItem = items.find(ele => ele.id === id);
    if(foundedItem?.quantity === 1) {
      return removeFromCartFun(items, foundedItem.id)
    } else {
      return items.map(ele => {
        return ele.id === id ? {...ele, quantity: ele.quantity && ele.quantity - 1} : ele
      })
    }
  }
}

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state: IState, action) => {
      state.items = addOrUpdateCart(state.items, action.payload);
    },
    removeFromCart: (state: IState, action) => {
      state.items = removeFromCartFun(state.items, action.payload)
    },
    updateCartCount: (state:IState, action) => {
      state.items = updateCount(state.items, action.payload.id, action.payload.type)
    },
    clearCart: (state: IState) => {
      state.items = []
    }
  },
});

export const { addToCart, removeFromCart, updateCartCount, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
