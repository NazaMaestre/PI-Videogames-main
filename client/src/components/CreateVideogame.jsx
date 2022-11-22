import React from "react";
import { useState, useEffect} from 'react';
import { Link, useHistory } from "react-router-dom";
import { getGenres, getVideogames, postVideogame } from "../actions";
import { useDispatch, useSelector } from "react-redux";
import './CreateVideogame.css'
import image from '../img/tetris.jpg'

export default function CreateVideogame () {
    const dispatch = useDispatch();
    const history = useHistory();
    const genres = useSelector((state) => state.genres);
    const allVideogames = useSelector(state => state.videogames);

    const [input, setInput] = useState({
        name: '',
        createdByUser: true,
        description: '',
        image: '',
        releaseDate: '',
        rating: '',
        platforms: [],
        genres: []
    })

    useEffect(() => {
        dispatch(getGenres());
    }, [dispatch]);

    useEffect(() => {
        dispatch(getVideogames());
    }, [dispatch]);

    //Set de platforms
    const platformsArray = [];
    allVideogames.map(game => game.platforms?.map(platform => platformsArray.push(platform)));
    let platformsSet = [...new Set(platformsArray)];

    //Handle para ir llenando el estado con los cambios
    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
    }
    
    //Hande para ir cambiando el estado de genres
    const handleSelectGenres = (e) => {
        setInput({
            ...input,
            genres: [...new Set([...input.genres, e.target.value])]
        })
    }

    //Hande para ir cambiando el estado de platforms
    const handleSelectPlatforms = (e) => {
        setInput({
            ...input,
            platforms: [...new Set([...input.platforms, e.target.value])]
        })
    }

    //Hande para eliminar genero
    const handleGenresDelete = (e) => {
        setInput({
            ...input,
            genres: input.genres.filter(genre => genre !== e)
        })
    }

    //Hande para eliminar plataforma
    const handlePlatformsDelete = (e) => {
        setInput({
            ...input,
            platforms: input.platforms.filter(platform => platform !== e)
        })
    }
    
    //Handle submit
    const handleSubmit = (e) => {
        e.preventDefault();

        

        if(!input.name){
            return alert('Name is required');
        } else if(!input.description){
            return alert('Description is required');
        } else if(!input.releaseDate){
            return alert('Release date is required');
        } else if(!input.rating || input.rating < 1 || input.rating > 5){
            return alert('Enter a rating between 1 and 5');
        } else if(!input.platforms.length){
            return alert('At least one platform is required');
        } else if(!input.genres.length){
            return alert('At least one genre is required');
        }
        
        dispatch(postVideogame(input));

        alert('Videogame created successfully!');

        setInput({
            name: '',
            createdByUser: true,
            description: '',
            image: '',
            releaseDate: '',
            rating: '',
            platforms: [],
            genres: []
        })

        history.push('/home') //Redirijo cuando ya creo el personaje
        
    }


    return(
        <div className="back">
            <Link to='/home'><button className="btn1">HOME</button></Link>
            <h1 className="title1">Create your Videogame</h1>
            <form  onSubmit={(e) => handleSubmit(e)}>
                <div className="labels">
                    <label className="type">Name:</label>
                    <input className="inputs"
                        type= 'text'
                        value= {input.name}
                        name= 'name'
                        onChange={(e) => handleChange(e)}
                    />
                    <label className="type">Description:</label>
                    <input className="inputs"
                        type= 'text'
                        value= {input.description}
                        name= 'description'
                        onChange={(e) => handleChange(e)}
                    />
                    <label className="type">Released Date:</label>
                    <input className="inputs"
                        type= 'date'
                        value= {input.releaseDate}
                        name= 'releaseDate'
                        onChange={(e) => handleChange(e)}
                    />
                    <label className="type">Image:</label>
                    <input className="inputs"
                        type= 'text'
                        value= {input.text}
                        name= 'image'
                        onChange={(e) => handleChange(e)}
                    />
                    <label className="type" >Rating:</label>
                    <input className="inputs"
                        type='number' 
                        name='rating' 
                        onChange={(e) => handleChange(e)} placeholder='1 - 5'></input>
    
                    <label className="type">Platforms:</label>
                    <div>
                        <select className="selected" onChange={(e) => handleSelectPlatforms(e)}>
                            {
                            platformsSet.map(platform => (
                            <option key={platform} value={platform}>{platform}</option>
                            ))
                            }
                        </select>
                    </div>
                    <br/>
                    <label className="type">Genres:</label>
                    <div>
                        <select className="selected" onChange={(e) => handleSelectGenres(e)}>
                            {
                            genres.map(genre => (
                                <option key={genre.id} value={genre.name}>{genre.name}</option>
                            ))
                            }
                        </select>
                    </div>
                </div>
                <div>
                    <div>
                        <h3 className="type3">GENRES SELECTED:</h3>
                        <div className="selecto">
                            {
                                input.genres.map(genre => (
                                    <div>
                                        <p onClick={() => handleGenresDelete(genre)}>{genre}</p>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div>
                        <h3 className="type3">PLATFORMS SELECTED:</h3>
                        <div>
                            {
                                input.platforms.map(platform => (
                                    <div>
                                        <p onClick={() => handlePlatformsDelete(platform)}>{platform}</p>
                                    </div>
                                ))
                            }
                        
                    
               
                <button className="btn8" type='submit' >CREATE</button>
                </div>
                </div>
                </div>
            </form>
            
        </div>
        
    )
    



}