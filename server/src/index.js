
const express = require('express');
const cors = require('cors');
const methodOverride = require('method-override')
const app = express();

const port = 9999;
//
const route = require('./routes/index');
// Kết nối db
const db = require('./config/db');
db.connect();




app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

app.get('/', (req, res) => {
    res.send('Hell world');
})

//Overide method http
app.use(methodOverride('_method'))



// route init
route(app);

app.listen(port, () => {
    console.log("Listen to port " + port);
});
