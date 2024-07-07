import { useAppSelector } from "../app/hooks";
import Tasks from "../components/Tasks";
import { SigninPage } from "./SigninPage";

export const HomePage = () => {
  const { userInfo } = useAppSelector((state) => state.userSignin);

  return (
    <>
      {userInfo ? (
        <Tasks />
      ) : (
        <div>
          <h2 className="text-4xl font-bold text-center py-3">
            Please sign in to add your tasks!
          </h2>
          <SigninPage />
        </div>
      )}
    </>
  );
};
