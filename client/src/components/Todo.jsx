import React, { useState } from "react";
import Button from "./Button";
import {
  useDeleteTodoMutation,
  useGetAllUserQuery,
  useUpdateTodoMutation,
  useDoneTaskMutation,
} from "../redux/api";
import dayjs from "dayjs";

const Todo = () => {
  const { data: todos, isLoading, error, refetch } = useGetAllUserQuery();
  const [deleteTodo] = useDeleteTodoMutation();
  const [updateTodo] = useUpdateTodoMutation();
  const [doneTask] = useDoneTaskMutation();

  const [editingTodo, setEditingTodo] = useState(null);
  const [updateData, setUpdateData] = useState({
    name: "",
    startingDate: "",
    dueDate: "",
  });

  // to convert the name into a sentence case format
  const titleCase = (str) => {
    str = str.toLowerCase().split(" ");

    for (let i = 0; i < str.length; i++) {
      str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
    }

    return str.join(" ");
  };

  if (isLoading) return <div>Loading todos...</div>;
  if (error) return <div></div>;

  // handle delete function
  const handleDelete = async (id) => {
    try {
      await deleteTodo(id);
      refetch(); // Refetch todos after deletion
    } catch (error) {
      console.error("Error deleting todo:", error.message);
    }
  };

  // handle update function
  const handleUpdate = (todo) => {
    setEditingTodo(todo._id);
    setUpdateData({
      name: todo.name,
      startingDate: todo.startingDate,
      dueDate: todo.dueDate,
    });
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateTodo({ id: editingTodo, updatedTodo: updateData });
      refetch(); // Refetch todos after update
      setEditingTodo(null);
      setUpdateData({ name: "", startingDate: "", dueDate: "" });
    } catch (error) {
      console.error("Error updating todo:", error.message);
    }
  };

  // handle done function
  const handleDoneSubmit = async (todo) => {
    try {
      const newStatus = todo.status === "done" ? "pending" : "done";
      await doneTask({ id: todo._id, status: newStatus });
      refetch(); // Refetch todos after update
    } catch (error) {
      console.error("Error marking todo as done", error.message);
    }
  };

  return (
    <div
      className="bg-dark-primary w-full flex-1 rounded-xl py-2 px-4 
    overflow-y-auto text-dark-font shadow-3xl"
    >
      <h1 className="w-full font-bold text-2xl text-center py-4 mb-3 cursor-pointer">
        PERSONAL TASK MONITORING
      </h1>

      <div className="w-full h-auto grid grid-cols-1 gap-3 ">
        {/* CARDS */}

        {todos && todos.length > 0 ? (
          todos.map((todo) => (
            <div
              key={todo._id}
              className="h-auto bg-dark-secondary py-5 px-2 rounded-lg shadow-3xl hover:bg-dark-neutral"
            >
              {editingTodo === todo._id ? (
                <form onSubmit={handleUpdateSubmit}>
                  <div className="mb-3">
                    <label className="block mb-1">Task Name:</label>
                    <input
                      type="text"
                      value={updateData.name}
                      onChange={(e) =>
                        setUpdateData({ ...updateData, name: e.target.value })
                      }
                      className="w-full rounded-md px-2 outline-none"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="block mb-1">Starting Date:</label>
                    <input
                      type="date"
                      value={dayjs(updateData.startingDate).format(
                        "YYYY-MM-DD"
                      )}
                      onChange={(e) =>
                        setUpdateData({
                          ...updateData,
                          startingDate: e.target.value,
                        })
                      }
                      className="w-full rounded-md px-2 outline-none"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="block mb-1">Due Date:</label>
                    <input
                      type="date"
                      value={dayjs(updateData.dueDate).format("YYYY-MM-DD")}
                      onChange={(e) =>
                        setUpdateData({
                          ...updateData,
                          dueDate: e.target.value,
                        })
                      }
                      className="w-full rounded-md px-2 outline-none"
                    />
                  </div>
                  <div className="flex gap-3">
                    <Button type="done" children="Save" submit />
                    <Button
                      type="delete"
                      children="Cancel"
                      onClick={() => setEditingTodo(null)}
                    />
                  </div>
                </form>
              ) : (
                <>
                  <div className="mb-8">
                    <h2 className="text-dark-font font-semibold text-start">
                      Task Name:
                    </h2>
                    <p className="text-dark-font">{titleCase(todo.name)}</p>
                  </div>

                  <div className="flex gap-2">
                    <h2 className="font-semibold text-green-600">
                      Starting Date:
                    </h2>
                    <p className="text-dark-font">
                      {dayjs(todo.startingDate).format("MM/DD/YY")}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <h2 className="text-red-600 font-semibold">Due Date:</h2>
                    <p className="text-dark-font">
                      {dayjs(todo.dueDate).format("MM/DD/YY")}
                    </p>
                  </div>

                  <div className="flex gap-2 mb-5">
                    <h2 className="text-blue-600 font-semibold">Status:</h2>
                    <p className="text-dark-font">
                      {todo.status === "done" ? "Done" : "Pending..."}
                    </p>
                  </div>

                  <div className="flex justify-start gap-2 flex-wrap">
                    <Button
                      type={todo.status === "done" ? "pending" : "done"}
                      children={
                        todo.status === "done"
                          ? "Mark as Pending"
                          : "Mark as Done"
                      }
                      onClick={() => handleDoneSubmit(todo)}
                    />
                    <Button
                      type="update"
                      children="Update"
                      onClick={() => handleUpdate(todo)}
                    />
                    <Button
                      type="delete"
                      children="Delete"
                      onClick={() => handleDelete(todo._id)}
                    />
                  </div>
                </>
              )}
            </div>
          ))
        ) : (
          <p className="text-3xl">No todo's found; create a new todo!!</p>
        )}

        {/* END OF CARDS */}
      </div>
    </div>
  );
};

export default Todo;
