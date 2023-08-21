import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";

interface Superhero {
  name: string;
  id: number;
  alterEgo: string;
}

const fetchHeroes = () => {
  return axios.get("http://localhost:4000/superheroes");
};

const addSuperHero = (hero: any) => {
  return axios.post("http://localhost:4000/superheroes", hero);
};

export const useSuperHeroesData = (onSuccess: any, onError: any) => {
  return useQuery<{
    data: Superhero[];
  }>("super-heroes", fetchHeroes, {
    // cacheTime: 5000, // Default 5 mins
    // staleTime: 1000, // Default 0 sec
    refetchOnMount: true, // Default true
    refetchOnWindowFocus: true, // Default true
    // refetchInterval: 2000, // Default false  > paused on Window out of Focus
    // refetchIntervalInBackground: true, // Default false

    enabled: true, //fetching data with event (on page load) & Default true

    onSuccess,
    onError,

    // select: (data) => {
    //   const superHeroesName = data.data.map((hero: any) => hero.name);
    //   return { data: superHeroesName };
    // },
  });
};

export const useAddSuperHero = () => {
  const queryClient = useQueryClient();
  return useMutation(addSuperHero, {
    onSuccess: () => {
      queryClient.invalidateQueries("super-heroes");
    },
  });
};
