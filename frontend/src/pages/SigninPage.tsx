import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { signin } from "../actions/userAction";

export const SigninPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { userInfo, error } = useAppSelector((state) => state.userSignin);

  const [inputs, setInputs] = React.useState<UserSignin>({
    username: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({
      ...inputs,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  const user = {
    username: inputs.username,
    password: inputs.password,
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(signin(user));
  };

  React.useEffect(() => {
    if (userInfo) {
      navigate("/");
      enqueueSnackbar("Signin successfully", { variant: "success" });
    }
    if (error) {
      navigate("/signin");
      enqueueSnackbar(error, { variant: "error" });
    }
  }, [dispatch, userInfo, error]);

  return (
    <div className="flex justify-center mt-4 px-4 w-100">
      <div className="block max-w-sm p-6 bg-green-50 border border-green-300 rounded-lg shadow hover:bg-green-100">
        <h2 className="text-4xl font-bold text-center py-3">Singn In</h2>
        <form onSubmit={handleSubmit} className="max-w-md flex flex-col gap-4">
          <input
            type="email"
            name="username"
            placeholder="Email"
            onChange={handleChange}
            value={inputs.username}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-green-500"
          />
          <input
            type="text"
            name="password"
            placeholder="password"
            onChange={handleChange}
            value={inputs.password}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-green-500"
          />
          <button
            type="submit"
            className="mt-3 w-full text-black bg-green-400 focus:ring-400 font-medium rounded-lg text-sm px-4 py-2"
          >
            Sign in
          </button>
        </form>
        <div className="py-2 text-center">
          Don't have an account?{" "}
          <Link to={"/signup"} className="text-blue-500 hover:underline">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};
