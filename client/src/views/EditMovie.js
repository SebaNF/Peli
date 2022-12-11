import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PelisForm from '../components/PelisForm';
import { simpleGet, simplePut } from '../services/pelis.services';

const EditMovie = () => {

    const {id} = useParams();
    const [movie, setMovie] = useState();
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();

    const getMovie = async () => {
        try {
            const response = await simpleGet(`http://localhost:8080/api/movies/${id}`);
            console.log(response.data.movie)
            setMovie(response.data.movie);
        }catch(err){
            console.log(err)
        }
    };

    useEffect(() => {
        getMovie();
    }, []);

    const editMovie = async(values)=>{
        try{
            const response = await simplePut(`http://localhost:8080/api/movies/${id}`,values)
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
                navigate('/')
            }
            
        }catch(err){
            console.log(err)
        }
    }

    return (
        <div>
            <h2>Editar Pelicula</h2>
            {errors?.map((error,index)=><p className='error-validation' key={index}>{error}</p>)}
            {movie && <PelisForm title={movie.title} director={movie.director} date={movie.date} onSubmitProp={editMovie} />}
        </div>
    );
}

export default EditMovie;
