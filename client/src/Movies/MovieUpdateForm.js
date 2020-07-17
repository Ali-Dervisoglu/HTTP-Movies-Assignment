import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useHistory  } from "react-router-dom";
import MovieList from './MovieList';

const initialMovie = {
    title: '',
    director: '',
    metascore: '',
    stars: ''
};

const MovieUpdateForm = props => {
    console.log(props);
    const [movie, setMovie] = useState(initialMovie);
    const {id} = useParams();
    const {push} = useHistory();
    useEffect(() => {
        const id = props.match.params.id;
        const movieToUpdate = props.savedList.find(movie => `${movie.id}` === id);
        if (movieToUpdate) {
            setMovie(movieToUpdate)
        }
    }, [props.savedList, props.match.params.id])

    const handleChanges = e => {
        e.persist();
        let value = e.target.value;
        if (e.target.name === 'metascore') {
            value = parseInt(value, 10)
        }

        setMovie({
            ...movie,
            [e.target.name]: value
        });
    };

    const handleSubmit = e => {
        e.preventDefault();
        // console.log(movie);
        const request = {...movie, stars: movie.stars.split(","), id};
        axios
            .put(`http://localhost:5000/api/movies/${id}`, request)
            .then(res => {
                console.log("res here: " , res);
                // setMovie(res.data);
                push('/');
            })
            .catch(err => console.log("error here: " , err)) 
            // setMovie ({})
    }

    return (
        <div>
            <h1>Update Movie</h1>
            <form onSubmit={handleSubmit}>

                <input type="text" name="title" placeholder="Movie Title"
                    onChange={handleChanges}
                    value={movie.title} />


                <input type="text" name="director" placeholder="Movie Director"
                    onChange={handleChanges}
                    value={movie.director} />

                <input type="number" name="metascore" placeholder="Metascore"
                    onChange={handleChanges}
                    value={movie.metascore} />

                <input type="text" name="stars" placeholder="Stars"
                    onChange={handleChanges}
                    value={movie.stars} />

                <button className='save-button'>
                    Update
                    </button>
            </form>
        </div>
    )
}

export default MovieUpdateForm;