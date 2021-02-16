import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import data from './data';

//Context
import { ProductContext } from './contexts/ProductContext';
import { CartContext } from './contexts/CartContext';

// Components
import Navigation from './components/Navigation';
import Products from './components/Products';
import ShoppingCart from './components/ShoppingCart';

function App() {
  const [products] = useState(data);
  const [cart, setCart] = useState([]);

  const addItem = item => {
    // add the given item to the cart
    const addedItem = {
      id: item.id,
      image: item.image,
      title: item.title,
      price: item.price,
    };

    setCart([...cart, addedItem]);
  };

  const deleteItem = id => {
    setCart(cart.filter(item => item.id !== id));
  };

  return (
    <div className='App'>
      <ProductContext.Provider value={{ products, addItem }}>
        <CartContext.Provider value={cart}>
          <Navigation />
        </CartContext.Provider>

        {/* Routes */}
        <Route exact path='/'>
          <Products />
        </Route>

        <CartContext.Provider value={{ cart, deleteItem }}>
          <Route path='/cart'>
            <ShoppingCart />
          </Route>
        </CartContext.Provider>
      </ProductContext.Provider>
    </div>
  );
}

export default App;
