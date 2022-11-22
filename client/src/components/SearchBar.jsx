import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameVideogames } from "../actions";
import { NavLink } from "react-router-dom";
import './SearchBar.css'

export default function Searchbar(){
    const dispatch = useDispatch();
    const [name, setName] = useState('');

    const handleInputChange = (e) => {
        e.preventDefault();
        setName(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(getNameVideogames(name)); //Lo que escriba el usuario se va a guardar en nuestro estado local
        setName('');
    }

    return(
        <div>
           <NavLink to={'/videogame'}>
                    <h3 className="create1">CREATE VIDEOGAME</h3>
                </NavLink>
                <form>
                    <input className="Search"
                        type='text' 
                        onChange={(e) => handleInputChange(e)}
                        value={name}
                        placeholder='Search...'
                    />
                    <button className="btnG" onClick={(e) => handleSubmit(e)}>🔍</button>
                </form>
        </div>
    )
}