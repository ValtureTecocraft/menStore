import React from "react";
import { useSuperHeroesData } from "../hooks/useSuperHeroesData";
import { Link } from "react-router-dom";

// interface IProps {
//   isLoading: boolean;
//   isError: boolean;
//   data: any;
//   error: any;
// }

const onSuccess = (data: any) => {
  console.log("Perform side effect after data fetching!", data);
};

const onError = (error: any) => {
  console.log("Perform side effect after encountering error!", error);
};

// Used Custom Hook
const RQSuperHeroes: React.FC = () => {
  const { isLoading, isFetching, data, isError, error, refetch } =
    useSuperHeroesData(onSuccess, onError);

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
            key={index + 1}
            className="w-full max-w-md bg-white rounded-md shadow-md"
          >
            <Link
              to={`/rq-super-heroes/${index + 1}`}
              className="px-3 py-1 flex items-center justify-between"
            >
              <h2 className="text-2xl font-medium">{hero.name}</h2>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default RQSuperHeroes;
