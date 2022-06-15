import { createSlice } from "@reduxjs/toolkit";
import cartItems from '../../cartItems'

const initialState={
    cartItems:cartItems,
    amount:5,
    total:0,
    isLoading:true,
}
const cartSlice=createSlice({
    name:'cart',
    initialState,
    reducers:{
        clearCart:(state)=>{
           // state.cartItems=[];
           return {...state,cartItems:[]}
        },

        removeItem:(state,action)=>{
            const id=action.payload;
            state.cartItems=state.cartItems.filter((item)=>item.id !==id)
        },
        increase:(state,{payload})=>{
            const Item =state.cartItems.find((item)=>item.id ===payload.id);
            Item.amount=Item.amount + 1
        },
        decrease:(state,{payload})=>{
            const Item =state.cartItems.find((item)=>item.id ===payload.id);
            Item.amount=Item.amount - 1
           
        },
        calculateTotal:(state)=>{
            let amount=0;
            let total=0;
            state.cartItems.forEach((item)=>{
                amount += item.amount;
                total += item.amount * item.price;
            })
            state.amount=amount;
            state.total=total
        }
    },
    


})

//console.log(cartSlice)
export const {clearCart,removeItem,increase,decrease,calculateTotal}=cartSlice.actions;

export default cartSlice.reducer