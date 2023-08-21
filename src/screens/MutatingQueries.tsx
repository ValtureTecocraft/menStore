import { Link } from "react-router-dom";
import {
  useAddSuperHero,
  useSuperHeroesData,
} from "../hooks/useSuperHeroesData";
import { useState } from "react";

const onSuccess = (data: any) => {
  console.log("Perform side effect after data fetching!", data);
};

const onError = (error: any) => {
  console.log("Perform side effect after encountering error!", error);
};

export const MutatingQueries = () => {
  const { data, refetch } = useSuperHeroesData(onSuccess, onError);

  const [name, setName] = useState<string>("");
  const [alterEgo, setAlterEgo] = useState<string>("");

  const { mutate } = useAddSuperHero();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({ name, alterEgo });
    const hero = { name, alterEgo };
    setName("");
    setAlterEgo("");
    mutate(hero);
  };

  return (
    <div className="w-full min-h-screen h-full pt-16 pb-8 gap-5 flex flex-col items-center bg-gray-200">
      <h2 className="text-3xl font-semibold">Add Superheroes Page</h2>

      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <div className="flex gap-5">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="alterEgo"
            >
              AlterEgo
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="alterEgo"
              type="text"
              placeholder="alterEgo"
              value={alterEgo}
              onChange={(e) => setAlterEgo(e.target.value)}
            />
          </div>
        </div>
        <button className="btnGreen w-24" type="submit">
          Add
        </button>
      </form>
      <button onClick={() => refetch()} type="button" className="btnGreen">
        Fetch Data
      </button>

      {data?.data.map((hero) => {
        return (
          <div
            key={hero.id}
            className="w-full max-w-md bg-white rounded-md shadow-md duration-200 hover:-translate-y-[2px]"
          >
            <Link
              to={`/rq-super-heroes/${hero.id}`}
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
