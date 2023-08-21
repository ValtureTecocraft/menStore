import { Route, Routes } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import Home from "./screens/Home";
import SuperHeroes from "./screens/SuperHeroes";
import RQSuperHeroes from "./screens/RQSuperHeroes";
import NavBar from "./components/NavBar";
import RQSuperHero from "./screens/RQSuperHero";
import ParallelQuery from "./screens/ParallelQuery";
import DynamicParallelQueries from "./screens/DynamicParallelQueries";
import DependentQueries from "./screens/DependentQueries";
import { PaginatedQueries } from "./screens/PaginatedQuery";
import { InfiniteQueriesPage } from "./screens/InfiniteQuery";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <NavBar />

      <Routes>
        <Route path="/infinite-query" element={<InfiniteQueriesPage />} />
        <Route path="/paginated" element={<PaginatedQueries />} />
        <Route
          path="/dependent-queries"
          element={<DependentQueries email={"smit@example.com"} />}
        />
        <Route
          path="/dynamic-parallel-query"
          element={<DynamicParallelQueries heroIds={[1, 3]} />}
        />
        <Route path="/parallel-query" element={<ParallelQuery />} />
        <Route path="/rq-super-heroes/:heroId" element={<RQSuperHero />} />
        <Route path="/rq-super-heroes" element={<RQSuperHeroes />} />
        <Route path="/super-heroes" element={<SuperHeroes />} />
        <Route path="/" element={<Home />} />
      </Routes>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>
  );
}

export default App;
