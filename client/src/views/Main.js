import React, { useEffect, useState } from 'react';
import { simpleDelete, simpleGet } from '../services/pelis.services';
import { Link, useNavigate } from 'react-router-dom';
import moment from 'moment';

const Main = () => {

    const [movies, setMovies] = useState();
    const navigate = useNavigate();

    const getMovies = async() =>{
        try{
            const response = await simpleGet('http://localhost:8080/api/movies')
            console.log(response.data.movies)
            setMovies(response.data.movies);
            
        }catch(err){
            console.log(err)
        }
    }

    const deleteMovie = async(id) =>{
        try{
            const response = await simpleDelete (`http://localhost:8080/api/movies/${id}`);
            setMovies(movies.filter((movie)=>movie._id !== id))
        }catch(err){
            console.log(err)
        }
    }

    useEffect(() => {
        getMovies();
    }, []);

    return (
        <div>
            <Link to={'/create'}>Agregar Película</Link>
            <h1>Lista de Películas</h1>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Película</th>
                        <th>Director</th>
                        <th>Fecha estreno</th>
                        <th>Nota</th>
                        <th>Acciones</th>                         
                    </tr>
                </thead>
                <tbody>
                    {movies?.map((movie)=>
                    <tr key={movie._id}>
                        <td>{movie.title}</td>
                        <td>{movie.director}</td>
                        <td>{moment(movie.date).utc().format('DD-MM-YYYY')}</td>
                        <td>{movie.average} <img src='https://cdn-icons-png.flaticon.com/512/1828/1828884.png'></img></td>
                        <td><button onClick={()=>navigate(`/edit/${movie._id}`)}>Edit</button><button onClick={()=>deleteMovie(movie._id)}>Borrar</button><button onClick={()=>navigate(`/create-review/${movie._id}`)}>Agrerar reseña</button><button onClick={()=>navigate(`/reviews/${movie._id}`)}>Reseñas</button></td>
                    </tr>
                    )}

                </tbody>
            </table>

        </div>
    );
}

export default Main;
