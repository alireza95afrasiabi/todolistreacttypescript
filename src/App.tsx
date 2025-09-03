import { BrowserRouter, Routes, Route } from "react-router-dom";

import Task from "./Tasks/Tasks.tsx";
import TaskDetails from "./TaskDetails/TaskDetails.tsx";
import { AppProvider } from "./AppContext/AppContext.tsx";

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Task />} />
          <Route path="/TaskDetails" element={<TaskDetails />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  )
}

export default App;