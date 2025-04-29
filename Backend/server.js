const express = require('express');
const mysql= require('mysql2');
const PORT= 5000;
const cors= require('cors');

const app= express();
app.use(cors());  //allows react to communicate with the backend
app.use(express.json()); //allows the json body



///database connection

const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'stock'
});
  // testing the connection.
db.connect((err)=>{
     if(err){
        console.error('failed to connect to DB');
        return;
    }
            console.log('connected successfully')
        
     
});
app.post('/api/users',(req,res) => {
    const {username,password}= req.body;
    const sql= "INSERT INTO users (username,password) VALUES (?,?)";
    
    db.query(sql,[username,password],(error,result)=>{
        if(error){
            console.error('error:',err);
            return res.status(500).json({error: err.message});
        }
        res.json({message: 'user added',
            userId: result.insertId,


        });

    });

});
/// route for sending products to the databse table products
app.post('/api/products',(req,res)=>{
    const {product: prod_name,quantity:prod_quantity}= req.body;
    const sql="INSERT INTO products (prod_name,prod_quantity) VALUES (?,?)";

    db.query(sql,[prod_name,prod_quantity],(error,result)=>{
        if(error){
            console.error('error',error);
            return res.status(500).json({error:error.message});
        }
        res.json({message:'Igikoresho kirabitswe neza',
            prodId: result.insertId,
        });
    });
});
/// route for sending users to the user table

///a route for fetching data from the database
app.get('/api/products',(req,res)=>{
    const sql= 'SELECT * FROM products';
    db.query(sql,(error,result)=>{
        if(error){
            console.log('error',error);
            return res.status(500).json({error:error.message});
        }
        res.json(result);
    })
});
///rouete for deleting the prodct
app.delete('/api/products/:id',(req,res)=>{
    const sql= 'DELETE FROM products WHERE prod_id=?';
    db.query(sql,[req.params.id],(error,result)=>{
        if(error){
            console.error("Delete error:",error);
            return res.status(500).json({error:error.message});
        }
        res.json({message:"Deleted successfully"});
    })
});
//for update

app.put('/api/products/:id', (req, res) => {
    const { product, quantity } = req.body;
    const sql = "UPDATE products SET prod_name = ?, prod_quantity = ? WHERE prod_id = ?";
  
    db.query(sql, [product, quantity, req.params.id], (err, result) => {
      if (err) {
        console.error("Update error:", err);
        return res.status(500).json({ error: err.message });
      }
      res.json({ message: "Updated successfully" });
    });
  });

  app.get('/api/products', (req, res) => {
    const sql = 'SELECT * FROM products';
    db.query(sql, (error, result) => {
        if (error) {
            console.log('error', error);
            return res.status(500).json({ error: error.message });
        }
        res.json(result);  // Send the list of products to the frontend
    });
});
//stock out

// Route to stock out (reduce quantity) of a product
app.put('/api/stockout', (req, res) => {
    const { product, quantity } = req.body;

    const sql = `
        UPDATE products
        SET prod_quantity = prod_quantity - ?
        WHERE prod_name = ? AND prod_quantity >= ?
    `;

    db.query(sql, [quantity, product, quantity], (error, result) => {
        if (error) {
            console.error("Stock out error:", error);
            return res.status(500).json({ error: error.message });
        }
        if (result.affectedRows === 0) {
            return res.status(400).json({ message: "Not enough stock or product not found" });
        }
        res.json({ message: "Stocked out successfully" });
    });
});


  


app.listen(PORT,()=>{
    {
        console.log(`running on ${PORT}`)
}
})