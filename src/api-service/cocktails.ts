import { useQuery } from '@tanstack/react-query';
import { axiosApi } from './apiService';


  export const useGetCocktails = (query: string) => {
    let url = "/randomselection.php";
    if(query != "") {
      url = `/search.php?s=${query}`;
    }

    return useQuery([url], async () => {
      const response = await axiosApi.get(url);
      return response.data;
    });
};

