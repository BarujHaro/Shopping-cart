//Allow to manage a global cart state on the application 

import { createContext, useContext, useState, useMemo, useCallback } from "react";

const ProductContext = createContext();  //Global container, to store and share data

export function ProductProvider({children}){ 
    const [cart, setCart] = useState([]); //Array of products 

    //ADD 
    const addToCart = useCallback((product) => {
 
        setCart(prevCart => {
            const existing = prevCart.find(item => item.id === product.id); 
            
            if(existing) {
                const updatedCart = prevCart.map(item =>
                    item.id === product.id
                    ? { ...item, quantity: item.quantity + product.quantity }
                    : item
                );
                
                console.log( updatedCart);
                return updatedCart;
            }
            const newCart = [...prevCart, product];
            console.log( newCart);
            return newCart;
        });
    }, []);
    //REMOVE
    const removeItem = useCallback((productId) =>{
      setCart(prevCart => prevCart.filter(item => item.id !== productId));
    }, []);
    //UPDATE
    const updateQuantity = useCallback((productId, newQuantity) => {
      if(newQuantity <= 0){
        removeItem(productId);
        return;
      }

      setCart(prevCart =>
        prevCart.map(item =>
          item.id === productId
          ? {...item, quantity: newQuantity}
          : item
        )
      );
    }, []);


    const getTotalPrice = useMemo(() => {
      return cart.reduce((total, item) => total + (item.price*item.quantity), 0);
    }, [cart]);

    const getTotalItems = useMemo(() => {
      return cart.reduce((total, item) => total + item.quantity, 0);
    }, [cart]);

const value = useMemo(() => ({
  cart,
  addToCart,
  removeItem,
  updateQuantity,
  getTotalPrice,
  getTotalItems
}), [cart, addToCart, removeItem, updateQuantity, getTotalPrice, getTotalItems]);

//public cart api 
  return (
    <ProductContext.Provider 
    value={value}>
      {children}
    </ProductContext.Provider>
  );
}

export const useCart = () => useContext(ProductContext);

