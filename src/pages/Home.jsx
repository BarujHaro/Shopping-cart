import React from 'react'
import {Link, useNavigate} from "react-router-dom"; 
import Shopping from "../assets/shopping.png";

function Home() {
  const navigate = useNavigate();
  const handleButtonClick = () => {
    navigate('/shop');  
  };

  return (
    <div className='main-home'>
      
      <div className='text-home'>
        <h2>Live your life the way you think. Authentic, unfiltered.</h2>
        <p>
          Discover products that fit your everyday life: technology, home goods, and essentials designed to make your life easier.
        </p>
        <button
        className='button-home'
          onClick={handleButtonClick}
        >
          Start shopping
        </button>
      </div>

      <img src={Shopping} alt='woman shopping' className='img-home'/>

    </div>
  )
}

export default Home
