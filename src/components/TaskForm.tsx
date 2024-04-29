import React, { useState } from "react";
import { useSpring, animated } from "react-spring";

interface TaskFormProps {
  onAddTask: (newTask: string) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onAddTask }) => {
  const [newTask, setNewTask] = useState("");

  const fadeInProps = useSpring({
    opacity: 1,
    from: { opacity: 0 },
  });

  const slideInProps = useSpring({
    transform: "translateY(0)",
    from: { transform: "translateY(50px)" },
  });

  const inputTextProps = useSpring({
    color: "#000",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTask(e.target.value);
  };

  const handleAddTask = () => {
    if (newTask.trim() !== "") {
      onAddTask(newTask.trim());
      setNewTask("");
    }
  };

  return (
    <animated.div
      style={fadeInProps}
      className="w-[50%] h-[70px] bg-transparent  text-center rounded-[10px] outline-none mb-3"
    >
      <animated.input
        style={{ ...slideInProps, ...inputTextProps }}
        type="text"
        value={newTask}
        onChange={handleInputChange}
        placeholder="New Task"
        className=" h-[50%] rounded-[10px] focus:outline-stone-600 p-3"
      />
      <animated.button
        style={slideInProps}
        onClick={handleAddTask}
        className="bg-stone-700 w-[50%] h-[50%] mt-4 rounded-[10px]"
      >
        Add
      </animated.button>
    </animated.div>
  );
};

export default TaskForm;
