require('dotenv').config();
const express = require('express');
const mongorun = require('./db')

const routes = require('./routes/CreateUser');

const app = express();
const port = process.env.PORT || 3000;

mongorun();

app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin","https://gofood-mern-app-srq9.onrender.com");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested_With, Content-Type, Accept"
  );
  next();
})

app.use(express.json());
app.use('/api', routes);
app.use('/api',require('./routes/DisplayData'))
app.use('/api',require("./routes/OrderData"))

app.get('/', (req, res) => {
  res.send('Hello World!!!')
})

app.listen(port, ()=>{
    console.log(`heyy Shru..!! system is running on port ${port} ✅` )
})