import React, { useState, useEffect } from 'react';
import './form.css';

function StockIn() {
  const [products, setProducts] = useState([]);

  // Fetch the products from the database
  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Trouble Fetching Products', error);
    }
  };

  useEffect(() => {
    fetchProducts();  // Fetch products when the component mounts
  }, []);

  return (
    <div className="form">
      <h1 style={{ color: 'black' }}>Ibibitswe Muri Stock</h1>
      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>Ibibitswe</th>
            <th>Ingano</th>
          </tr>
        </thead>
        <tbody>
          {products.map((prod, index) => (
            <tr key={prod.prod_id}>
              <td>{index + 1}</td>
              <td>{prod.prod_name}</td>
              <td>{prod.prod_quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StockIn;
