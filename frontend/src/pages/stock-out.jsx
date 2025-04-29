import React, { useState, useEffect } from "react";
import './form.css';

function StockOut() {
  const [products, setProducts] = useState([]);
  const [Item, setItem] = useState('');
  const [Quantity, setQuantity] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/products');
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch products');
        }

        setProducts(data); // Update products state with the fetched data
      } catch (error) {
        console.error('Error fetching products:', error.message);
        alert(error.message);
      }
    };

    fetchProducts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();  // Fixed typo here

    try {
      const response = await fetch('http://localhost:5000/api/stockout', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ product: Item, quantity: Quantity }), // Fixed variable names
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to stock out');
      }

      alert('Stocked out successfully!');
      console.log(data);

      // Refresh the product list
      const fetchProducts = async () => {
        const response = await fetch('http://localhost:5000/api/products');
        const data = await response.json();
        setProducts(data); // Update state with the latest products
      };

      fetchProducts();

      // Clear input fields
      setItem('');
      setQuantity('');
    } catch (error) {
      console.error('Stock out error:', error.message);
      alert(error.message);
    }
  };

  return (
    <div>
      <form className='addition' onSubmit={handleSubmit}>
        <input 
          type="text" 
          name='product' 
          placeholder='Item' 
          list='select' 
          value={Item} 
          onChange={(e) => setItem(e.target.value)} 
          required 
        />
        <datalist id='select'>
          <option value="Kawunga">Kawunga</option>
          <option value="Buto">Buto </option>
          <option value="Isabune">Isabune</option>
          <option value="Umuceri">Umuceri</option>
          <option value="Umunyu">Umunyu</option>
          <option value="Isukari">Isukari</option>
          <option value="Sorwatomu">Sorwatomu</option>
        </datalist>
        <input 
          type="text" 
          name='quantity' 
          placeholder='Quantity' 
          value={Quantity} 
          onChange={(e) => setQuantity(e.target.value)} 
          required 
        />
        <button type='submit'>Sohora muri stock</button>
      </form>

      <div className="form">
        <h1 style={{ color: 'black' }}>Sohora Muri Stock</h1>
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
    </div>
  );
}

export default StockOut;
