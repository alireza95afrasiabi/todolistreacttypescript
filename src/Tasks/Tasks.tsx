import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTaskDetail } from "../AppContext/AppContext.tsx"

type TodoType = {
    title: string;
    detail: string;
    completed: boolean;
    id: number;
}

function App() {

    const { taskDetail, setTaskDetail } = useTaskDetail();

    const [todos, setTodos] = useState<TodoType[]>(() => {
        const savedItems = localStorage.getItem("toDoList");
        if (savedItems) {
            return JSON.parse(savedItems);
        }
        return [];
    });

    const [newTitle, setNewTitle] = useState<string>("");

    const [newDetail, setNewDetail] = useState("");

    const [editId, setEditId] = useState<number>(0);

    useEffect(() => {
        localStorage.setItem("toDoList", JSON.stringify(todos))
    }, [todos])

    let deleteFunction = (id: number) => {
        setTodos(todos.filter((x) => x.id !== id))
    };

    let editFunction = (item: TodoType) => {
        setNewTitle(item.title);
        setNewDetail(item.detail);
        setEditId(item.id);
        setTaskDetail(item.detail);
    };

    let toggleClass = (item: string) => {
        todos.find((x) => {
            if (x.title == item) {
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
                if (!newTitle.trim()) return;
                if (!newDetail.trim()) return;
                if (editId) {
                    let findexIndex: number = todos.findIndex(x => x.id === editId);
                    if (Number.isInteger(findexIndex) && findexIndex > -1) {
                        todos[findexIndex].title = newTitle;
                        todos[findexIndex].detail = newDetail;
                        todos[findexIndex].id = editId
                        setTodos([...todos]);
                        setEditId(0);
                    }
                } else {
                    let newObj = { title: newTitle, detail: newDetail, completed: false, id: todos.length + 1 };
                    setTodos([...todos, newObj]);
                }
                setNewTitle("");
                setNewDetail("");
            }}>
                <input value={newTitle} name="title" type="text" placeholder="write a task ..."
                    style={{ borderTopRightRadius: "0px", borderBottomRightRadius: "0px" }}
                    onChange={(e) => setNewTitle(e.target.value)} />
                <input value={newDetail} name="detail" type="text" placeholder="write your task detail ..."
                    style={{ borderTopLeftRadius: "0px", borderBottomLeftRadius: "0px", borderLeft: "transparent" }}
                    onChange={(e) => setNewDetail(e.target.value)} />
                <button className="button" type="submit">add</button>
            </form>
            <ul>
                {
                    todos.map((item, index) => {
                        return <li key={index} style={{ textDecoration: item.completed ? "line-through" : "none" }}>
                            {item.title}
                            <div>
                                <button className="button" style={{ backgroundColor: item.completed ? "red" : "green" }}
                                    onClick={() => toggleClass(item.title)}>
                                    {item.completed ? "undo" : "done"}
                                </button>
                                <button className="button" disabled={item.completed}
                                    style={{ cursor: item.completed ? "not-allowed" : "pointer", backgroundColor: item.completed ? "#bfbfbf" : "gray" }}
                                    onClick={() => editFunction(item)}>
                                    edit
                                </button>
                                <button className="button" disabled={item.completed}
                                    style={{ cursor: item.completed ? "not-allowed" : "pointer", backgroundColor: item.completed ? "#bfbfbf" : "gray" }}>
                                    <Link style={{ textDecoration: "none", color: "white" }} to="/TaskDetails" onClick={() => { setTaskDetail(item.detail) }}>detail</Link>
                                </button>
                                <button className="button" disabled={item.completed}
                                    style={{ cursor: item.completed ? "not-allowed" : "pointer", backgroundColor: item.completed ? "#bfbfbf" : "gray" }}
                                    onClick={() => deleteFunction(item.id)}>
                                    delete
                                </button>
                            </div>
                        </li>
                    })
                }
            </ul>
        </>
    )
}

export default App;