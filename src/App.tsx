import { useState, useEffect } from "react";

type TodoType = {
  text: string;
  completed: boolean;
}

function App() {

  const [todos, setTodos] = useState<TodoType[]>(() => {
    const savedItems = localStorage.getItem("toDoList");
    if (savedItems) {
      return JSON.parse(savedItems);
    }
    return [];
  });

  const [newTodo, setNewTodo] = useState<string>("");

  useEffect(() => {
    localStorage.setItem("toDoList", JSON.stringify(todos))
  }, [todos])


  let deleteFunction = (item: string) => {
    setTodos(todos.filter((x) => x.text !== item))
  };

  let toggleClass = (item: string) => {
    todos.find((x) => {
      if (x.text == item) {
        x.completed = !x.completed;
        setTodos([...todos]);
      }
    })
  }

  return (
    <>
      <h1>my tasks:</h1>
      <form onSubmit={(e) => {
        e.preventDefault();
        if (!newTodo.trim()) return;
        let newObj = { text: newTodo, completed: false };
        setTodos([...todos, newObj]);
        setNewTodo("");
      }}>
        <input type="text"
          placeholder="enter a task"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button type="submit">add</button>
      </form>
      <ul>
        {
          todos.map((item, index) => {
            return <li key={index} style={{ textDecoration: item.completed ? "line-through" : "none" }}>
                {item.text}
                <div>
                  <button onClick={() => toggleClass(item.text)}>{item.completed ? "undo" : "done"}</button>
                  <button onClick={() => deleteFunction(item.text)}>X</button>
                </div>
            </li>
          })
        }
      </ul>
    </>
  )
}

export default App