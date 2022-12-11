import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ReviewsForm from '../components/ReviewsForm';
import { simpleGet, simplePut } from '../services/pelis.services';

const EditReviews = () => {

    
    const {idReview} = useParams();
    const [review, setReview] = useState();
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();
    const [movies, setMovies] = useState();
    const getMovies = async() =>{
        try{
            const response = await simpleGet('http://localhost:8080/api/movies')
            console.log(response.data.movies)
            setMovies(response.data.movies);
            
        }catch(err){
            console.log(err)
        }
    }

    useEffect(() => {
        getMovies();
    }, []);

    const getReview = async () => {
        try {
            const response = await simpleGet(`http://localhost:8080/api/review/${idReview}`);
            console.log(response.data)
            setReview(response.data.review);
        }catch(err){
            console.log(err)
        }
    };

    useEffect(() => {
        getReview();
    }, []);

    const arrayAuxId = movies?.filter((movie)=>movie.reviews.includes(review?._id))
    
    const editReview = async(values)=>{
        try{
            const response = await simplePut(`http://localhost:8080/api/review/${idReview}`,values)
            console.log(response)
            if(response.data.message !== ""){
                console.log("ERRORES", response.data);
                const errorResponse = response.data.error;
                console.log("Object keys", Object.keys(errorResponse));
                const errorArr = [];
            for (const llave of Object.keys(errorResponse)) {
                console.log(errorResponse[llave]);
                errorArr.push(errorResponse[llave].message);
            }
        setErrors(errorArr);
                
            }else{
                console.log(arrayAuxId)
                navigate(`/reviews/${arrayAuxId[0]._id}`)
            }
            
        }catch(err){
            console.log(err)
        }
    }

    return (
        <div>
            <h2>Editar Review</h2>
            {errors?.map((error,index)=><p className='error-validation' key={index}>{error}</p>)}
            {review && <ReviewsForm creatorName={review.creatorName} review={review.review} rating={review.date} onSubmitProp={editReview} />}
            <button onClick={()=>navigate(`/reviews/${arrayAuxId[0]._id}`)}>Volver</button>
            
        </div>
    );
}

export default EditReviews;
