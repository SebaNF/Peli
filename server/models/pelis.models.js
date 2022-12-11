const mongoose = require("mongoose");

const pelisSchema = new mongoose.Schema({
    title:{
        type: String,
        required: [true, "Debe ingresar un título"],
        minlength: [3, "el título debe tener al menos 3 caracteres"]

    },
    director:{
        type: String,
        required: [true, "Debe ingresar un director"],
        minlength: [3, "Director debe tener al menos 3 caracteres"]
    },
    date:{
        type:Date,
        required: [true, "Debe ingresar un año"],
        
    },
    reviews:[{type:mongoose.Schema.Types.ObjectId,ref:"Review"}],
    average:{
        type:Number,
        default: 0
    }
},{timestamps:true});

const Pelis = mongoose.model("Pelis", pelisSchema);

module.exports = Pelis;
