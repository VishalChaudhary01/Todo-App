interface UserSignup {
  username: string;
  firstName: string;
  lastName?: string;
  password: string;
}

interface UserSignin {
  username: string;
  password: string;
}

interface Task {
  id: number;
  title: string;
  description: string;
  done?: boolean;
}

interface UserState {
  userInfo?: {
    message: string;
    [key: string]: any;
  };
  loading?: boolean;
  error?: string;
}

interface TaskState {
  task?: {
    [key: string]: any;
  };
  tasks?: any[];
  loading?: boolean;
  error?: string;
  success?: boolean;
  done?: boolean;
}

interface TaskProps {
  id: number;
  title: string;
  description: string;
  done?: boolean;
  handleDeleteTask: (id: number) => void;
  handleUpdateTask: (id: number) => void;
}
