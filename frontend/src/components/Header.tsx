import { useAppDispatch, useAppSelector } from "../app/hooks";
import { Link } from "react-router-dom";
import { signout } from "../actions/userAction";

export const Header = () => {
  const dispatch = useAppDispatch();
  const { userInfo } = useAppSelector((state) => state.userSignin);

  const handleLogout = () => {
    dispatch(signout());
  };

  return (
    <div>
      <header className="bg-green-400 text-white">
        <div className="container mx-auto flex justify-between items-center py-4 px-6">
          <Link to="/">
            <span className="text-2xl font-bold">My Todos</span>
          </Link>
          {userInfo ? (
            <div className="md:flex space-x-6">
              <Link to="/add-task">
                <span className="text-2xl font-bold">Add new Task</span>
              </Link>
              <button onClick={handleLogout}>Logout</button>
            </div>
          ) : (
            <div className="hidden md:flex space-x-6">
              <Link to="/">Sign In</Link>
              <Link to="/signup">Sign Up</Link>
            </div>
          )}
        </div>
      </header>
    </div>
  );
};
