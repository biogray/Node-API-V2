console.log('hello from Node')

const express = require('express');
const app = express();

app.listen( 3000 , ()=> {
       console.log('Node API is running its own port 3000')
} )

//routes
app.get('/' , (req, res) => {
       res.send('Hello from API')
} )