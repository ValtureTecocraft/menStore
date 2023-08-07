import Form from "../components/Form";
import List from "../components/List";

function Home() {
  return (
    <div className="w-full min-h-screen h-full pt-10 gap-5 flex flex-col items-center">
      <h1 className="font-bold text-lg text-blue-700">Person List App</h1>
      <Form />
      <List />
    </div>
  );
}

export default Home;
