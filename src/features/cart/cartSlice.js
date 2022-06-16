import { createSlice ,createAsyncThunk} from "@reduxjs/toolkit";
import cartItems from '../../cartItems'
import axios from "axios";
import thunk from "redux-thunk";
import { openModal } from "../modal/modalSlice";

const url='https://course-api.com/react-useReducer-cart-projects'

const initialState={
    cartItems:cartItems,
    amount:5,
    total:0,
    isLoading:true,
}

export const getCartItems = createAsyncThunk('cart/getCartItems', async(text,thunkAPI) => {
  try {
    //console.log(text)
    //console.log(thunkAPI.getState())
   // thunkAPI.dispatch(openModal())
    const response=await axios.get(url);
    return response.data;
  } catch (error) {
    console.log(error)
    return thunkAPI.rejectWithValue('any error message you want');
  }
});
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
    extraReducers: {
    [getCartItems.pending]: (state) => {
      state.isLoading = true;
    },
    [getCartItems.fulfilled]: (state, action) => {
      console.log(action);
      state.isLoading = false;
      state.cartItems = action.payload;
    },
    [getCartItems.rejected]: (state,action) => {
        console.log(action.payload);//'any error message you want'
      state.isLoading = false;
    },
  },
    


})

//console.log(cartSlice)
export const {clearCart,removeItem,increase,decrease,calculateTotal}=cartSlice.actions;

export default cartSlice.reducer