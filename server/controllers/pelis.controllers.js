const Pelis = require("../models/pelis.models")

module.exports.getMovies = (req, res) =>{
    Pelis.find()
        .then((movies)=>res.json({movies}))
        .catch((err)=>res.json({message:"Ha ocurrido un error",error:err}));
};

module.exports.getOneMovie = (req,res) =>{
    Pelis.findOne({_id:req.params.id})
        .then((movie)=>res.json({movie:movie}))
        .catch((err)=>res.json({message:"Ha ocurrido un error",error:err}));
};
module.exports.createMovie = (req,res) =>{
    Pelis.create(req.body)
    .then((movie)=> res.json({message:"", movie:movie}))
    .catch((err)=>res.json({message:"Ha ocurrido un error",error:err.errors}));
};

module.exports.updateMovie = (req,res) =>{
    Pelis.findOneAndUpdate({_id: req.params.id},req.body,{runValidators:true, new:true})
        .then((movieEditada)=> res.json ({message:"", movie:movieEditada}))
        .catch((err)=>res.json({message:"Ha ocurrido un error",error:err.errors}));
};

module.exports.deleteMovie = (req,res) =>{
        Pelis.deleteOne({_id: req.params.id})
            .then((result)=>res.json({result:result}))
            .catch((err)=>res.json({message:"Ha ocurrido un error",error:err}));
};