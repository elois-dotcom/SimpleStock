import { useState,useEffect } from "react";
import './form.css'
function Report() {



// In your React component
const[products,setProducts]=useState([]);
useEffect(()=>{
    const fetchProducts=async()=>{
        try {
            const response= await fetch('http://localhost:5000/api/products')
            const data= await response.json();
            setProducts(data)
        } catch (error) {
            console.error('error',error );
        }
    };
    fetchProducts(),[]
});
    return (
      <div>
        <h1 style={{color:'black'}}>Products in Stock</h1>
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {products.map((prod, index) => (
              <tr key={prod.prod_id}>
                <td>{index + 1}</td>
                <td>{prod.prod_name}</td>
                <td>{prod.prod_quantity}</td>
                <td>
                  {prod.prod_quantity == 0 ? (
                    <span style={{ color: 'red' }}>Byashize muri stock</span>
                  ) : prod.prod_quantity <= 2 ? (
                    <span style={{ color: 'orange' }}>Nibikeya muri stock</span>
                  ) : (
                    <span style={{ color: 'green' }}>Birahagije muri stock</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

export default Report