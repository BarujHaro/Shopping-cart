
import CartCard from "../components/CartCard";
import { useCart } from "../context/ProductContext";
import NoItems from "../assets/no.png";

function Cart() { 
  const {
    cart,
    removeItem,
    getTotalItems,
    getTotalPrice
  } = useCart();

  if (cart.length === 0) {
    return <div className="NoItems-cont">
    <p className="noneItems">There aren't any items</p>
    <img src={NoItems} alt='No items' className='img-NoItems'/>
    </div>;
  }

  return (
    <div className="cartPage">
      <h2 className="cartTitle">Your Cart</h2>

      <div className="cartLayout">

      
      <div className="cardscart">
        {cart.map(product => (
          <CartCard
            key={product.id}
            title={product.title}
            price={product.price}
            quantity={product.quantity}
            image={product.image}
            onClick={() => removeItem(product.id)}
            
          />

        ))}
      </div>



        <div className="cartSummary">
          <h3>Summary</h3>
          <p>Items: <span>{getTotalItems()}</span></p>
          <p>Total: <span>$ {getTotalPrice().toFixed(2)}</span></p>

          <button className="checkoutBtn">Checkout</button>
        </div>
        </div>
    </div>
  );
}

export default Cart;
