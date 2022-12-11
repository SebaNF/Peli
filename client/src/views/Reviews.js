import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { simpleDelete, simpleGet } from '../services/pelis.services';

const Reviews = () => {

    const {idMovie} = useParams();
    const [reviews, setReviews] = useState();
    const navigate = useNavigate();

    const getReviews = async() =>{
        try{
            const response = await simpleGet(`http://localhost:8080/api/reviews/${idMovie}`)
            console.log(response.data);
            setReviews(response.data.reviews);
            
        }catch(err){
            console.log(err)
        }
    }

    useEffect(() => {
        getReviews();
    }, []);
    
    const deleteReview= async(id) =>{
        try{
            const response = await simpleDelete (`http://localhost:8080/api/review/${id}`);
            setReviews(reviews.filter((review)=>review._id !== id))
        }catch(err){
            console.log(err)
        }
    }
    
    return (
        <div>
            <h2>Reseñas</h2>
            {reviews?.map((review=>
            <div key={review._id} className={review.rating<3  ?"card-header text-white bg-danger mt-3": "card-header text-white bg-success mt-3"} id={review.rating>2 && review.rating<4? 'yellow-card':'card'}>
                <div className="card-header">
                    {review.creatorName}
                </div>
                <div className="card-body">
                    <p className="card-text">{review.review}</p>
                </div>
                <div className="card-footer text-white">
                    <p>Clasificación: {review.rating}</p>
                </div>
                <button onClick={()=>deleteReview(review._id)}>Borrar</button><button onClick={()=>navigate(`/edit-review/${review._id}`)}>Edit</button>
            </div>))}
            <button className='mt-3' onClick={()=>navigate('/')}>Volver</button>
        </div>
    );
}

export default Reviews;
