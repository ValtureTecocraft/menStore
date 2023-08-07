import TodoForm from "../components/todoForm";
import TodoList from "../components/todoList";
import TodoFilter from "../components/todoFilter";

function Home() {
  return (
    <div className="w-full min-h-screen h-full pt-10 gap-5 flex flex-col items-center">
      <h1 className="font-bold text-blue-700">Todo App</h1>
      <TodoForm />
      <TodoList />
      <TodoFilter />
    </div>
  );
}

export default Home;
