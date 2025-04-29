import React, { use } from 'react'
import'./form.css'
import { useState,useEffect } from 'react'
import { toast } from 'react-toastify';

function Home() {
  const [product,setProduct]=useState('');
  const [quantity,setQuantity]=useState('');
  const [products,setProducts]=useState([]);
  const [editProducts, setEditProducts] = useState(false);
  const [editId, setEditId] = useState(null);


  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { product, quantity };
  
    try {
      const url = editProducts
        ? `http://localhost:5000/api/products/${editId}`
        : 'http://localhost:5000/api/products';
  
      const method = editProducts ? 'PUT' : 'POST';
  
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
  
      const result = await response.json();
  
      if (response.ok) {
        toast.success(editProducts ? 'Product updated!' : 'Product added!');
        setProduct('');
        setQuantity('');
        setEditProducts(false);
        setEditId(null);
        fetchProducts();
      } else {
        toast.error(result.error || 'Failed to save');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Something went wrong');
    }
  };
  
  const fetchProducts = async()=>{
    try {
      const response = await fetch('http://localhost:5000/api/products');
      const data= await response.json();
      setProducts(data);  
      
    } catch (error) {
      console.error('Trouble Fetching Products',error);
      
    }
  };
  useEffect(()=>{
    fetchProducts();},[]);

    const handleDelete= async(prodId)=>{
      if(!window.confirm("Urashaka Gusiba Iki kibitswe")) return;
      try {
        const response=  await fetch(`http://localhost:5000/api/products/${prodId}`,{
          method:'DELETE',
        });
          if(response.ok){
            toast.success('Kirasibwe')
            fetchProducts();
          }else{
            toast.error('Ongera Usibe Biranze');
          }
        
      } catch (error) {
        console.error('delete error',error);
        toast.error('error while deleting')
      }

    }

    const handleEdit = (prod) => {
      setProduct(prod.prod_name);
      setQuantity(prod.prod_quantity);
      setEditProducts(true);
      setEditId(prod.prod_id);
    };
    


  return (
    <div>
    <form className='addition' onSubmit={handleSubmit}>
      <input type="text" name='product' placeholder='Item' list='select' value={product} onChange={(e)=>setProduct(e.target.value)} required/>
      <datalist id='select'>
        <option value="Kawunga">Kawunga</option>
        <option value="Buto">Buto </option>
        <option value="Isabune">Isabune</option>
        <option value="Umuceri">Umuceri</option>
        <option value="Umunyu">Umunyu</option>
        <option value="Isukari">Isukari</option>
        <option value="Sorwatomu">Sorwatomu</option>


      </datalist>
      <input type="text" name='quantity' placeholder='Quantity' value={quantity} onChange={(e)=>setQuantity(e.target.value)} required />
      <button type='submit'>Add product</button>

       
    </form>
    <div className='form'>
      <h1 style={{color:'black' }}>Ibyinjijwe Muri Stock</h1>
    <table>
      <thead>
        <tr>
          <th>No</th>
          <th>Ibibitswe</th>
          <th>Ingano</th>
          <th>Action</th>
        </tr>
        
      </thead>
      <tbody>
        {products.map((prod,index)=>(
          <tr key={prod.prod_id}>
          <td>{index+1}</td>
          <td>{prod.prod_name}</td>
          <td>{prod.prod_quantity}</td>
          <td>
            <button id='edit'type="button"onClick={()=>handleEdit(prod)}>Hindura</button>
            <button id='danger' type="button"onClick={()=>handleDelete(prod.prod_id)}>Siba</button>
          </td>
          </tr>
          ))}
        </tbody>
    </table>

    </div>

    </div>
  )
}

export default Home
