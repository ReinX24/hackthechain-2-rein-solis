import { useState, useEffect } from "react";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";

function App() {
  const [todos, setTodos] = useState([]);
  const [todoValue, setTodoValue] = useState("");

  const persistData = (newList) => {
    localStorage.setItem(
      "todos",
      JSON.stringify({
        todos: newList,
      })
    );
  };

  const handleAddTodos = (newTodo) => {
    const newTodoList = [...todos, newTodo];
    persistData(newTodoList);
    setTodos(newTodoList);
  };

  const handleDeleteTodo = (index) => {
    // Remove the index of the deleted todo from the array
    const newTodoList = todos.filter((todo, todoIndex) => {
      return todoIndex !== index;
    });

    persistData(newTodoList);
    setTodos(newTodoList);
  };

  const handleEditTodo = (index) => {
    // Get the current value and set input value to
    const valueToBeEdited = todos[index];
    setTodoValue(valueToBeEdited);
    // Delete the old todo value
    handleDeleteTodo(index);
  };

  useEffect(() => {
    // Checking if local storage exists
    if (!localStorage) {
      return;
    }

    let localTodos = localStorage.getItem("todos");

    if (!localTodos) {
      return;
    }

    localTodos = JSON.parse(localTodos).todos;

    setTodos(localTodos);
  }, []);

  return (
    <>
      <TodoInput
        todoValue={todoValue}
        setTodoValue={setTodoValue}
        handleAddTodos={handleAddTodos}
      />
      <TodoList
        todos={todos}
        handleDeleteTodo={handleDeleteTodo}
        handleEditTodo={handleEditTodo}
      />
    </>
  );
}

export default App;
