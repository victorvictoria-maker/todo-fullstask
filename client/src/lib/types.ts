export interface FormData {
  email: string;
  password: string;
}

export interface HandleChangeEvent
  extends React.ChangeEvent<HTMLInputElement> {}

export interface Todo {
  _id: string;
  title: string;
  isCompleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ActionState {
  success: string | null;
  error: string | null;
}
