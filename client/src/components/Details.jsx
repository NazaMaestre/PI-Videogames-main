import React, {useEffect} from "react";
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {getDetail, resetDetail} from '../actions';
import './Details.css'

export default function Details(props){
    const dispatch = useDispatch();

    //ComponentDidMount
    useEffect(() => {
        dispatch(getDetail(props.match.params.id))
    }, [dispatch])

    const videogame = useSelector(state => state.detail)

    //Component will unmount
    useEffect(() => {
        return() => {
            dispatch(resetDetail())
        }
    }, [])
    
    return(
        <div className="backg">
            {
                <div className="contenedor">
                    <h1 className="titleD">{videogame.name}</h1>
                    <img className="imgD" src={videogame.image}></img>
                    <div className ='descripcion' dangerouslySetInnerHTML={{ __html: videogame.description }}></div>
                    <h4 className="ratingD">RATING: {videogame.rating}★</h4>
                    <h5 className="genreD">GENRES: {videogame.genres}</h5>
                    <h5 className="releaseD">RELEASE DATE: {videogame.releaseDate}</h5>
                    <h5 className="plataformD">PLATFORMS: {videogame.platforms}</h5>
                </div>
                
            }
            <Link to='/home'>
                <button className="btnD">GO BACK</button>
            </Link>
        </div>
    )
}