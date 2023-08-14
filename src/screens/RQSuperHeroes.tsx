import axios from "axios";
import React from "react";
import { useQuery } from "react-query";

// interface IProps {
//   isLoading: boolean;
//   isError: boolean;
//   data: any;
//   error: any;
// }

interface Superhero {
  name: string;
}

const fetchHeroes = () => {
  return axios.get("http://localhost:4000/superheroes");
};

// const onSuccess = (data: any) => {
//   console.log("Perform side effect after data fetching!", data);
// };

// const onError = (error: any) => {
//   console.log("Perform side effect after encountering error!", error);
// };

const RQSuperHeroes: React.FC = () => {
  const { isLoading, isFetching, data, isError, error, refetch } = useQuery<{
    data: Superhero[];
  }>("super-heroes", fetchHeroes, {
    // cacheTime: 5000, // Default 5 mins
    // staleTime: 1000, // Default 0 sec
    refetchOnMount: true, // Default true
    refetchOnWindowFocus: true, // Default true
    // refetchInterval: 2000, // Default false  > paused on Window out of Focus
    // refetchIntervalInBackground: true, // Default false

    enabled: false, //fetching data with event

    // onSuccess,
    // onError,

    // select: (data) => {
    //   const superHeroesName = data.data.map((hero: any) => hero.name);
    //   return { data: superHeroesName };
    // },
  });

  //   console.log("isLoading", isLoading, "isFetching", isFetching);

  if (isLoading || isFetching) {
    return <div>Loading...</div>;
  }

  if (isError) {
    const err = error as Error; // Cast 'error' to the 'Error' type
    return <div>{err.message}</div>;
  }

  return (
    <div className="w-full min-h-screen h-full pt-16 gap-5 flex flex-col items-center bg-gray-200">
      <h2 className="text-3xl font-semibold">RQ Superheroes Page</h2>
      <button onClick={() => refetch()} type="button" className="btnGreen">
        Fetch Data
      </button>
      {data?.data.map((hero, index) => {
        return (
          <div
            key={index}
            className="w-full max-w-md bg-white rounded-md shadow-md"
          >
            <div className="px-3 py-1 flex items-center justify-between">
              <h1 className="text-2xl font-medium">{hero.name}</h1>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RQSuperHeroes;
