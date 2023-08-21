import axios from "axios";
import { useQuery, useQueryClient } from "react-query";

// const fetchSuperHero = (id: string) => {
//   return axios.get(`http://localhost:4000/superheroes/${id}`);
// };
// export const useSuperHeroData = (heroId: any) => {
//   return useQuery(["super-hero", heroId], () => fetchSuperHero(heroId));
// };

// use of queryKey
// const fetchSuperHero = ({ queryKey }: { queryKey: string[] }) => {
//   const heroId = queryKey[1];
//   return axios.get(`http://localhost:4000/superheroes/${heroId}`);
// };
// export const useSuperHeroData = (heroId: any) => {
//   return useQuery(["super-hero", heroId], fetchSuperHero);
// };

const fetchSuperHero = ({ queryKey }: { queryKey: string[] }) => {
  const heroId = queryKey[1];
  return axios.get(`http://localhost:4000/superheroes/${heroId}`);
};
export const useSuperHeroData = (heroId: any) => {
  return useQuery(["super-hero", heroId], fetchSuperHero);
};

// initial state with use of useQueryClient
// const fetchSuperHero = ({ queryKey }: { queryKey: string[] }) => {
//   const heroId = queryKey[1];
//   return axios.get(`http://localhost:4000/superheroes/${heroId}`);
// };

// export const useSuperHeroData = (heroId: any) => {
//   const queryClient = useQueryClient();
//   return useQuery(["super-hero", heroId], fetchSuperHero, {
//     initialData: () => {
//       const hero = queryClient
//         .getQueryData(["super-hero"])
//         ?.data?.find((hero: any) => hero.id === parseInt(heroId));
//         if (hero) {
//           return { data: hero }
//         } else {
//           return undefined
//         }
//     },
//   });
// };
