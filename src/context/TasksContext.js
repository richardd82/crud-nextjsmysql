"use client";
import { createContext, useContext } from "react";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";
import { v4 as uuid } from "uuid";
import { useLocalStorage } from "../hooks/useLocalStorage.js";

const TaskContext = createContext();

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTask must be used within a TaskProvider");
  }
  return context;
};

export const TaskProvider = ({ children }) => {
  // const [tasks, setTasks] = useState([
  //   {
  //     id: uuid(),
  //     title: "Task 1",
  //     description: "Description 1",
  //     completed: false,
  //   },
  //   {
  //     id: uuid(),
  //     title: "Task 2",
  //     description: "Description 2",
  //     completed: false,
  //   },
  //   {
  //     id: uuid(),
  //     title: "Task 3",
  //     description: "Description 3",
  //     completed: false,
  //   },
  // ]);
  const[tasks, setTasks] = useLocalStorage("tasks", []);
  const createTask = (title, description) => {
    setTasks([
      ...tasks,
      {
        // id: tasks.length + 1,
        id: uuid(),
        title,
        description,
        completed: false,
      },
    ]);
  };

  //delete task by id
  const deleteTask = (id) => {
    Swal.fire({
      title: "Confirm!",
      text: "Are you sure you want to delete this task?",
      icon: "question",
      showCancelButton: true,
      // showConfirmButton: true,
      confirmButtonText: "Delete",
    }).then((value) => {
      if(value.isConfirmed){
        setTasks([...tasks.filter((t) => t.id !== id)]); 
        toast.success('Task deleted successfully')
       }else{ 
        toast.error('Task not deleted');
      }
      
    });
  };

  const updateTask = (id, updatedTask) => {
    setTasks([
      ...tasks.map((t) => (t.id === id ? { ...t, ...updatedTask } : t)),
    ]);
  };

  return (
    <TaskContext.Provider value={{ tasks, createTask, deleteTask, updateTask }}>
      {children}
    </TaskContext.Provider>
  );
};
