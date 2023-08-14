import React, { useEffect } from "react";
import axios from "axios";

interface Superhero {
  name: string;
}

const SuperHeroes: React.FC = () => {
  const [data, setData] = React.useState<Superhero[]>([]);
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    setLoading(true);
    axios.get("http://localhost:4000/superheroes").then((res) => {
      setData(res.data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <p className="text-3xl font-semibold">Loading...</p>;
  }

  return (
    <div className="w-full min-h-screen h-full pt-16 gap-5 flex flex-col items-center bg-gray-200">
      <h2 className="text-3xl font-semibold">Superheroes Page</h2>
      {data.map((hero, index) => {
        return (
          <div
            key={index}
            className="w-full max-w-md bg-white rounded-md shadow-md"
          >
            <div className="px-3 flex items-center justify-between">
              <h1 className="text-2xl font-semibold">{hero.name}</h1>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SuperHeroes;
