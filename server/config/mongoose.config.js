const mongoose = require('mongoose');

mongoose.connect('mongodb://0.0.0.0:27017/pelisDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("Hemos conectado con la base de datos"))
    .catch((err) => console.log("Algo salio mal", err));