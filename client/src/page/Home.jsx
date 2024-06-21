import React from "react";
import Todo from "../components/Todo";
import TodoForm from "../components/TodoForm";

const Home = () => {
  return (
    <div className="max-container h-full w-full flex max-md:flex-col-reverse gap-3">
      <Todo />
      <TodoForm />
    </div>
  );
};

export default Home;
