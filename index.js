const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./src/routes/routes');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
dotenv.config();

const app = express();
const port = process.env.PORT || 3001
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors())
routes(app);



mongoose.connect(`${process.env.MONGO_DB}`)
    .then(() => {
        console.log('Connect database success!');
    })
    .catch((err) => {
        console.log(err);
    })

app.listen(port, () => {
    console.log(`Server is running in port ${port}`);
})