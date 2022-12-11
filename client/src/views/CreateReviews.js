import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ReviewsForm from '../components/ReviewsForm';
import { simplePost } from '../services/pelis.services';

const CreateReviews = () => {

    const {idMovie} = useParams();
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();

    const createReview = async(values) =>{
        values = {...values, idMovie:idMovie}
        try{
            const response = await simplePost('http://localhost:8080/api/review',values)
            console.log(response)
            if(response.data.message !== ""){
                console.log("ERRORES", response.data);
                const errorResponse = response.data.errors;
                console.log("Object keys", Object.keys(errorResponse));
                const errorArr = [];
            for (const llave of Object.keys(errorResponse)) {
                console.log(errorResponse[llave]);
                errorArr.push(errorResponse[llave].message);
            }
        setErrors(errorArr);
                
            }else{
                navigate('/')
            }
            
        }catch(err){
            console.log(err)
        }
    }



    return (
        <div>
            {errors?.map((error,index)=><p className='error-validation' key={index}>{error}</p>)}
            <ReviewsForm creatorName="" review="" rating={1} onSubmitProp={createReview}/><button onClick={()=>navigate('/')}>Volver</button>
        </div>
    );
}

export default CreateReviews;
