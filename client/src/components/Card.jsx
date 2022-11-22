import React from 'react';
import { NavLink } from 'react-router-dom';
import './Card.css'

export default function Card({name, image, genres, rating, id}) {
    return(
        <div className='con'>
        <div className='container'>
            <h3 className='title'>{name}</h3>
            <img className='game-div' src={image} alt='img not found' width='200px' height='250px'/> 
            <h4 className='rating'>{rating}★</h4>
            <h5 className='genre'>{genres}</h5>
            <NavLink to={`/videogame/${id}`}>
                <button className='details'>Details</button>
            </NavLink>
            </div>
            </div>
       
    )
}