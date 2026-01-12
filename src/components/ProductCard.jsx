import { useState } from 'react';
import { useCart } from '../context/ProductContext';
import { CirclePlus, CircleMinus, Check } from 'lucide-react';

 
function ProductCard({id, title, price, image}) {
  const [cont, setCont] = useState(0);
  const {addToCart} = useCart();
  const [added, setAdded] = useState(false);

  const functionButtonLess = () => {
    setCont(prev => Math.max(0, prev - 1));

  };
  const functionButtonPlus = () => {
    setCont(prev => prev + 1);
  };



  const functionInputChange = (e) => {
    const value = e.target.value;
    if (value===""){
      setCont(0);
      return;
    }
    const number = Number(value);
    if(Number.isInteger(number) && number >= 0){
      setCont(number);
    }
  };

  const functionAddToCart = () => {

    if(cont===0) return;
    addToCart({
      id,
      title,
      price,
      quantity: cont,
      image
    });
    setCont(0); 
    setAdded(true);
  };


  return (
    <div className={`productCard ${added ? 'productCard--added' : ''}`}>
      
      {added && (
        <div className="addedBadge">
          <Check size={18} />
        </div>
      )}

       <h3 title={title}>{title}</h3>
      <img src={image} alt={title} />
       <p>$ {price}</p>
       <div>
         
        <CircleMinus className="iconBtn" onClick={functionButtonLess} />
        <input
          type="number"
          min="0"
          step="1"
          value={cont}
          placeholder={cont}
          onChange={functionInputChange}
        />
        
        <CirclePlus className="iconBtn" onClick={functionButtonPlus} />
       </div>
       <button onClick={functionAddToCart}>Add to Cart</button>
    </div>
  )
}

export default ProductCard
