import * as React from "react";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import DeleteIcon from "@mui/icons-material/Delete";
import { red } from "@mui/material/colors";

export const SingleTask: React.FC<TaskProps> = ({
  _id,
  title,
  description,
  done,
  handleDeleteTask,
  handleUpdateTask,
}) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className={`py-2 px-3 my-3 w-1/2 block max-w-sm items-center border border-black rounded-lg shadow hover:bg-green-100" ${done ? "bg-green-300": "" }`}>
        <div className="flex justify-between items-center">
            <div>
              <h1 className="font-bold">{title}</h1>
              <h4>{description}</h4>
            </div>
            <div>
              <button onClick={() => handleUpdateTask(_id)} className="mx-2">
                <TaskAltIcon color="success" />
              </button>
              <button onClick={() => handleDeleteTask(_id)} className="mx-2">
                <DeleteIcon sx={{ color: red[600] }} />
              </button>
            </div>
        </div>
      </div>
    </div>
  );
};
