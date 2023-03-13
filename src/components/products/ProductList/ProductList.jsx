import React, { useEffect, useContext, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { productsContext } from '../../../contexts/productContext';
import ProductCard from '../ProductCard/ProductCard';
import Pagination from 'react-bootstrap/Pagination';

const ProductList = () => {
  const { getProducts, products, pages } = useContext(productsContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div>
      <h2>Products List</h2>
      {products?.map(item => (
        <ProductCard key={item.id} item={item} />
      ))}
    </div>
  )
}

export default ProductList