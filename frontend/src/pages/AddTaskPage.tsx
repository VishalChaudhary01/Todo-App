import * as React from "react";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { createTask } from "../actions/taskAction";

export const AddTaskPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const { error, task } = useAppSelector((state) => state.createTask);

  const [inputs, setInputs] = React.useState<Task>({
    title: "",
    description: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputs({
      ...inputs,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const newTask = {
        title: inputs.title,
        description: inputs.description,
      };
      dispatch(createTask(newTask));
  };

  React.useEffect(() => {
    if (task) {
      navigate("/");
      enqueueSnackbar("Task added successfully", { variant: "success" });
    }
    if (error) {
      console.log(error);
      enqueueSnackbar(error, { variant: "error" });
    }
  }, [dispatch, task, error])

  return (
    <div className="flex justify-center mt-4 px-4 w-100">
      <div className="block max-w-sm p-6 bg-green-50 border border-green-300 rounded-lg shadow hover:bg-green-100">
        <h2 className="text-4xl font-bold text-center py-3">
          Add new Task Here
        </h2>
        <form onSubmit={handleSubmit} className="max-w-md flex flex-col gap-4">
          <input
            type="text"
            name="title"
            onChange={handleChange}
            value={inputs.title}
            placeholder="Title"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-green-500"
          />
          <textarea
            name="description"
            placeholder="Description"
            onChange={handleChange}
            value={inputs.description}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-green-500"
          />
          <button
            type="submit"
            className="mt-3 w-full text-black bg-green-400 focus:ring-400 font-medium rounded-lg text-sm px-4 py-2"
          >
            Add Tasks
          </button>
        </form>
      </div>
    </div>
  );
};
