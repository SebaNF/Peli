import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PelisForm from '../components/PelisForm';
import { simplePost } from '../services/pelis.services';

const CreatePelis = () => {

    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();

    const createMovie = async(values) =>{
        try{
            const response = await simplePost('http://localhost:8080/api/movies',values)
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
            <h1>Agregar pelicula</h1>
            {errors?.map((error,index)=><p className='error-validation' key={index}>{error}</p>)}
            <PelisForm title="" director="" date="" onSubmitProp={createMovie}/>
        </div>
    );
}

export default CreatePelis;
