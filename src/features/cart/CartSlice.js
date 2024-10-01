import { createSlice } from "@reduxjs/toolkit"


const initialState= {
    cart: [
        {
            pizzaId: 12,
            name: "Mediteraianian",
            quantity: 2,
            unitPrice: 16,
            totalPrice: 32,
        },
    ],
}
const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers:{
        addItem(state,action){
         state.cart.push(action.payload)
        },
        deleteItem(state,action){
            state.cart = state.cart.filter(item => item.pizzaId != action.payload)
        },
        increaseItem(state,action){
            const item  = state.cart.find(item=> item.pizzaId === action.payload)
            item.quantity++;
            item.totalPrice = item.quantity * item.unitPrice;
        },
        decreaseItem(state,action){
            const item  = state.cart.find(item=> item.pizzaId === action.payload)
            item.quantity--;
            item.totalPrice = item.quantity * item.unitPrice;
        },
        clearItem(state){
            state.cart = [];
        },
    }
})

export const {addItem,deleteItem,increaseItem,decreaseItem,clearItem} = cartSlice.actions

export default cartSlice.reducer