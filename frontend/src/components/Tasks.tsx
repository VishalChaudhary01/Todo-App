import * as React from "react";
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { SingleTask } from "./TaskComponent";
import { allTask, updateTask, deleteTask, deleteTaskReset } from "../actions/taskAction";

const Tasks: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const { loading, tasks } = useAppSelector((state) => state.allTasks);
  let { success } = useAppSelector((state) => state.deleteTask);
  const { done } = useAppSelector((state) => state.updateTask);

  React.useEffect(() => {
    dispatch(allTask());
  }, [dispatch, success, done]);

  React.useEffect(() => {
    if (success) {
      navigate('/');  
      enqueueSnackbar("Task deleted successfully!", { variant: "success" });
    }
    dispatch(deleteTaskReset());
  }, [dispatch, success]);

  React.useEffect(() => {
    if (tasks?.length === 0) {
      navigate('/add-task')
    }
  }, [])

  const handleDeleteTask = (id: string) => {
    dispatch(deleteTask(id))    
  }

  const handleUpdateTask = (id: string) => {
    console.log("id of task:: ", id)
    dispatch(updateTask(true, id))
  }
  console.log("tasks::", tasks)

  return (
    <>
        {loading ? (
          <h2 className="text-4xl font-bold text-center py-3">Tasks loading...</h2>
        ) : (
          tasks?.map((task) => (
            <SingleTask key={task._id} {...task} handleDeleteTask={handleDeleteTask} handleUpdateTask={handleUpdateTask}/>
          ))
        )}
    </>    
  );
};

export default Tasks;
