const Pelis = require("../models/pelis.models");
const { Review } = require("../models/review.models");


module.exports.createReview= async (req, res) =>{
    try{
        const { review, creatorName, rating, idMovie} = req.body;
        const reviewMovie = await Review.create({review,creatorName,rating});
        const movie = await Pelis.findById(idMovie).exec();
        const reviewedMovies = await Pelis.findById(idMovie).populate("reviews").exec();
        let totalReviews = reviewedMovies.reviews.length + 1;
        let sumReviews = reviewedMovies.reviews.reduce((acumulado, elemento)=>acumulado+=Number(elemento.rating), 0) + Number(rating);
        let avg = Number((sumReviews/totalReviews).toFixed(2));
        
        const updateReviewAverage = await Pelis.findByIdAndUpdate({_id:idMovie}, {average:avg}, {new:true});
        movie.reviews.push(reviewMovie);
        await movie.save();
        updateReviewAverage.save();
        res.json({message:"", review: review})

    }catch(err){
        res.json({message:"Ha ocurrido un error",errors:err.errors})
    }
};

module.exports.getReviews = async (req, res) =>{
    try{
        const {idMovie} = req.params;
        const movie = await Pelis.findById(idMovie).populate("reviews").exec();
        console.log("reviews de la pelicula", movie.reviews);
        res.json({message:"",reviews:movie.reviews})
    }catch(err){
        res.json({message:"Ha ocurrido un error",errors:err.errors})
    }
};


module.exports.getOneReview = (req,res) =>{
    Review.findOne({_id:req.params.id})
        .then((review)=>res.json({review:review}))
        .catch((err)=>res.json({message:"Ha ocurrido un error",error:err}));
};


module.exports.updateReview = (req,res) =>{
    Review.findOneAndUpdate({_id: req.params.id},req.body,{runValidators:true, new:true})
        .then((reviewEditada)=> res.json ({message:"", review:reviewEditada}))
        .catch((err)=>res.json({message:"Ha ocurrido un error",error:err.errors}));
};

module.exports.deleteReview = (req,res) =>{
    Review.deleteOne({_id: req.params.id})
        .then((result)=>res.json({result:result}))
        .catch((err)=>res.json({message:"Ha ocurrido un error",error:err}));
};