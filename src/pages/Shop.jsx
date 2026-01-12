import React from 'react'
import { useEffect, useState } from 'react'
import { getProducts } from '../utils/productService'
import ProductCard from '../components/ProductCard';
import { CircleArrowRight } from 'lucide-react';
import { CircleArrowLeft } from 'lucide-react';

function Shop() {
  const [allProducts, setAllProducts] = useState([]);
  const [page, setPage] = useState(1);
  const limit = 6;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  

  useEffect(() => {
    setLoading(true);
    getProducts()
      .then(data => setAllProducts(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const start = (page - 1) * limit;
  const end = start + limit;

  const visibleProducts = allProducts.slice(start, end);
  const totalPages = Math.ceil(allProducts.length / limit);

  const nextPage = () => {
    setPage(prev => Math.min(totalPages, prev + 1));
  };

  const prevPage = () => {
    setPage(prev => Math.max(1, prev - 1));
  };

  if (loading) return <p className='messageB'>Loading...</p>;
  if (error) return <p className='messageB'>Error: {error}</p>;

  return (
    <div>



      {!loading && (
<div> 
      <h2 className='shop-title'>Products</h2>

        <div className='grid-shop'>
        {visibleProducts.map(product => (
          <ProductCard 
            key={product.id}
            id={product.id}
            title={product.title}
            price={product.price}
            image={product.image}
          />
        ))}
        </div>
        <div className='page-control'>


          <CircleArrowLeft className="iconBtn2"  onClick={prevPage} disabled={page === 1} />
          <span>
              Page: {page}
          </span>
          <CircleArrowRight className="iconBtn2" onClick={nextPage} disabled={page === totalPages} />
        </div>

       </div>
      )}

    </div>
  )
}

export default Shop

