const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const morgan = require('morgan');
// const router = require('./router');
// const connection = require('../database/index');
const axios = require('axios')
const request = require('request')

const app = express();

const port = 8000;

app.use(morgan('dev'))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, '../client/')));


app.get('/bundle.js/:3000', (req, res)=>{
  request('http://localhost:3000/bundle.js', (error, response, body)=>{
    if(!error){
      res.status(200).send(body)
    }
  })
})

app.use('/sidebar/:experience', (req, res)=>{
  request(`http://localhost:3000/sidebar/${req.params.experience}`, (error, response, body)=>{
    if(response.statusCode === 200){
      res.status(200).send(body);
    }
  })
})

app.listen(port, () => console.log(`connected to port ${port}`));

// module.exports = app;