import { Auth } from "../components/Auth";

function Home() {
  return (
    <>
      <div className="w-full min-h-screen h-full gap-5 flex flex-col items-center justify-center bg-gray-100">
        <Auth />
      </div>
    </>
  );
}

export default Home;
