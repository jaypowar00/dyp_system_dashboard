var express = require("express");
var app = express();
const cors = require("cors");
app.use(cors({
    origin: ['http://localhost:3002', ]
}));
app.use(express.json())
require('dotenv').config();

const mongoose = require("mongoose");
const backendController = require("./controllers/backendController")

var PORT = 3001 || process.env.PORT;
var mainURL = 'http://localhost:'+PORT;

app.use('/', backendController);

mongoose.connect('mongodb://localhost:27017/file_transfer', {useNewUrlParser: true, useUnifiedTopology: true}, () => {
    console.log("[+] mongodb connected!")
    app.listen(PORT, () => console.log('[+] Express Backend Server is running on '+mainURL));
});
