/* eslint-disable no-case-declarations */
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/cartConstants"

const InitialState = {
  cartItems: []
}

// eslint-disable-next-line import/prefer-default-export
export const cartReducer = (state = InitialState, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload

      const existItem = state.cartItems.find(x => x.product === item.product)

      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map(x =>
            x.product === existItem.product ? item : x
          )
        }
      }
      return {
        ...state,
        cartItems: [...state.cartItems, item]
      }

    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter(x => x.product !== action.payload)
      }
    default:
      return state
  }
}
