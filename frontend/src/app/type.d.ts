interface UserSignup {
  name: string;
  email: string;
  password: string;
}

interface UserSignin {
  email: string;
  password: string;
}

interface Task {
  id?: number;
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
  task?: null | {
    [key: string]: any;
  };
  tasks?: any[];
  loading?: boolean;
  error?: string | null;
  success?: boolean;
  done?: boolean;
}

interface TaskProps {
  _id: string;
  title: string;
  description?: string;
  done?: boolean;
  handleDeleteTask: (id: string) => void;
  handleUpdateTask: (id: string) => void;
}
