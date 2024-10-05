import { createSlice } from "@reduxjs/toolkit"


const initialState= {
    cart : [],
    // cart: [
    //     {
    //         pizzaId: 12,
    //         name: "Mediteraianian",
    //         quantity: 2,
    //         unitPrice: 16,
    //         totalPrice: 32,
    //     },
    // ],
}
const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers:{
        addItem(state, action) {
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

            if(item.quantity == 0) cartSlice.caseReducers.deleteItem(state, action)
        },
        clearItem(state){
            state.cart = [];
        },
    }
})

export const {addItem,deleteItem,increaseItem,decreaseItem,clearItem} = cartSlice.actions

export default cartSlice.reducer

export const getTotalQuantity =  store => store.cart.cart.reduce((sum,item)=> sum + item.quantity , 0);
export const getTotalPrice =  store => store.cart.cart.reduce((sum,item)=> sum + item.totalPrice , 0);

export const getCurrentQuantityById = id => store => store.cart.cart.find(item => item.pizzaId === id)?.quantity ?? 0;