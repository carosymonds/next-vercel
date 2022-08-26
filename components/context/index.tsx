import React, {useState} from "react";
import { Pokemon } from "../../interfaces";


const PokemonProvider = () => {

    const [favorites, setFavorites] = useState<any>([]);
    React.useEffect(() => {
        const localStorageItem: any = localStorage.getItem('POKEMONS');
        let parsedItem;
        parsedItem = JSON.parse(localStorageItem);
        setFavorites(parsedItem);
    }, []);
    const addFavorite = (item:Pokemon) => {
        const newTodos:(Pokemon)[] = [...favorites];
        const exists = existInFavorites(item.id);
        if(!exists){
            newTodos.push(item);
            setFavorites(newTodos);
            saveItem(newTodos)
        }
    }
    const saveItem = (newItem: (Pokemon)[]) => {
        const stringifiedTodos = JSON.stringify(newItem);
        localStorage.setItem('POKEMONS', stringifiedTodos);
    } 
    const existInFavorites = ( id: number ): boolean => {
        debugger
        if ( typeof window === 'undefined' ) return false;
    
        const favorites: Pokemon[] = JSON.parse( localStorage.getItem('POKEMONS') || '[]' );

        const exists = favorites.filter((item) => {return item.id === id});

        return exists.length > 0;
    }   

    return {
        addFavorite,
        favorites,
        existInFavorites
    }
}

export default PokemonProvider;