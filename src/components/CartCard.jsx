import { CircleX } from 'lucide-react';
import { useCart } from '../context/ProductContext';

const CartCard = ({ title, price, quantity, image, onClick }) => {
 const subtotal = price * quantity;

  return ( 


    <div className="cartCard">
      <img src={image} alt={title} />


      <div className="cartInfo">
        <h4 title={title}>{title}</h4>
        <p className="cartQty">Qty: {quantity}</p>
        <p className="cartPrice">$ {price}</p>
      </div>


      <div className="cartRight">
        <p className="cartSubtotal">$ {subtotal.toFixed(2)}</p>
        <CircleX className="removeIcon" onClick={onClick} />
      </div>

    </div>
  )
}

export default CartCard
