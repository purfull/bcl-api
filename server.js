const dotenv = require('dotenv')
dotenv.config()

const express = require('express');
const cors = require('cors');
const axios = require('axios');


const db = require('./db');
require('./relationship');
const app = express();

// npm install axios bcrypt cors dotenv express jsonwebtoken mysql2 nodemon pug redis sequelize sqlite3 path multer

const path = require('path');


const uploadsPath = path.resolve(__dirname, 'uploads');
app.use('/uploads', express.static(uploadsPath));


const corsOptions = {
  origin: 'http://localhost:3000', // Specific origin instead of '*'
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

app.use(cors(corsOptions));

const userRoutes = require('./user/routes')
const otpRoutes = require('./otp/routes')
const cartRoutes = require('./cart/routes')

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.set('view engine', 'pug');


app.get('/check', (req, res) => {
  res.send("Working !!")
})

app.use('/user', userRoutes);
app.use('/otp', otpRoutes);
app.use('/cart', cartRoutes);


db.sync({ force: false })
  .then(() => {
    app.listen(process.env.PORT, console.log('Server is running on port: ' + process.env.PORT));
  });
