const express = require('express');
const mongoose = require('mongoose');
const BodyParser = require('body-parser');
const controller = require('./controller');
// const cors = require('cors');

const app = express();

mongoose.connect(
    "mongodb://feralbuddleia:mlab12345@ds241133.mlab.com:41133/employee-management",
    {useNewUrlParser: true}
);

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true}));
app.use(express.static("uploads"));
app.use("/api/employee", controller);
// app.use(cors());

app.listen(3001, () => {
    console.log('Port start on 3001!')
})