import { useTaskDetail } from "../AppContext/AppContext.tsx";
import { Link } from "react-router-dom";

function TaskDetail() {
    const { taskDetail } = useTaskDetail();
    return (
        <>
            <h1>Task Detail:</h1>
            <p>{taskDetail}</p>
            <button className="backButton">
                <Link style={{ textDecoration: "none", color: "white" }} to="/">go back to tasks</Link>
            </button>
        </>
    )
};

export default TaskDetail;