const FAVORITES_LIST = 'FAVORITES_LIST';
import { getFromStorage, addToStorage } from '../utils/localStorageHelper';
import { useQuery } from '@tanstack/react-query';

export const setList = (data: any) => {
    const array = getFromStorage(FAVORITES_LIST) ?  getFromStorage(FAVORITES_LIST) : [];
    const exist = array.filter((item: any) => item.idDrink === data.idDrink);
    if (exist?.length>0) {
        const indexOfObject = array.findIndex((item : any) => {
            return item.idDrink === data.idDrink;
        });
        array.splice(indexOfObject, 1);
    } else {
        array.splice(0, 0, data);
    }
    addToStorage(FAVORITES_LIST, JSON.stringify(array));
};


export const useGetFavCocktails = (query: string) => {
    let url = "/search.php?s=margarita";
    if(query != "") {
      url = `/search.php?s=${query}`;
    }

    return useQuery([url], async () => {
      const response = getFromStorage(FAVORITES_LIST) ?  getFromStorage(FAVORITES_LIST) : [];
      return {"drinks" : response};
    });
}

export const isInList = (data: any) => {
    const array = getFromStorage(FAVORITES_LIST) ?  getFromStorage(FAVORITES_LIST) : [];
    const exist = array.filter((item: any) => item.idDrink === data.idDrink);
    return exist?.length>0 ? true : false;
}



