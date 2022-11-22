import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getVideogames, filterByGenre, filterCreated, alphabeticalOrder, orderByRating, getGenres } from '../actions';
import Card from './Card';
import Pagination from './Pagination';
import Searchbar from './SearchBar';
import './Home.css'

export default function Home () {

    const dispatch = useDispatch();
    const allVideogames = useSelector((state) => state.videogames) //Almaceno todo lo que está en el state videogames
    const [orderAlph, setAlphaOrdered] = useState(''); //Estado local para el ordenamiento alfabético
    const [orderRating, setRatingOrder] = useState(''); //Estado local para el ordenamiento por rating
    const genres = useSelector((state) => state.genres)

    useEffect (() => {
        dispatch(getVideogames());
        dispatch(getGenres());
    },[dispatch])
    

    //Paginado
    const [currentPage, setCurrentPage] = useState(1); //Declaro estado global. Empieza en 1 porque arranco en la página 1
    const [videogamesPerPage, setVideogamesPerPage] = useState(15) //Declaro estado local. Acá cuántos juegos voy a querer por página (15)
    const indexOfLastVideogame = currentPage * videogamesPerPage // Pag 1 (15)
    const indexOfFirstVideogame = indexOfLastVideogame - videogamesPerPage // Pag 1 (0)
    const currentVideogames = allVideogames.slice(indexOfFirstVideogame,indexOfLastVideogame)//Me devuelve un arreglo que toma [0,15] en página 1 - Pag 2 [16-31].
    
    const pagination = (pageNumber) => {
        setCurrentPage(pageNumber)
    }   

    //Handle Refresh
    let handleClick = (e) => {
        e.preventDefault();
        dispatch(getVideogames())
        setCurrentPage(1);
    }

    //Handle Filtro Genero
    let handleFilterGenre = (e) => {
        dispatch(filterByGenre(e.target.value))
    }

    //Handle Filtro Creado
    let handleFilterCreated = (e) => {
        dispatch(filterCreated(e.target.value))
    }

    //Handle Alpha Sort
    let handleAlphaSort= (e) => {
        e.preventDefault();
        dispatch(alphabeticalOrder(e.target.value))
        setCurrentPage(1);
        setAlphaOrdered(`Ordered ${e.target.value}`)
    }

    //Handle Rating Sort
    let handleRatingSort= (e) => {
        e.preventDefault();
        dispatch(orderByRating(e.target.value))
        setCurrentPage(1);
        setRatingOrder(`Ordered ${e.target.value}`)
    }

    return (
        
        <div className='back1'>
            <h1 className='title1'>VIDEOGAMES</h1>
            <button className='btnV' onClick={e=>{handleClick(e)}}>
                Reload Videogames
            </button>
            <div>
                
                {/*Ordenamiento Alfabético*/}
                <select className='barras' onChange={e => handleAlphaSort(e)}>
                    <option className='barras' default>ALPHABETICALLY ORDERED</option>
                    <option value='asc'>A-Z</option>
                    <option value='desc'>Z-A</option>
                </select>
                {/*Ordenamiento por Rating*/}
                <select className='barras' onChange={e => handleRatingSort(e)}>
                    <option default>SORT BY RATING</option>
                    <option value='asc'>Best Rated</option>
                    <option value='desc'>Worst Rated</option>
                </select>
                {/*Filtrado por Genre*/}
                <select className='barras' onChange={e => handleFilterGenre(e)}>
                <option value='All' default>All</option>
                        {genres.map((g) => (
                            <option key={g.name} value={g.name}>{g.name}</option>                            
                        ))}
                </select>
                {/*Filtrado por Creador*/}
                <select className='barras' onChange={e => handleFilterCreated(e)}>
                    <option default>CREATED BY...</option>
                    <option value='false'>API</option>
                    <option value='true'>User</option>
                </select>
              
                {/*Paginación*/}
                <Pagination
                 videogamesPerPage = {videogamesPerPage}
                 allVideogames = {allVideogames.length}
                 pagination = {pagination}
                 />

                {/*Searchbar*/}
                <Searchbar />

                {/*Cards*/}
                {
                    currentVideogames?.map((game) => {
                        return (
                                game.error? <div>Videogame not found</div> :
                                <Card key={game.id} name={game.name} image={game.image} genres={game.genres} rating={game.rating} id={game.id}/>
                                
                        );
                    })
                }
                   {/*Paginación*/}
                   <Pagination
                 videogamesPerPage = {videogamesPerPage}
                 allVideogames = {allVideogames.length}
                 pagination = {pagination}
                 />
                
            </div>
        </div>
        
    )  
}