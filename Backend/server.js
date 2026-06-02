const express = require('express');
const mysql= require('mysql2');
const PORT= 5000;
const cors= require('cors');
const nodemailer= require('nodemailer');
const crypto= require('crypto');
const bcrypt= require('bcrypt');
const jwt=require("jsonwebtoken");
const { error } = require('console');

const JWT_TOKEN= "chup_chup";

const app= express();
app.use(cors());  //allows react to communicate with the backend
app.use(express.json()); //allows the json body


            require('dotenv').config();

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

// end point for forgot-password

app.post("/api/forgot-password", (req, res) => {
  const { email } = req.body;
  const token = crypto.randomBytes(32).toString("hex");

  db.query("SELECT * FROM users WHERE email = ?", [email], (err, result) => {
    if (err) {
      console.error("SELECT error:", err);
      return res
        .status(500)
        .json({ message: "Database error", error: err.message });
    }

    if (result.length === 0) {
      return res.status(404).json({ message: "Email not found" });
    }

    db.query(
      "UPDATE users SET reset_token = ?, token_expire = DATE_ADD(NOW(), INTERVAL 1 HOUR) WHERE email = ?",
      [token, email],
      (updateErr) => {
        if (updateErr) {
          console.error("Update token error:", updateErr);
          return res.status(500).json({ message: "Error updating token" });
        }

        const resetLink = `http://localhost:5000/reset-password?token=${token}`;

        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          },
        });

        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: email,
          subject: "Reset link",
          html: `<p>Click here <a href="${resetLink}">to reset your password</a>.</p>`,
        };

        transporter.sendMail(mailOptions, (mailErr, info) => {
          if (mailErr) {
            console.error("Mail error:", mailErr);
            return res.status(500).json({ message: "Failed to send email" });
          }

          res.json({ message: "Reset link sent to your email" });
        });
      }
    );
  });
});




app.post('/api/users',async(req,res) => {
    const {email,password,name,number}= req.body;
    try {
      const hashPassword = await bcrypt.hash(password,10);
    const sql= "INSERT INTO users (email,password,username,number) VALUES (?,?,?,?)";
    
    db.query(sql,[email,hashPassword,name,number],(error,result)=>{
        if(error){
            console.error('error:',error);
            return res.status(500).json({error: error.message});
        }
        res.json({message: 'user added',
            userId: result.insertId,


        });

    });
      
    } catch (error) {
      console.error("Hashing error",error);
      res.status(500).json({error:"Server error"})
      
    }
    

});
//route to handle login

app.post('/api/login',async(req,res)=>{
  const{email,password}=req.body;
  const sql= "SELECT * FROM users WHERE email = ?";

  db.query(sql,[email],async(error,result)=>{
    if(error){
      console.error("error",error);
      return res.status(500).json({error:error.message});
    }
    if(result.length===0){
      return res.status(401).json({error:"Invalid email"});
    }
 const user= result[0];
 const compari= await bcrypt.compare(password,user.password);

 if(!compari)  {
  return res.status(401).json({error:"Invalid email or password"});
 }
 const token = jwt.sign(
  {userId:user.id,email:user.email},
  JWT_TOKEN,{expiresIn: "2min"}
 )
 res.json({
  message:"Logged in",
  userId:user.id,
  uername:user.name,
  email:user.email,
  token
 })
  })

})
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