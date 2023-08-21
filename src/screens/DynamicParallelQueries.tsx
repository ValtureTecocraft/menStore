import axios from "axios";
import { useQueries } from "react-query";

const fetchSuperHero = (id: number) => {
  return axios.get(`http://localhost:4000/superheroes/${id}`);
};

const DynamicParallelQueries = ({ heroIds }: { heroIds: number[] }) => {
  const resultQuery = useQueries(
    heroIds.map((id) => ({
      queryKey: ["superhero", id],
      queryFn: () => fetchSuperHero(id),
    }))
  );

  console.log(resultQuery);

  return (
    <div className="w-full min-h-screen h-full pt-16 gap-5 flex flex-col items-center bg-gray-200">
      <h2 className="text-3xl font-semibold">Dynamic Parallel Query Page</h2>
    </div>
  );
};

export default DynamicParallelQueries;
