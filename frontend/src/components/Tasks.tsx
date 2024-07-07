import * as React from "react";
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { SingleTask } from "./TaskComponent";
import { allTask, updateTask } from "../actions/taskAction";
import { deleteTask } from '../actions/taskAction';


const Tasks: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const { loading, tasks } = useAppSelector((state) => state.allTasks);
  const { success } = useAppSelector((state) => state.deleteTask);
  const { done } = useAppSelector((state) => state.updateTask);

  const handleDeleteTask = (id: number) => {
    dispatch(deleteTask(id))
  }

  const handleUpdateTask = (id: number) => {
    dispatch(updateTask(true, id))
  }

  React.useEffect(() => {
    dispatch(allTask());
  }, [dispatch, success, done]);

  React.useEffect(() => {
    if (success) {
      enqueueSnackbar("Task deleted successfully!", { variant: "success" });
      navigate('/');
    }
  }, [success, navigate, enqueueSnackbar]);

  return (
    <div>
      {loading ? (
        <h2 className="text-4xl font-bold text-center py-3">Tasks loading...</h2>
      ) : (
        tasks?.map((task) => (
          <SingleTask key={task.id} {...task} handleDeleteTask={handleDeleteTask} handleUpdateTask={handleUpdateTask}/>
        ))
      )}
    </div>
  );
};

export default Tasks;
