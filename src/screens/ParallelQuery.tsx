import axios from "axios";
import React from "react";
import { useQuery } from "react-query";

const fetchSuperHeroes = () => {
  return axios.get("http://localhost:4000/superheroes");
};
const fetchFriends = () => {
  return axios.get("http://localhost:4000/friends");
};

const ParallelQuery = () => {
  useQuery("super-heroes", fetchSuperHeroes); // data: heroData
  useQuery("friends", fetchFriends); // data: friendsData

  return (
    <div className="w-full min-h-screen h-full pt-16 gap-5 flex flex-col items-center bg-gray-200">
      <h2 className="text-3xl font-semibold">Parallel Query Page</h2>
    </div>
  );
};

export default ParallelQuery;
