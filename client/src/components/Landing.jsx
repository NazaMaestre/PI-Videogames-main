import React from 'react';
import {Link} from 'react-router-dom';
import './Landing.css'
import imgL from '../img/fondo.jpg'


export default function Landing(){
    return(
        <>
        <img src={imgL} alt="Videogame" className="Img"></img>
            <div className="MyImage">
            <img className="theImage" src="" alt="" />
            <Link to='/home'>
                <button className='myBtn'>START</button>
            </Link>
            </div>
         
        </>
    )
}
