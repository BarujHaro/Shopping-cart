import { useCart } from "../context/ProductContext";
import {Link} from "react-router-dom";


function NavBar() {
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems;

 
  return (
    <nav className='navbar'>
      <Link to="/" className='tabs'>Home</Link>
      <Link to="/shop" className='tabs'>Shop</Link>
      <Link to="/cart" className='tabs cartTab'>Cart
        {totalItems > 0 && (
          <span className="cartBadge">{totalItems}</span>
        )}
      </Link>
    </nav>
  )
}
 
export default NavBar
