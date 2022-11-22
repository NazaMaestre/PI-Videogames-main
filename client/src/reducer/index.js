const initialState = {
    allVideogames : [],
    videogames : [],
    genres: [],
    detail: []
};

export default function rootReducer (state= initialState, action){
    switch(action.type) {
        case 'GET_VIDEOGAMES':
            return{
                ...state,
                videogames: action.payload,
                allVideogames: action.payload
            };
        case "GET_GENRES":
            return {
                ...state,
                genres: action.payload,
            };
        case 'FILTER_BY_GENRE':
            const allVideogamesGenre = state.allVideogames
            const genreFiltered = action.payload === 'All' ? allVideogamesGenre : allVideogamesGenre.filter((game) => game.genres.includes(action.payload))
            return{
                ...state,
                videogames: genreFiltered
            };
        case 'FILTER_CREATED':
            const allVideogamesFBC = state.allVideogames;
            const creatorFilter = action.payload === "false"
          ? allVideogamesFBC.filter((game) => game.createdByUser === false)
          : allVideogamesFBC.filter((game) => game.createdByUser === true);
            return {
                ...state,
                videogames:
            action.payload === "All" ? state.allVideogames : creatorFilter,
            };   
        case 'ALPHABETICAL_ORDER':
            let sortedArr = action.payload === 'asc' ?
                state.videogames.sort(function(a,b) {
                    if (a.name > b.name) {
                        return 1;
                    }
                    if (b.name > a.name) {
                        return -1;
                    }
                    return 0;
                }) :
                state.videogames.sort(function(a,b){
                    if (a.name > b.name) {
                        return -1;
                    }
                    if (b.name > a.name) {
                        return 1;
                    }
                    return 0;
                })
            return {
                ...state,
                characters: sortedArr
            }; 
            case 'ORDER_BY_RATING':
            let sortedArr2 = action.payload === 'desc' ?
                state.videogames.sort(function(a,b) {
                    if (a.rating > b.rating) {
                        return 1;
                    }
                    if (b.rating > a.rating) {
                        return -1;
                    }
                    return 0;
                }) :
                state.videogames.sort(function(a,b){
                    if (a.rating > b.rating) {
                        return -1;
                    }
                    if (b.rating > a.rating) {
                        return 1;
                    }
                    return 0;
                })
            return {
                ...state,
                characters: sortedArr2
            };   
            case 'POST_VIDEOGAME':
                return {
                    ...state,
                };
            case 'GET_NAME_VIDEOGAMES':
                return {
                    ...state,
                    videogames: action.payload
                };            
            case "GET_DETAILS":
                return {
                    ...state,
                    detail: action.payload,
                };
            case "RESET_DETAIL":
                return {
                    ...state,
                      detail: [],
                    };
            default:
                return {...state};     
    };    
};