import React, { useState } from "react";
import Task from "./components/Task";
import TaskForm from "./components/TaskForm";

interface AppProps {}

const App: React.FC<AppProps> = () => {
  const [todo, setTodo] = useState<string[]>(["Task 1", "Task 2"]);
  const [ongoing, setOngoing] = useState<string[]>(["Task 3"]);
  const [completed, setCompleted] = useState<string[]>(["Task 4"]);

  const handleOnDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleOnDrag = (e: React.DragEvent, name: string) => {
    e.dataTransfer.setData("name", name);
  };

  const handleOnDrop = (e: React.DragEvent, targetList: string[], setTargetList: React.Dispatch<React.SetStateAction<string[]>>) => {
    const sourceName = e.dataTransfer.getData("name");

    if (targetList) {
      setTargetList((prevList) => [...prevList.filter((taskName) => taskName !== sourceName), sourceName]);
    } else {
      setTargetList([sourceName]);
    }

    [todo, ongoing, completed].forEach((list) => {
      if (list !== targetList) {
        list?.forEach((task) => {
          if (task === sourceName) {
            switch (list) {
              case todo:
                setTodo((prevTodo) => prevTodo.filter((taskName) => taskName !== sourceName));
                break;
              case ongoing:
                setOngoing((prevOngoing) => prevOngoing.filter((taskName) => taskName !== sourceName));
                break;
              case completed:
                setCompleted((prevCompleted) => prevCompleted.filter((taskName) => taskName !== sourceName));
                break;
              default:
                break;
            }
          }
        });
      }
    });
  };

  const handleAddTask = (newTask: string) => {
    setTodo((prevTodo) => [...prevTodo, newTask]);
  };

  const handleUpdateTask = (column: string, index: number, updatedTask: string) => {
    switch (column) {
      case "todo":
        setTodo((prevTodo) => {
          const updatedTodo = [...prevTodo];
          updatedTodo[index] = updatedTask;
          return updatedTodo;
        });
        break;
      case "ongoing":
        setOngoing((prevOngoing) => {
          const updatedOngoing = [...prevOngoing];
          updatedOngoing[index] = updatedTask;
          return updatedOngoing;
        });
        break;
      case "completed":
        setCompleted((prevCompleted) => {
          const updatedCompleted = [...prevCompleted];
          updatedCompleted[index] = updatedTask;
          return updatedCompleted;
        });
        break;
      default:
        break;
    }
  };

  const handleDeleteTask = (column: string, index: number) => {
    switch (column) {
      case "todo":
        setTodo((prevTodo) => prevTodo.filter((_, i) => i !== index));
        break;
      case "ongoing":
        setOngoing((prevOngoing) => prevOngoing.filter((_, i) => i !== index));
        break;
      case "completed":
        setCompleted((prevCompleted) => prevCompleted.filter((_, i) => i !== index));
        break;
      default:
        break;
    }
  };

  return (
    <div className="flex flex-col h-screen text-white">
      <div className="flex justify-center items-center bg-stone-300 p-10">
        <TaskForm onAddTask={handleAddTask} />
      </div>
      <div className="flex-grow bg-stone-200 w-full grid grid-cols-3 mx-auto text-white">
        <div className="bg-stone-200 m-5 flex flex-col rounded-[10px] shadow-lg">
          <h1 className="text-center  text-black font-semibold  mb-2">TODO</h1>
          <div className="flex-grow flex flex-col gap-5 justify-start items-center border-2 rounded-[5px] border-stone-400" onDragOver={handleOnDragOver} onDrop={(e) => handleOnDrop(e, todo, setTodo)}>
            {todo &&
              todo.map((taskName, index) => (
                <Task
                  key={taskName}
                  taskName={taskName}
                  listType="todo"
                  onDragStart={(e) => handleOnDrag(e, taskName)}
                  onUpdateTask={(updatedTask) => handleUpdateTask("todo", index, updatedTask)}
                  onDeleteTask={() => handleDeleteTask("todo", index)}
                />
              ))}
          </div>
        </div>
        <div className="bg-stone-200 m-5 flex flex-col rounded-[10px] shadow-lg">
          <h1 className="text-center text-black font-semibold mb-2 ">Ongoing</h1>
          <div className="flex-grow flex flex-col gap-5 justify-start items-center border-2 rounded-[5px] border-stone-400" onDragOver={handleOnDragOver} onDrop={(e) => handleOnDrop(e, ongoing, setOngoing)}>
            {ongoing &&
              ongoing.map((taskName, index) => (
                <Task
                  key={taskName}
                  taskName={taskName}
                  onDragStart={(e) => handleOnDrag(e, taskName)}
                  onUpdateTask={(updatedTask) => handleUpdateTask("ongoing", index, updatedTask)}
                  onDeleteTask={() => handleDeleteTask("ongoing", index)}
                />
              ))}
          </div>
        </div>
        <div className="bg-stone-200 m-5 flex flex-col rounded-[10px] shadow-lg">
          <h1 className="text-center text-black  font-semibold  mb-2">Completed</h1>
          <div className="flex-grow flex flex-col gap-5 justify-start items-center border-2 rounded-[5px] border-stone-400" onDragOver={handleOnDragOver} onDrop={(e) => handleOnDrop(e, completed, setCompleted)}>
            {completed &&
              completed.map((taskName, index) => (
                <Task
                  key={taskName}
                  taskName={taskName}
                  onDragStart={(e) => handleOnDrag(e, taskName)}
                  onUpdateTask={(updatedTask) => handleUpdateTask("completed", index, updatedTask)}
                  onDeleteTask={() => handleDeleteTask("completed", index)}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
