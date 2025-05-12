import { FaCheckCircle } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import EditTodo from "./EditTodo";
import type { Todo } from "../lib/types";

interface TodoItemProps {
  todo: Todo;
  isLast: boolean;
  onDelete: (id: string) => void;
  onToggle: (id: string, isCompleted: boolean) => void;
  onUpdate: (id: string, title: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  isLast,
  onDelete,
  onToggle,
  onUpdate,
}) => {
  const handleUpdate = async (formdata: FormData): Promise<void> => {
    const title = formdata.get("title");
    if (typeof title === "string") {
      await onUpdate(todo._id, title);
    }
  };

  return (
    <div
      className={`flex h-10 items-center w-full ${
        isLast ? "border-b-0" : "border-b-2"
      }`}
    >
      <span
        className={`flex-1 px-3 ${
          todo.isCompleted && "line-through text-[#63657b]"
        }`}
      >
        {todo.title}
      </span>
      <div className='px-3 flex gap-2'>
        <FaCheckCircle
          className={`transition ease-in-out hover:cursor-pointer ${
            todo.isCompleted ? "text-primary" : "text-slate-300"
          }`}
          onClick={() => onToggle(todo._id, todo.isCompleted)}
        />
        <MdDelete className='iconHover' onClick={() => onDelete(todo._id)} />
        <EditTodo
          id={todo._id}
          title={todo.title}
          handleUpdate={handleUpdate}
        />
      </div>
    </div>
  );
};

export default TodoItem;
