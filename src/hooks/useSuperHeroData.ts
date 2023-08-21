import axios from "axios";
import { useQuery } from "react-query";

// const fetchSuperHero = (id: string) => {
//   return axios.get(`http://localhost:4000/superheroes/${id}`);
// };
// export const useSuperHeroData = (heroId: any) => {
//   return useQuery(["super-hero", heroId], () => fetchSuperHero(heroId));
// };

const fetchSuperHero = ({ queryKey }: { queryKey: string[] }) => {
  const heroId = queryKey[1];
  return axios.get(`http://localhost:4000/superheroes/${heroId}`);
};
export const useSuperHeroData = (heroId: any) => {
  return useQuery(["super-hero", heroId], fetchSuperHero);
};
