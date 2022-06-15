import React from 'react'
import CartItem from './CartItem'
import { useSelector,useDispatch } from 'react-redux'
import { clearCart } from '../features/cart/cartSlice'
import { openModal } from '../features/modal/modalSlice'


const CartContainer = () => {
    const dispatch=useDispatch();
    const{cartItems,total,amount}=useSelector((store)=>store.cart)

    if(amount < 1){
        return (  <section className='cart'>
            <header>
                <h2>Your cart</h2>
                <h4 className='empty-cart'>is currently empty</h4>
            </header>
        </section>)
    }


  return (
    <section className='cart'>
      <header>
        <h2>your cart</h2>
      </header>
      <div>
        {cartItems.map((item)=>{
            return <CartItem key={item.id} {...item}/>
        })}
      </div>
      <footer>
        <hr />
        <div className="carttotals">
                 <h2>total <span>${total.toFixed(2)}</span></h2>
        </div>
        <button onClick={()=>dispatch(openModal())} className="btn claer-btn">
            clear cart
        </button>
      </footer>
    </section>
  )
}

export default CartContainer
