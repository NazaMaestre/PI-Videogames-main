import axios from 'axios';

export function getVideogames(){
    return (dispatch) => {
        fetch('http://localhost:3001/videogames')
         .then((res) => res.json())
         .then((json) => {
            dispatch({
                type: 'GET_VIDEOGAMES',
                payload: json,
            })
         })
    }
};

export function getGenres(){
    return (dispatch) => {
        fetch('http://localhost:3001/genres')
         .then((res) => res.json())
         .then((json) => {
            dispatch({
                type: 'GET_GENRES',
                payload: json,
            })
         })
    }
}

export function getNameVideogames(name){
    return async function (dispatch){
        try {
            let json = await axios.get(`http://localhost:3001/videogames?name=${name}`)
            return dispatch({
                type: 'GET_NAME_VIDEOGAMES',
                payload: json.data
            })
        } catch (error) {
            console.log(error)
        }
    }
};


export function filterByGenre(genre){
    return {
            type: 'FILTER_BY_GENRE', 
            payload: genre
        }    
};

export function filterCreated(createdInDb){
    return {
        type: 'FILTER_CREATED',
        payload: createdInDb
    }
};

export function alphabeticalOrder(payload){
    return {
        type: 'ALPHABETICAL_ORDER',
        payload
    }
};

export function orderByRating(payload){
    return {
        type: 'ORDER_BY_RATING',
        payload
    }
};

export function postVideogame(payload) {
    return async (dispatch) => {
      const response = await axios.post(
        `http://localhost:3001/videogame`,
        payload
      );
      return response;
    };
  };

  export function getDetail(id) {
    return (dispatch) => {
      fetch(`http://localhost:3001/videogame/${id}`)
        .then((response) => response.json())
        .then((json) => {
          dispatch({
            type: "GET_DETAILS",
            payload: json,
          });
        });
    };
  }
  
  export function resetDetail() {
    return (dispatch) => {
      dispatch({
        type: "RESET_DETAIL",
      });
    };
  }