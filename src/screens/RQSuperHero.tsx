import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSuperHeroData } from "../hooks/useSuperHeroData";

const RQSuperHero: React.FC = () => {
  const { heroId } = useParams();
  const { isLoading, data, isError, error } = useSuperHeroData(heroId);

  useEffect(() => {
    console.log("Mounted with heroId:", heroId);
  }, [heroId]);

  // If heroId is undefined or falsy, don't render the component
  if (!heroId) {
    return null;
  }

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (isError) {
    const err = error as Error; // Cast 'error' to the 'Error' type
    return <div>{err.message}</div>;
  }

  return (
    <div className="w-full min-h-screen h-full py-5 gap-6 flex flex-col items-center bg-gray-100">
      <h1 className="text-3xl font-bold">Super Hero</h1>
      <div className="w-full max-w-md h-fit bg-white rounded-md shadow-md">
        <div className="px-3 py-1 flex items-center justify-between">
          <h1 className="text-2xl font-semibold">
            {data?.data.name} - {data?.data.alterEgo}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default RQSuperHero;
