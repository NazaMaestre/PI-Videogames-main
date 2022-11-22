import React from 'react';
import './Pagination.css'

export default function Pagination ({videogamesPerPage, allVideogames, pagination}) {
    const pageNumber = []

    for (let i =0; i <= Math.ceil(allVideogames/videogamesPerPage); i++) {
        pageNumber.push(i+1);
    }

    return(
        <div className='pag-div'>
            <ul className='pagination'>
                {pageNumber && 
                 pageNumber.map(number => (
                    <li className='number' key={number} onClick={()=> pagination(number)}>
                    <a className='numbs'>{number}</a>
                    </li>
                ))}
            </ul>
        </div>
    )
}