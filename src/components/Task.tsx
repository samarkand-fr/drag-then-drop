import React, { useState } from "react";
import { useSpring, animated } from "react-spring";

interface TaskProps {
  taskName: string;
  listType?: string;
  onDragStart: (e: React.DragEvent, name: string) => void;
  onUpdateTask: (updatedTask: string) => void;
  onDeleteTask: () => void;
}

const Task: React.FC<TaskProps> = ({
  taskName,
  listType,
  onDragStart,
  onUpdateTask,
  onDeleteTask,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(taskName);

  const fadeInProps = useSpring({
    opacity: 1,
    from: { opacity: 0 },
  });

  const slideInProps = useSpring({
    transform: "translateX(0)",
    from: { transform: "translateX(-50px)" },
  });

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedTask(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setIsEditing(false);
      onUpdateTask(editedTask);
    }
  };

  return (
    <animated.div
      style={fadeInProps}
      className="w-[400px] h-[50px] bg-stone-700 border text-center relative mt-2 flex items-center "
      draggable
      onDragStart={(e) => onDragStart(e, taskName)}
    >
      <animated.div
        style={slideInProps}
        className="w-full flex justify-between items-center"
      >
        <div className="w-full">
          {isEditing ? (
            <div>
              <input
                type="text"
                value={editedTask}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                autoFocus
                style={{ color: "black", outline: "none" }}
              />
            </div>
          ) : (
            <div>{taskName}</div>
          )}
        </div>
        {listType === "todo" && ( // Conditionally render buttons only in the "Todo" list
          <div style={{ display: "flex", alignItems: "center" }}>
            {isEditing ? (
              <button
                onClick={onDeleteTask}
                style={{ cursor: "pointer", color: "red" }}
              >
                ❌
              </button>
            ) : (
              <>
                <button
                  onClick={handleDoubleClick}
                  style={{
                    cursor: "pointer",
                    color: "yellow",
                    marginRight: "15px",
                  }}
                >
                  ✏️
                </button>
                <button
                  onClick={onDeleteTask}
                  style={{
                    cursor: "pointer",
                    color: "red",
                    marginRight: "10px",
                  }}
                >
                  ❌
                </button>
              </>
            )}
          </div>
        )}
      </animated.div>
    </animated.div>
  );
};

export default Task;
