import { createContext, useState, useContext } from "react";


type TaskDetailContextType = {
    taskDetail: string;
    setTaskDetail: (taskDetail: string) => void;
};

const TaskDetailContext = createContext<TaskDetailContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [taskDetail, setTaskDetail] = useState("");

  return (
    <TaskDetailContext.Provider value={{ taskDetail, setTaskDetail }}>
      {children}
    </TaskDetailContext.Provider>
  );
};

export const useTaskDetail = () => {
  const context = useContext(TaskDetailContext);
  if (!context) {
    throw new Error("useTaskDetail must be used inside AppProvider");
  }
  return context;
};